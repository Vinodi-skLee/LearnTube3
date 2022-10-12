import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import ScrollToTop from "../../components/Common/ScrollTop";
import YoutubeVideoListWidget from "../../components/Widget/YoutubeVideoListWidget";
import YoutubeVideoSearchWidget from "../../components/Widget/YoutubeVideoSearchWidget";
import axios from "axios";
import Youtube from "../../service/youtube";
import YouTube from "react-youtube";
import Range from "rc-slider";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Cart from "./cart";
import Modal from "react-modal";

// Image
import favIcon from "../../assets/img/fav-orange.png";
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";
import cartPage from "../../assets/img/icon/trolley.png";

const YoutubeSearch = () => {
    const location = useLocation();
    const opts = {
        height: "400",
        width: "800",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            start: 0,
        },
    };

    const [newQuery, setNewQuery] = useState("알고리즘");
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [paginatedVideos, setPaginatedVideos] = useState([]);
    const [realNewViewCount, setNewViewCount] = useState(0);
    const [realFinalDuration, setFinalDuration] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [cart, setCart] = useState(location.state.existingVideo);
    const [isChanged, setIsChanged] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [playlistName, setPlaylistName] = useState(location.state.playlistName);
    const [existingVideo, setExsitingVideo] = useState(location.state.existingVideo);
    const [newTitle, setNewTitle] = useState("");
    const [currentPlayTime, setCurrentPlayTime] = useState();
    const [currentFloatTime, setCurrentFloatTime] = useState();
    const [startTime, setStartTime] = useState();
    const [startFloatTime, setStartFloatTime] = useState();
    const [endTime, setEndTime] = useState();
    const [playlistId, setPlaylistId] = useState(location.state.playlistId);
    const [endFloatTime, setEndFloatTime] = useState();
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(playlistName);
    const [duration, setDuration] = useState("");
    const [isSearchShown, setIsSearchShown] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(Object.keys(existingVideo).length);
    const openModal = () => setIsOpen(!isOpen);
    const initVideo = {
        duration: 0,
        end_s: 0,
        id: -1,
        idx: 0,
        maxLength: 0,
        newTitle: "",
        playlistId: 0,
        seq: 0,
        start_s: 0,
        tag: null,
        title: "",
        youtubeId: "",
        deleted: 0,
    };
    

    // console.log(cart);
    console.log("number" + Object.keys(existingVideo).length);

    const httpClient = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: { key: process.env.REACT_APP_YOUTUBE_API },
    });
    const youtube = new Youtube(httpClient);
    let finalDuration = "";
    let viewCountInt, newViewCount;
    const selectVideo = (video) => {
        console.log("video selected");
    };


    const selectPart = (video) => {
        initVideo.newTitle = newTitle ? newTitle : video.snippet.title;
        initVideo.newDescription = newDescription;
        initVideo.start_s = 0;
        initVideo.end_s = customDurationToFloat(video.contentDetails.duration);
        initVideo.title = video.snippet.title;
        initVideo.youtubeId = video.id;
        initVideo.playlistId = playlistId;
        initVideo.duration = customDurationToFloat(video.contentDetails.duration);
        initVideo.seq = index;

        // console.log("duration " + initVideo.duration);

        let time = [0, 0, 0];
        let remain = initVideo.duration;
        for (const x in time) {
            time[x] = parseInt(remain % 60);
            remain = remain / 60;
        }
        if (time[2] > 0) finalDuration = time[2] + "시간 " + time[1] + "분 " + time[0] + "초";
        else if (time[1] > 0) finalDuration = time[1] + "분 " + time[0] + "초";
        else finalDuration = time[0] + "초";
        setSelectedVideo(initVideo);
        setFinalDuration(finalDuration);
        openModal();
    };

    const setPart = (video) => {
        // console.log("video selected!!!");
        setNewTitle("");
        setNewDescription("");
        setIsSelected(false);
        setStartTime(false);
        setEndTime(false);
        setSelectedVideo(video);
        setDuration(video.duration);
        console.log(selectedVideo);
        console.log(selectedVideo.seq);
        let time = [0, 0, 0];
        let remain = video.duration;
        for (const x in time) {
            time[x] = parseInt(remain % 60);
            remain = remain / 60;
        }
        if (time[2] > 0) finalDuration = time[2] + "시간 " + time[1] + "분 " + time[0] + "초";
        else if (time[1] > 0) finalDuration = time[1] + "분 " + time[0] + "초";
        else finalDuration = time[0] + "초";
        // let whereH = video.contentDetails.duration.indexOf("H");
        // let whereM = video.contentDetails.duration.indexOf("M");
        // let whereS = video.contentDetails.duration.indexOf("S");
        // let hour, min, sec;
        // if (whereH > -1) {
        //   let tempDuration = video.contentDetails.duration.split("H");
        //   let temp_length = tempDuration[0].length;
        //   hour = tempDuration[0].substring(2, temp_length);
        //   finalDuration = finalDuration + hour + "시간 ";
        // }
        // if (whereM > -1) {
        //   let tempDuration = video.contentDetails.duration.split("M");
        //   let temp_length = tempDuration[0].length;
        //   if (whereH > -1) {
        //     min = tempDuration[0].substring(whereH + 1, temp_length);
        //   } else min = tempDuration[0].substring(2, temp_length);
        //   finalDuration = finalDuration + min + "분 ";
        //   console.log(finalDuration);
        // }
        // if (whereS > -1) {
        //   let tempDuration = video.contentDetails.duration.split("S");
        //   let temp_length = tempDuration[0].length;
        //   if (whereH > -1 && whereM == -1) {
        //     sec = tempDuration[0].substring(whereH + 1, temp_length);
        //   } else if (whereM > -1) {
        //     sec = tempDuration[0].substring(whereM + 1, temp_length);
        //   } else sec = tempDuration[0].substring(2, temp_length);
        //   finalDuration = finalDuration + sec + "초";
        //   console.log(finalDuration);
        // }
        // console.log(finalDuration);
        setFinalDuration(finalDuration);
        //조회수 커스텀
        // viewCountInt = parseFloat(video.statistics.viewCount);
        // if (viewCountInt >= 100000000) {
        //   newViewCount = (viewCountInt / 100000000.0).toFixed(1) + "억";
        // } else if (viewCountInt >= 10000) {
        //   newViewCount = (viewCountInt / 10000.0).toFixed(0) + "만";
        // } else if (viewCountInt > 1000) {
        //   newViewCount = (viewCountInt / 1000.0).toFixed(1) + "천";
        // } else newViewCount = viewCountInt;
        // console.log(newViewCount);
        // setNewViewCount(newViewCount);
        openModal();
    };

    function customDurationToFloat(durationStringVer) {
        let whereH = durationStringVer.indexOf("H");
        let whereM = durationStringVer.indexOf("M");
        let whereS = durationStringVer.indexOf("S");
        var hour, min, sec;
        var durationFloat = 0.0;

        if (whereH > -1) {
            let tempDuration = durationStringVer.split("H");
            let temp_length = tempDuration[0].length;
            hour = tempDuration[0].substring(2, temp_length);

            durationFloat = durationFloat + parseFloat(hour) * 3600;
        }
        if (whereM > -1) {
            let tempDuration = durationStringVer.split("M");
            let temp_length = tempDuration[0].length;
            if (whereH > -1) {
                min = tempDuration[0].substring(whereH + 1, temp_length);
            } else min = tempDuration[0].substring(2, temp_length);
            console.log("min: " + min);
            durationFloat = durationFloat + parseFloat(min) * 60;
        }
        if (whereS > -1) {
            let tempDuration = durationStringVer.split("S");
            let temp_length = tempDuration[0].length;
            if (whereH > -1 && whereM == -1) {
                sec = tempDuration[0].substring(whereH + 1, temp_length);
            } else if (whereM > -1) {
                sec = tempDuration[0].substring(whereM + 1, temp_length);
            } else sec = tempDuration[0].substring(2, temp_length);
            durationFloat = durationFloat + parseFloat(sec);
        }

        return durationFloat;
    }

    const savePart = (video) => {
        console.log(video.seq);
        var i = Object.keys(cart).find(key => cart[key].seq === video.seq);
        console.log("index: " + i);
        console.log(cart[i]);
        if (cart[i] === undefined) {
            video.start_s = parseInt(startFloatTime);
            video.end_s = parseInt(endFloatTime);
            video.duration = parseInt(endFloatTime - startFloatTime);
            cart[video.youtubeId] = video;
        } else {
            cart[i].start_s = startFloatTime ? parseInt(startFloatTime) : cart[i].start_s;
            cart[i].end_s = endFloatTime ? parseInt(endFloatTime) : cart[i].end_s;
            console.log(parseInt(endFloatTime));
            cart[i].duration = parseInt(endFloatTime - startFloatTime);
        }
        setCart({ ...cart });
        setIsChanged(true);
        window.alert("저장되었습니다.");
        setIsOpen(!isOpen);
        setSelectedVideo(null);
    };

    const addVideoToCart = (video) => {
        console.log("add!!");
        console.log(index);
        initVideo.seq = index;
        initVideo.newDescription = newDescription;
        initVideo.start_s = parseInt(startFloatTime);
        initVideo.end_s = isNaN(endFloatTime) ? customDurationToFloat(video.contentDetails.duration) : parseInt(endFloatTime);
        initVideo.title = video.snippet.title;
        initVideo.youtubeId = video.id;
        initVideo.playlistId = playlistId;
        if (isNaN(initVideo.end_s) || isNaN(initVideo.start_s)) {
            initVideo.duration = customDurationToFloat(video.contentDetails.duration);
        } else initVideo.duration = parseInt(endFloatTime - startFloatTime);
        cart[index] = initVideo;
        console.log(index);
        console.log(cart[index]);
        setCart({...cart});
        setIsChanged(true);
        window.alert("저장되었습니다.");
        setIndex((prevValue) => prevValue + 1);
    };

    const cancelCart = () => {
        setIsOpen(!isOpen);
        setSelectedVideo(null);
    };

    const deleteVideoFromCart = (seq) => {
        var i = Object.keys(cart).find(key => cart[key].seq === seq);
        if(cart[i].id !== 0)
            cart[i].deleted = 1;
        else
            delete cart[i];
        console.log("delete!");
        console.log(cart);
        setIsChanged(true);
        setCart({ ...cart }); //setCart passes on a state change to the Cart component
        window.alert("삭제되었습니다.");
    };

    useEffect(
        function () {
            setIsChanged(false);
        },
        [isChanged]
    );

    const search = useCallback(
        (query) => {
            setNewQuery(query);
            setSelectedVideo(null);
            youtube.search(query).then(function (response) {
                setSearchedVideos(response);
            });
        },
        // []
        [youtube]
    );

    const getToken = useCallback(
        async (value) => {
            await youtube.getTokenDetail(newQuery, value).then(function (response) {
                setSearchedVideos(response);
            });
        },
        // []
        [youtube]
    );

    const onToggle = () => {
        setIsSelected(!isSelected);
    };

    const titleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const descriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const newTitleChange = (e) => {
        setUpdatePlaylistTitle(e.target.value);
    };

    const checkElapsedTime = (e) => {
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        setCurrentFloatTime(e.target.getCurrentTime());
        // console.log(currentTime);
        var toHHMMSS = (secs) => {
            var sec_num = parseInt(secs, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor(sec_num / 60) % 60;
            var seconds = sec_num % 60;

            return [hours, minutes, seconds]
                .map((v) => (v < 10 ? "0" + v : v))
                .filter((v, i) => v !== "00" || i > 0)
                .join(":");
        };
        // console.log("duration");
        // console.log(duration);
        setCurrentPlayTime(toHHMMSS(currentTime));
    };

    const onClickStartTime = (currentPlayTime) => {
        setStartTime(currentPlayTime);
        setStartFloatTime(currentFloatTime);
        if (endTime && startTime > endTime) {
            alert("시작 시간을 종료 시간 이전으로 설정해주세요!");
            setStartTime(0);
        }
    };

    const onClickEndTime = (currentPlayTime) => {
        setEndTime(currentPlayTime);
        setEndFloatTime(currentFloatTime);
        if (endTime < startTime) {
            alert("종료 시간을 시작 시간 이전으로 설정해주세요!");
            setEndTime(startTime);
        }
    };

    useEffect(async function () {
        let searchedResults = await youtube.search(location.state.playlistName);
        setSearchedVideos(searchedResults);
        // console.log(searchedVideos);
        // console.log(location);
        setPlaylistName(location.state.playlistName);
        setPlaylistId(location.state.playlistId);
        // console.log(location.state.response);
        // console.log(location.state.playlistName);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu="pages"
                secondParentMenu="event"
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                CanvasLogo={Logo}
                mobileNormalLogo={Logo}
                CanvasClass="right_menu_togle hidden-md"
                headerClass="full-width-header header-style1 home8-style4"
            />

            <div className="rs-event orange-style pb-100 md-pb-80 pt-20" style={{background: "#fff"}}>
                <div>
                    <div className="d-flex justify-content-center">
                        <YoutubeVideoSearchWidget onSearch={search} isSearchShown={isSearchShown} setIsSearchShown={setIsSearchShown} />
                    </div>
                    <div></div>
                </div>
                <div class="text-center dashboard-tabs">
                    <div className="intro-info-tabs border-none row">
                        <div>
                            <div>
                                <YoutubeVideoListWidget
                                    videos={searchedVideos.items}
                                    selectVideo={selectVideo}
                                    nextPageToken={searchedVideos.nextPageToken}
                                    prevPageToken={searchedVideos.prevPageToken}
                                    getToken={getToken}
                                    addVideoToCart={addVideoToCart}
                                    deleteVideoFromCart={deleteVideoFromCart}
                                    cart={cart}
                                    selectPart={selectPart}
                                />
                            </div>
                            {isOpen ? (
                                <Modal
                                    isOpen={isOpen}
                                    onClose={() => {
                                        openModal();
                                        setSelectedVideo(null);
                                    }}
                                    onRequestClose={() => setIsOpen(false)}
                                    style={{
                                        overlay: {
                                            zIndex: "100",
                                            position: "fixed",
                                            top: -65,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: "rgb(0, 0, 0, 0.55)",
                                        },
                                        content: {
                                            position: "absolute",
                                            top: "20%",
                                            left: "26%",
                                            right: "26%",
                                            background: "#fff",
                                            WebkitOverflowScrolling: "touch",
                                            outline: "none",
                                            padding: "0px",
                                            height: "73%",
                                        },
                                    }}
                                >
                                    <div className="col-12 mb-20 d-flex justify-content-center" style={{ minHeight: "500px", width: "100%" }}>
                                        <div style={{marginTop: "30px"}}>
                                            <h5 className="w-100 mb-10">영상 구간 설정</h5>
                                            <div>
                                                <div>
                                                    <YouTube videoId={selectedVideo.youtubeId} opts={opts} onStateChange={(e) => checkElapsedTime(e)} />
                                                </div>
                                                <div classname="d-flex flex-wrap justify-content-start align-items-center w-100">
                                                    <div className="d-flex flex-nowrap justify-content-start align-items-center">
                                                        <div className="fw-bold w-100" style={{borderBottom: "1px solid gray", fontSize: "16pt", color:"black", padding: "5px 0px"}}>{selectedVideo.title}</div>
                                                        {/* <div className="w-100">
                                    <input
                                      type="text"
                                      id="title"
                                      name="title"
                                      placeholder="제목을 입력하세요"
                                      value={newTitle ? selectedVideo.newTitle : selectedVideo.title}
                                      onChange={titleChange}
                                      required
                                    />
                                    </div> */}
                                                        {/* <div className="form-group col-lg-12">
                                    <div className="my-2 text-start">설명</div>
                                    <input
                                      type="text"
                                      id="description"
                                      name="description"
                                      placeholder="설명을 입력하세요. "
                                      value={newDescription}
                                      onChange={descriptionChange}
                                    />
                                  </div> */}
                                                    </div>
                                                    <div className="mb-10">
                                                        <span className="fw-bold">영상 재생 시간</span>
                                                        {": "}
                                                        {selectedVideo.duration ? realFinalDuration : "0초"}
                                                    </div>
                                                    <div className="d-flex justify-content-start align-items-center mb-10">
                                                        <button className="time-btn text-center rounded-3 mr-10" onClick={() => onClickStartTime(currentPlayTime)}>
                                                            시작 시간
                                                        </button>
                                                        <div style={{ fontSize: "8pt", color: "lightgray" }}>
                                                            {startTime
                                                                ? startTime
                                                                : (parseInt(selectedVideo.start_s / 60) < 10 ? "0" + parseInt(selectedVideo.start_s / 60) : parseInt(selectedVideo.start_s / 60)) +
                                                                  ":" +
                                                                  (parseInt(selectedVideo.start_s % 60) < 10 ? "0" + parseInt(selectedVideo.start_s % 60) : parseInt(selectedVideo.start_s % 60))}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <button className="time-btn text-center rounded-3 mr-10" onClick={() => onClickEndTime(currentPlayTime)}>
                                                            종료 시간
                                                        </button>
                                                        <div style={{ fontSize: "8pt", color: "lightgray" }}>
                                                            {endTime
                                                                ? endTime
                                                                : (parseInt(selectedVideo.end_s / 60) < 10 ? "0" + parseInt(selectedVideo.end_s / 60) : parseInt(selectedVideo.end_s / 60)) +
                                                                  ":" +
                                                                  (parseInt(selectedVideo.end_s % 60) < 10 ? "0" + parseInt(selectedVideo.end_s % 60) : parseInt(selectedVideo.end_s % 60))}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end align-items-center ml-50 mt-10">
                                                        <div className="part-save-btn text-center ml-30 rounded-3" role="button" onClick={(e) => savePart(selectedVideo)}>
                                                            저장
                                                        </div>
                                                        <div className="part-save-btn text-center rounded-3" style={{ background: "gray" }} role="button" onClick={(e) => cancelCart()}>
                                                            취소
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            ) : null}
                            <>
                                {/* 플레이리스트 담은영상 (카트) */}
                                <div className={"d-flex justify-content-center cart-center w-100"}>
                                    <Cart
                                        cart={cart}
                                        playlistTitle={playlistName}
                                        playlistId={playlistId}
                                        setPart={setPart}
                                        existingVideo={existingVideo}
                                        deleteVideoFromCart={deleteVideoFromCart}
                                    ></Cart>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
            <Footer footerClass="rs-footer home9-style main-home" footerLogo={footerLogo} />

            {/* scrolltop-start */}
            <ScrollToTop scrollClassName="scrollup orange-color " />
            {/* scrolltop-end */}

            <SearchModal />
        </React.Fragment>
    );
};

export default YoutubeSearch;
