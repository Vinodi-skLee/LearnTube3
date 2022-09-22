import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import OffWrap from '../../components/Layout/Header/OffWrap';
import SearchModal from '../../components/Layout/Header/SearchModal';
import ScrollToTop from '../../components/Common/ScrollTop';
import YoutubeVideoListWidget from '../../components/Widget/YoutubeVideoListWidget';
import YoutubeVideoSearchWidget from '../../components/Widget/YoutubeVideoSearchWidget';
import axios from 'axios';
import Youtube from '../../service/youtube';
import YouTube from 'react-youtube';
import Range from 'rc-slider';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import Cart from './cart';
import Modal from "react-modal";

// Image
import favIcon from '../../assets/img/fav-orange.png';
import Logo from '../../assets/img/logo/Learntube-logos_transparent.png';
import footerLogo from '../../assets/img/logo/lite-logo.png';
import cartPage from '../../assets/img/icon/trolley.png';


const YoutubeSearch = () => {
    const location = useLocation();
    console.log("playlist name: " + location.state.playlistName);
    const opts = {
        height: '300',
        width: '400',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            start: 0,
        },
    };

    const [newQuery, setNewQuery] = useState("알고리즘");
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [paginatedVideos, setPaginatedVideos] = useState([]);
    const [realNewViewCount, setNewViewCount] = useState(0);
    const [realFinalDuration, setFinalDuration] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [cart, setCart] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [playlistName, setPlaylistName] = useState(location.state.playlistName);
    const [newTitle, setNewTitle] = useState(playlistName);
    const [currentPlayTime, setCurrentPlayTime] = useState();
    const [currentFloatTime, setCurrentFloatTime] = useState();
    const [startTime, setStartTime] = useState();
    const [startFloatTime, setStartFloatTime] = useState();
    const [endTime, setEndTime] = useState();
    const [playlistId,setPlaylistId] = useState(0);
    const [endFloatTime, setEndFloatTime] = useState();
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(playlistName);
    const [duration, setDuration] = useState('');
    const [isSearchShown, setIsSearchShown] = useState(true);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);

    const httpClient = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: { key: process.env.REACT_APP_YOUTUBE_API },

    });
    const youtube = new Youtube(httpClient);
    let finalDuration = '';
    let  viewCountInt, newViewCount;
    const selectVideo = (video) => {
        console.log("video selected");
    };
    const selectPart = (video) => {
        console.log("video selected!!!");
        setNewTitle('');
        setNewDescription('');
        setIsSelected(false);
        setStartTime(false);
        setEndTime(false);
        setSelectedVideo(video);
        //console.log(selectedVideo);
        // console.log(selectedVideo.id);
        //조회수 커스터마이징
        setDuration(video.contentDetails.duration);
        // if (!video.contentDetails.duration) duration = 'PT9M50S';
        let whereH = video.contentDetails.duration.indexOf('H');
        let whereM = video.contentDetails.duration.indexOf('M');
        let whereS = video.contentDetails.duration.indexOf('S');
        let hour, min, sec;
        if (whereH > -1) {
            let tempDuration = video.contentDetails.duration.split('H');
            let temp_length = tempDuration[0].length;
            hour = tempDuration[0].substring(2, temp_length);
            finalDuration = finalDuration + hour + "시간 ";
        }
        if (whereM > -1) {
            let tempDuration = video.contentDetails.duration.split('M');
            let temp_length = tempDuration[0].length;
            if (whereH > -1) {
                min = tempDuration[0].substring(whereH + 1, temp_length);
            } else min = tempDuration[0].substring(2, temp_length);
            finalDuration = finalDuration + min + "분 ";
            console.log(finalDuration);
        }
        if (whereS > -1) {
            let tempDuration = video.contentDetails.duration.split('S');
            let temp_length = tempDuration[0].length;
            if (whereH > -1 && whereM == -1) {
                sec = tempDuration[0].substring(whereH + 1, temp_length);
            } else if (whereM > -1) {
                sec = tempDuration[0].substring(whereM + 1, temp_length);
            } else sec = tempDuration[0].substring(2, temp_length);
            finalDuration = finalDuration + sec + "초";
            console.log(finalDuration);
        }
        console.log(finalDuration);
        setFinalDuration(finalDuration);
        //조회수 커스텀
        viewCountInt = parseFloat(video.statistics.viewCount);
        if (viewCountInt >= 100000000) {
            newViewCount = (viewCountInt / 100000000.0).toFixed(1) + "억";
        } else if (viewCountInt >= 10000) {
            newViewCount = (viewCountInt / 10000.0).toFixed(0) + "만";
        } else if (viewCountInt > 1000) {
            newViewCount = (viewCountInt / 1000.0).toFixed(1) + "천";
        } else newViewCount = viewCountInt;
        console.log(newViewCount);
        setNewViewCount(newViewCount);
        openModal();
    };

    function customDurationToFloat(durationStringVer){
        let whereH = durationStringVer.indexOf('H');
        let whereM = durationStringVer.indexOf('M');
        let whereS = durationStringVer.indexOf('S');
        var hour, min, sec;
        var durationFloat=0.0;

        if (whereH > -1) {
            let tempDuration = durationStringVer.split('H');
            let temp_length = tempDuration[0].length;
            hour = tempDuration[0].substring(2, temp_length);

            durationFloat = durationFloat + parseFloat(hour)*3600 ;
        }
        if (whereM > -1) {
            let tempDuration = durationStringVer.split('M');
            let temp_length = tempDuration[0].length;
            if (whereH > -1) {
                min = tempDuration[0].substring(whereH + 1, temp_length);
            } else min = tempDuration[0].substring(2, temp_length);
            console.log("min: "+min);
            durationFloat = durationFloat + parseFloat(min)* 60;

        }
        if (whereS > -1) {
            let tempDuration = durationStringVer.split('S');
            let temp_length = tempDuration[0].length;
            if (whereH > -1 && whereM == -1) {
                sec = tempDuration[0].substring(whereH + 1, temp_length);
            } else if (whereM > -1) {
                sec = tempDuration[0].substring(whereM + 1, temp_length);
            } else sec = tempDuration[0].substring(2, temp_length);
            durationFloat = durationFloat + parseFloat(sec);
        }
        // console.log(durationFloat);
        return durationFloat;
    }

    let newId;
    const addVideoToCart = (video) => {
       console.log(video);
        // let totalTime = e.target.getDuration();
        // console.log("totalTime"+totalTime);
        newId = video.id;
        //newTitle&newDescription 삽입
        video.snippet.newTitle = newTitle;
        video.snippet.newDescription = newDescription;
        video.start_s = parseInt(startFloatTime);
        video.end_s = parseInt(endFloatTime);
        console.log(isNaN(video.end_s));
        if(isNaN(video.end_s) || isNaN(video.start_s)) {
            //console.log(video.contentDetails.duration);
            video.duration = customDurationToFloat(video.contentDetails.duration);
            console.log(video.duration);
        }
        else video.duration = parseInt(endFloatTime - startFloatTime);
        console.log(video.snippet.newTitle + "\n" + newDescription);
        cart[newId] = video;
        for (const prop in cart) {
            console.log(prop);
            console.log(cart[prop]);
        }
        setIsChanged(true);
        window.alert("저장되었습니다.");
    };

    const cancelCart = () => {
        setSelectedVideo(null);
    }

    const deleteVideoFromCart = (id) => {
        console.log(id);
        delete cart[id];
        console.log(cart);
        setIsChanged(true);
        window.alert("삭제되었습니다.");
    };

    useEffect(function () {
        setIsChanged(false);
    }, [isChanged]);
    // query를 받아와서 search 후 searchedVideos에 결과 저장
    const search = useCallback(
        (query) => {
            setNewQuery(query);
            setSelectedVideo(null);
            youtube.search(query).then(function (response) {
                setSearchedVideos(response);
            })
        },
        [youtube],
    );

    const getToken = useCallback(
        async (value) => {
            await youtube.getTokenDetail(newQuery, value).then(function (response) {
                setSearchedVideos(response);
                //setPaginatedVideos(response.items);
            })
        }, [youtube],
    );

    const onToggle = () => {
        setIsSelected(!isSelected);
    }

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
        console.log(currentTime);
        var toHHMMSS = (secs) => {
            var sec_num = parseInt(secs, 10)
            var hours = Math.floor(sec_num / 3600)
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60

            return [hours, minutes, seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v, i) => v !== "00" || i > 0)
                .join(":")
        }
        console.log("duration");
        console.log(duration);
        setCurrentPlayTime(toHHMMSS(currentTime));

        // if (currentTime / duration > 0.95) {
        //     setModalIsOpen(true);
        // }
    };
    const onClickStartTime = (currentPlayTime) => {
        setStartTime(currentPlayTime);
        setStartFloatTime(currentFloatTime);
        if (endTime && startTime > endTime) {
            alert("시작 시간을 종료 시간 이전으로 설정해주세요!");
            setStartTime(0);
        }

    }

    const onClickEndTime = (currentPlayTime) => {
        setEndTime(currentPlayTime);
        setEndFloatTime(currentFloatTime);
        if (endTime < startTime) {
            alert("종료 시간을 시작 시간 이전으로 설정해주세요!");
            setEndTime(startTime)
        };
    }




    // 처음 페이지를 로딩할 때 default로 query 값 설정
    useEffect(async function () {
        let searchedResults = await youtube.search(location.state.playlistName);
        setSearchedVideos(searchedResults);
        console.log(searchedVideos);
        console.log(location);
        setPlaylistName(location.state.playlistName);
        setPlaylistId(location.state.playlistId);
        console.log(location.state.response);
        console.log(location.state.playlistName);
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu='pages'
                secondParentMenu='event'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                CanvasLogo={Logo}
                mobileNormalLogo={Logo}
                CanvasClass="right_menu_togle hidden-md"
                headerClass="full-width-header header-style1 home8-style4"
            />


            {/* <div className="rs-event orange-style pt-50 pb-100 md-pt-80 md-pb-80"> */}
            <div className="rs-event orange-style pb-100 md-pb-80 gray-bg pt-30">
                <div>
                    <div className="d-flex col-12 col-md-12 justify-content-between">
                    < YoutubeVideoSearchWidget onSearch={search} isSearchShown={isSearchShown} setIsSearchShown={setIsSearchShown}/>
                    <div className="d-flex align-items-center mr-50" style={{position: "relative", zIndex: "999"}}>
                        {updatePlaylist 
                        ? <h4 className="ps-2 mt-15 mb-0"><i className="fa fa-play-circle-o pe-1 pt-3"></i>
                        <input type="text" id="updatedTitle" name="updatedTitle" placeholder={playlistName} className="border-0"
                                value={updatePlaylistTitle} onChange={newTitleChange} />
                        {/* <i className="fa fa-check ps-3 pt-3 orange-color" onClick={()=>setUpdatePlaylist(!updatePlaylist)}></i>
                        <i className="fa fa-rotate-left ps-3 pt-3 orange-color" onClick={()=>setUpdatePlaylist(!updatePlaylist)}></i> */}
                        </h4> 
                        : <h4 className="ps-2 mt-15 mb-0"><i className="fa fa-play-circle-o pe-1 pt-3"></i>
                        {location.state.playlistName != undefined || location.state.playlistName ? playlistName : '제목'}
                        {/* <i className="fa fa-pencil ps-3 pt-3 orange-color" onClick={()=>setUpdatePlaylist(!updatePlaylist)}></i> */}
                        </h4>}
                    </div>
                    </div>
                    <div class="text-center dashboard-tabs">
                        <div className="intro-info-tabs border-none row">
                            {/* <div className="col-md-4">
                                <div className="widget-area">
                                    <YoutubeVideoListWidget videos={searchedVideos}
                                        onVideoClick={selectVideo}
                                        display={'list'} />

                                </div>
                            </div> */}
                            {/* video를 선택했을 경우 화면 반으로 나눠서 구성 */}
                            <div className="d-flex">
                            <div className={isSearchShown ? "col-md-6 col-6" : "col-md-0"}>
                                    <div className={"widget-area search-window"} style={isSearchShown ? {display: "block"} : {display: "none"}}>
                                        <YoutubeVideoListWidget videos={searchedVideos.items}
                                            selectVideo={selectVideo} nextPageToken={searchedVideos.nextPageToken}
                                            prevPageToken={searchedVideos.prevPageToken} getToken={getToken}
                                            addVideoToCart={addVideoToCart} deleteVideoFromCart={deleteVideoFromCart} cart={cart} />
                                    </div>
                            </div>
                            {/* {isSearchShown ?
                                (<div className="col-md-12 col-12">
                                    <div className={isSearchShown ? "widget-area search-window search-window-fade-out" : "widget-area search-window search-window-fade-in"}>
                                    < YoutubeVideoSearchWidget onSearch={search} />
                                        <YoutubeVideoListWidget videos={searchedVideos.items}
                                            onVideoClick={selectVideo} nextPageToken={searchedVideos.nextPageToken}
                                            prevPageToken={searchedVideos.prevPageToken} getToken={getToken}
                                            cartClick={addVideoToCart} cartUnclick={deleteVideoFromCart} cart={cart} />

                                    </div>
                                </div>)
                                : <div className="col-lg-6 col-md-7">
                                    <div className="widget-area search-window">
                                    < YoutubeVideoSearchWidget onSearch={search} />
                                        <YoutubeVideoListWidget videos={searchedVideos.items}
                                            onVideoClick={selectVideo} nextPageToken={searchedVideos.nextPageToken}
                                            prevPageToken={searchedVideos.prevPageToken} getToken={getToken}
                                            cartClick={addVideoToCart} cartUnclick={deleteVideoFromCart} cart={cart} />
                                    </div>
                                </div>} */}
                                {isOpen ? <Modal
                                isOpen={isOpen}
                                onClose={() => {
                                    openModal();
                                }}
                                onRequestClose={() => setIsOpen(false)}
                                style={{
                                    overlay: {
                                        zIndex: "100",
                                        position: "fixed",
                                        top: -20,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgb(0, 0, 0, 0.55)",
                                    },
                                    content: {
                                        position: "absolute",
                                        top: "15%",
                                        left: "25%",
                                        right: "25%",
                                        bottom: "10%",
                                        background: "#fff",
                                        overflow: "auto",
                                        WebkitOverflowScrolling: "touch",
                                        outline: "none",
                                        padding: "0px",
                                        height: "80%",
                                    },
                                }}>
                                <div className="col-12 mb-500 " style={{minHeight: "500px"}}>
                                    <div className="d-flex" style={{marginLeft: "30px", marginTop: "30px"}}>
                                        <YouTube videoId={selectedVideo.id} opts={opts} onStateChange={(e) => checkElapsedTime(e)} />
                                        <div class="col-5 lh-base">
                                            <div class="mx-md-3 fs-5 text-start" style={{fontWeight: "bold"}}>{selectedVideo.snippet.title}</div>
                                            <div class="fw-light mx-3" style={{fontSize: "10pt"}}>
                                                <div class="text-start text-muted">{selectedVideo.snippet.channelTitle}</div>
                                                
                                                <div class="border-start border-secondary"></div>
                                                <div class="text-start text-muted">조회수 {selectedVideo.statistics.viewCount ? realNewViewCount : '0'}회</div>
                                                
                                                <div class="border-start border-secondary"></div>
                                                <div class="text-start text-muted">영상 총 시간 {selectedVideo.contentDetails.duration ? realFinalDuration : '0'}</div>
                                                
                                                <div class="border-start border-secondary"></div>
                                                <div class="text-start text-mute">{selectedVideo.snippet.publishTime.slice(0, 10)}</div>
                                            </div>
                                            <div class="mx-3 my-2 border-bottom"></div>
                                            <div class="mt-5 mx-md-3 text-start text-muted">{selectedVideo.snippet.description}</div>
                                        </div>
                                    </div>
                                    <div class="row col-10" style={{marginLeft: "30px"}}>
                                        {/* <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                            {isSelected == false ? <button className="createbtn text-center me-3" onClick={onToggle}>저장</button> : null}
                                        </div> */}
                                        <div className={selectedVideo ? "col-12 register-section mx-md-4" : "col-12 register-section mx-md-4 d-none"} >
                                            <div className="">
                                                <div className="py-3">
                                                    <div className="text-start mb-10">
                                                        <div className="mt-3 mb-10 fs-3">영상 설정</div>
                                                    </div>
                                                    <div className="my-2 text-start mt-4">영상 구간 설정 (원하는 위치에서 버튼을 클릭하세요)</div>

                                                    <div className="d-flex mb-4">
                                                        <div className="d-flex justify-content-start">
                                                            <button className="createbtn text-center ms-0 rounded-3" onClick={() => onClickStartTime(currentPlayTime)}>시작 시간</button>
                                                        </div>
                                                        <div className="d-flex justify-content-start ms-3 mt-1">
                                                            <div className="">{startTime ?? currentPlayTime}</div>
                                                        </div>
                                                        <div className="d-flex justify-content-start ms-4">
                                                            <button className="createbtn text-center ms-0 rounded-3" onClick={() => onClickEndTime(currentPlayTime)}>종료 시간</button>
                                                        </div>
                                                        <div className="d-flex justify-content-start ms-3 mt-1">
                                                            <div className="d-flex">{endTime ?? currentPlayTime}</div>
                                                        </div>
                                                    </div>
                                                    <div className="styled-form">
                                                        <div id="form-messages"></div>
                                                        <form id="contact-form" method="post" action="#">
                                                            <div className="row clearfix">
                                                                <div className="form-group col-lg-12 mb-25">
                                                                    <div className="my-2 text-start">영상 제목</div>
                                                                    <input type="text" id="title" name="title" placeholder="제목을 입력하세요" value={newTitle} onChange={titleChange} required />
                                                                </div>
                                                                <div className="form-group col-lg-12">
                                                                    <div className="my-2 text-start">설명</div>
                                                                    <input type="text" id="description" name="description" placeholder="설명을 입력하세요. "
                                                                        value={newDescription} onChange={descriptionChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-flex justify-content-center mt-4 align-items-center">
                                                                <div className="createbtn text-center mr-20 rounded-3" role="button" onClick={(e) => cancelCart()}>
                                                                    {/* <button className=" text-center" onClick={() => addVideoToCart(selectedVideo)}>저장</button> */}
                                                                    취소
                                                                </div>
                                                                <div className="createbtn text-center ml-20 rounded-3" role="button" onClick={(e) => addVideoToCart(selectedVideo)}>
                                                                    {/* <button className=" text-center" onClick={() => addVideoToCart(selectedVideo)}>저장</button> */}
                                                                    저장
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </Modal>
                                :
                                null}
                                <>
                                    <div className={isSearchShown ? "col-6 bg-white cart-right" : "d-block bg-white cart-center"}>
                                        <Cart cart={cart} playlistTitle={playlistName} playlistId={playlistId} selectPart={selectPart}></Cart>
                                    </div>
                                </>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                footerClass="rs-footer home9-style main-home"
                footerLogo={footerLogo}
            />

            {/* scrolltop-start */}
            <ScrollToTop
                scrollClassName="scrollup orange-color"
            />
            {/* scrolltop-end */}

            <SearchModal />
        </React.Fragment>
    );
}

export default YoutubeSearch