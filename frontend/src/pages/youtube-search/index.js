import React, { useEffect, useMemo } from "react";
import { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
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
import "rc-slider/assets/index.css";
import Cart from "./cart";
import Modal from "react-modal";

// Image
import favIcon from "../../assets/img/fav-orange.png";
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";

const YoutubeSearch = () => {
    const location = useLocation();
    const opts = {
        height: "400",
        width: "700",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            start: 0,
        },
    };
    let lastSeq;
    if (!window.sessionStorage.getItem("lastSeq")) lastSeq = -1;
    else lastSeq = window.sessionStorage.getItem("lastSeq");

    const [newQuery, setNewQuery] = useState("알고리즘");
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    // const [paginatedVideos, setPaginatedVideos] = useState([]);
    // const [realNewViewCount, setNewViewCount] = useState(0);
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
    // const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(playlistName);
    const [duration, setDuration] = useState(0);
    const [isSearchShown, setIsSearchShown] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    //const [index, setIndex] = useState(Object.keys(existingVideo).length);
    const [isInPlaylist, setIsInPlaylist] = useState(lastSeq);
    console.log("lastSeq === " + lastSeq);
    const [isStartModified, setIsStartModified] = useState(0);
    const [isEndModified, setIsEndModified] = useState(0);
    const [index, setIndex] = useState(lastSeq + 1);
    const [newCart, setNewCart] = useState({});

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
        newDescription: "",
    };

    // console.log("isInPlaylist : " + isInPlaylist);
    // console.log("index : " + index);

    const httpClient = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: { key: process.env.REACT_APP_YOUTUBE_API },
    });
    const youtube = new Youtube(httpClient);
    let finalDuration = "";
    // let viewCountInt, newViewCount;

    const selectPart = (video) => {
        initVideo.newTitle = newTitle ? newTitle : video.snippet.title;
        initVideo.newDescription = newDescription;
        initVideo.start_s = 0;
        initVideo.end_s = customDurationToFloat(video.contentDetails.duration);
        initVideo.title = video.snippet.title;
        initVideo.youtubeId = video.id;
        initVideo.playlistId = playlistId;
        initVideo.duration = customDurationToFloat(video.contentDetails.duration);
        // console.log("duration: " + initVideo.duration);
        initVideo.seq = index;
        initVideo.tag = true;

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
        setIsOpen(true);
    };

    const setPart = (video) => {
        // console.log("video selected!!!");
        setSelectedVideo(video);
        setDuration(video.duration);
        console.log("selectedVideo === " + selectedVideo);
        let time = [0, 0, 0];
        let remain = video.duration;
        for (const x in time) {
            time[x] = parseInt(remain % 60);
            remain = remain / 60;
        }
        if (time[2] > 0) finalDuration = time[2] + "시간 " + time[1] + "분 " + time[0] + "초";
        else if (time[1] > 0) finalDuration = time[1] + "분 " + time[0] + "초";
        else finalDuration = time[0] + "초";
        setFinalDuration(finalDuration);
        openModal();
    };

    function customDurationToFloat(durationStringVer) {
        // console.log("durationStringVer === " + durationStringVer);
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
        // console.log("hr: " + hour);
        if (whereM > -1) {
            let tempDuration = durationStringVer.split("M");
            let temp_length = tempDuration[0].length;
            if (whereH > -1) {
                min = tempDuration[0].substring(whereH + 1, temp_length);
            } else min = tempDuration[0].substring(2, temp_length);
            durationFloat = durationFloat + parseFloat(min) * 60;
        }
        // console.log("min: " + min);
        if (whereS > -1) {
            let tempDuration = durationStringVer.split("S");
            let temp_length = tempDuration[0].length;
            if (whereH > -1 && whereM === -1) {
                sec = tempDuration[0].substring(whereH + 1, temp_length);
            } else if (whereM > -1) {
                sec = tempDuration[0].substring(whereM + 1, temp_length);
            } else sec = tempDuration[0].substring(2, temp_length);
            durationFloat = durationFloat + parseFloat(sec);
        }
        // console.log("sec: " + sec);

        console.log("final: " + durationFloat);

        return durationFloat;
    }

    const savePart = (video) => {
        console.log("video id : " + video.youtubeId);
        var i = Object.keys(cart).find((key) => cart[key].seq === video.seq);
        if (cart[i] === undefined) {
            video.newTitle = newTitle ? newTitle : "";
            video.newDescription = newDescription ? newDescription : "";
            video.start_s = startFloatTime ? parseInt(startFloatTime) : 0;
            video.end_s = endFloatTime ? parseInt(endFloatTime) : video.duration;
            video.duration = video.end_s - video.start_s;
            video.seq = index;
            if ((isStartModified === 1 && isEndModified === 1) || (video.tag === "startModified" && isEndModified === 1) || (video.tag === "endModified" && isStartModified === 1)) {
                video.tag = "bothModified";
            } else if (video.tag !== "bothModified" && isStartModified === 1) {
                video.tag = "startModified";
            } else if (video.tag !== "bothModified" && isEndModified === 1) {
                video.tag = "endModified";
            }
            cart[index] = video;
            setIndex((index) => index + 1);
            // console.log("in undefined");
        } else {
            cart[i].newTitle = newTitle ? newTitle : "";
            cart[i].newDescription = newDescription ? newDescription : "";
            cart[i].start_s = startFloatTime ? parseInt(startFloatTime) : cart[i].start_s;
            cart[i].end_s = endFloatTime ? parseInt(endFloatTime) : cart[i].end_s;
            cart[i].duration = cart[i].end_s - cart[i].start_s;
            if ((isStartModified === 1 && isEndModified === 1) || (cart[i].tag === "startModified" && isEndModified === 1) || (cart[i].tag === "endModified" && isStartModified === 1)) {
                cart[i].tag = "bothModified";
            } else if (cart[i].tag !== "bothModified" && isStartModified === 1) {
                cart[i].tag = "startModified";
            } else if (cart[i].tag !== "bothModified" && isEndModified === 1) {
                cart[i].tag = "endModified";
            }
            // console.log("in existing");
        }
        setCart({ ...cart });
        newCart[video.youtubeId] = video;
        setIsChanged(true);
        window.alert("저장되었습니다.");
        setIsOpen(false);
        setSelectedVideo(null);
        setNewTitle("");
        setNewDescription("");
        setIsSelected(false);
        setStartTime(false);
        setEndTime(false);
        setStartFloatTime(0.0);
        setEndFloatTime(0.0);
        setIsStartModified(0);
        setIsEndModified(0);
    };

    const addVideoToCart = (video) => {
        // console.log("add!! index === " + index);
        initVideo.seq = index;
        initVideo.newDescription = newDescription;
        initVideo.start_s = startFloatTime ? parseInt(startFloatTime) : 0;
        initVideo.end_s = endFloatTime ? parseInt(endFloatTime) : customDurationToFloat(video.contentDetails.duration);
        initVideo.title = video.snippet.title;
        initVideo.youtubeId = video.id;
        initVideo.playlistId = playlistId;
        initVideo.duration = initVideo.end_s - initVideo.start_s;
        cart[index] = initVideo;
        newCart[video.youtubeId] = video;
        // console.log(cart[index]);
        setIndex((index) => index + 1);
        setCart({ ...cart });
        setIsChanged(true);
        window.alert("저장되었습니다.");
        for (const prop in cart) {
            console.log("idx: " + cart[prop].seq);
        }
    };

    const cancelCart = () => {
        setIsOpen(!isOpen);
        setSelectedVideo(null);
    };

    const deleteVideoFromCart = (seq) => {
        var i = Object.keys(cart).find((key) => cart[key].seq === seq);
        var youtubeId = cart[i].youtubeId;

        delete cart[i];
        delete newCart[youtubeId];

        console.log("delete!");
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
        setCurrentPlayTime(toHHMMSS(currentTime));
    };

    const onClickStartTime = (currentPlayTime, end_t) => {
        console.log("scurrentFloatTime: " + currentFloatTime);
        console.log("scurrentPlayTime: " + currentPlayTime);
        var t = endFloatTime ? endFloatTime : end_t;
        if (currentFloatTime > t) {
            window.alert("시작 시간을 종료 시간 이전으로 설정해주세요!");
        } else {
            setStartTime(currentPlayTime);
            setStartFloatTime(currentFloatTime);
        }
        setIsStartModified(1);
    };

    const onClickEndTime = (currentPlayTime, start_t) => {
        console.log("ecurrentFloatTime: " + currentFloatTime);
        console.log("ecurrentPlayTime: " + currentPlayTime);
        var t = startFloatTime ? startFloatTime : start_t;
        if (currentFloatTime < t) {
            window.alert("종료 시간을 시작 시간 이전으로 설정해주세요!");
        } else {
            setEndTime(currentPlayTime);
            setEndFloatTime(currentFloatTime);
        }
        setIsEndModified(1);
    };

    const timePoint = (time) => {
        var h = "";
        var m = "";
        var s = "";
        if (parseInt(time / 3600) > 0) {
            h = parseInt(time / 3600);
            time = parseInt(time % 3600);
        }
        if (parseInt(time / 60) > 0) {
            m = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
            time = parseInt(time % 60);
        } else {
            m = "00";
        }
        if (parseInt(time) > 0) {
            s = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
        } else {
            s = "00";
        }
        if (h !== "") return h + ":" + m + ":" + s;
        else return m + ":" + s;
    };

    const printDuration = (time) => {
        console.log("time === " + time);
        var h = "";
        var m = "";
        var s = "";
        if (parseInt(time / 3600) > 0) {
            h = parseInt(time / 3600);
            time = parseInt(time % 3600);
        }
        if (parseInt(time / 60) > 0) {
            if (h === "") m = parseInt(time / 60) < 10 ? parseInt(time / 60) : parseInt(time / 60);
            else m = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
            time = parseInt(time % 60);
        }
        if (parseInt(time) > 0) {
            s = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
        } else {
            s = "0";
        }
        if (h !== "") return h + "시간 " + m + "분 " + s + "초";
        else if (m !== "") return m + "분 " + s + "초";
        else return s + "초";
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

    function decodeHTMLEntities(str) {
        if (str !== undefined && str !== null && str !== "") {
            str = String(str);

            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')&>/gim, "");
            var element = document.createElement("div");
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = "";
        }
        return str;
    }

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

            <div className="rs-event orange-style pb-100 md-pb-80 pt-20 g gray-bg">
                <div>
                    <div className="d-flex justify-content-center">
                        <YoutubeVideoSearchWidget onSearch={search} isSearchShown={isSearchShown} setIsSearchShown={setIsSearchShown} playlistName={playlistName} />
                    </div>
                    <div></div>
                </div>
                <div class="text-center dashboard-tabs">
                    <div className="intro-info-tabs border-none row">
                        <div>
                            <div>
                                <YoutubeVideoListWidget
                                    videos={searchedVideos.items}
                                    getToken={getToken}
                                    addVideoToCart={addVideoToCart}
                                    deleteVideoFromCart={deleteVideoFromCart}
                                    cart={cart}
                                    index={index}
                                    selectPart={selectPart}
                                    isInPlaylist={isInPlaylist}
                                    newCart={newCart}
                                    setNewCart={setNewCart}
                                />
                            </div>
                            {isOpen ? (
                                <Modal
                                    isOpen={isOpen}
                                    onClose={() => {
                                        setIsOpen(false);
                                        setSelectedVideo(null);
                                        setStartFloatTime(0.0);
                                        setEndFloatTime(0.0);
                                        setStartTime(false);
                                        setEndTime(false);
                                    }}
                                    onRequestClose={() => {
                                        setIsOpen(false);
                                        setSelectedVideo(null);
                                        setStartFloatTime(0.0);
                                        setEndFloatTime(0.0);
                                        setStartTime(false);
                                        setEndTime(false);
                                    }}
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
                                            top: "15%",
                                            left: "26%",
                                            right: "26%",
                                            background: "#fff",
                                            WebkitOverflowScrolling: "touch",
                                            outline: "none",
                                            padding: "0px",
                                            width: "800px",
                                            height: "80%",
                                        },
                                    }}
                                >
                                    <div className="col-12 mb-20 d-flex justify-content-center" style={{ padding: "30px", minHeight: "500px", width: "100%" }}>
                                        <div>
                                            <h5 className="w-100 mb-10">영상 편집</h5>
                                            <div>
                                                <div>
                                                    <YouTube videoId={selectedVideo.youtubeId} opts={opts} onStateChange={(e) => checkElapsedTime(e)} />
                                                </div>
                                                <div>
                                                    <div className="d-flex flex-nowrap justify-content-start align-items-center w-100">
                                                        <div className="fw-bold w-100" style={{ borderBottom: "1px solid gray", fontSize: "16pt", color: "black", padding: "5px 0px" }}>
                                                            {decodeHTMLEntities(selectedVideo.title)}
                                                        </div>
                                                    </div>
                                                    <div className="mb-10">
                                                        <span className="fw-bold">영상 재생 시간</span>
                                                        {": "}
                                                        {printDuration(selectedVideo.duration)}
                                                    </div>

                                                    <div className="d-flex justify-content-center align-items-center mb-20">
                                                        <button className="time-btn text-center" onClick={() => onClickStartTime(currentPlayTime, selectedVideo.end_s)}>
                                                            시작 시간
                                                        </button>
                                                        <div
                                                            style={{
                                                                fontSize: "10pt",
                                                                color: "black",
                                                                border: "1.5px solid #284882",
                                                                background: "#fff",
                                                                marginRight: "10px",
                                                                width: "70px",
                                                                height: "30px",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {startTime ? startTime : timePoint(selectedVideo.start_s)}
                                                        </div>
                                                        <button className="time-btn text-center ml-10" onClick={() => onClickEndTime(currentPlayTime, selectedVideo.start_s)}>
                                                            종료 시간
                                                        </button>
                                                        <div
                                                            style={{
                                                                fontSize: "10pt",
                                                                color: "black",
                                                                border: "1.5px solid #284882",
                                                                background: "#fff",
                                                                width: "70px",
                                                                height: "30px",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {endTime ? endTime : timePoint(selectedVideo.end_s)}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-start w-100 edit-input">
                                                        <span style={{ marginRight: "10px" }}>영상 제목:</span>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            placeholder={selectedVideo.newTitle ? decodeHTMLEntities(selectedVideo.newTitle) : decodeHTMLEntities(selectedVideo.title)}
                                                            value={newTitle}
                                                            onChange={titleChange}
                                                        />
                                                    </div>
                                                    {/* <div className="d-flex justify-content-start w-100 edit-input mt-10">
                                                        <span style={{marginRight: "10px"}}>영상 내용:</span>
                                                        <input
                                                            type="text"
                                                            id="description"
                                                            placeholder={selectedVideo.newDescription ? selectedVideo.newDescription : "설명을 입력해 주세요."}
                                                            value={newDescription}
                                                            onChange={descriptionChange}
                                                            />
                                                    </div> */}
                                                    <div className="d-flex justify-content-end align-items-center ml-50 mt-30">
                                                        <div className="part-save-btn text-center ml-30 rounded-3" role="button" onClick={() => savePart(selectedVideo)}>
                                                            저장
                                                        </div>
                                                        <div className="part-save-btn text-center rounded-3" style={{ background: "#ff7d4b" }} role="button" onClick={(e) => cancelCart()}>
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
                                <div>
                                    <Cart
                                        cart={cart}
                                        playlistTitle={playlistName}
                                        playlistId={playlistId}
                                        setPart={setPart}
                                        index={index}
                                        setIndex={setIndex}
                                        existingVideo={existingVideo}
                                        deleteVideoFromCart={deleteVideoFromCart}
                                        isInPlaylist={isInPlaylist}
                                        setIsInPlaylist={setIsInPlaylist}
                                        lastSeq={lastSeq}
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
