import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Form, Button } from "react-bootstrap";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import PlaylistWidget from "../../components/Widget/PlaylistWidget";
import axios from "axios";
import Modal from "react-modal";
// Image
import favIcon from "../../assets/img/fav-orange.png";
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";

const Playlist = () => {
    const userId = window.sessionStorage.getItem("userId");
    const initCreatePlaylist = {
        userId: userId,
        playlistName: "",
        description: "",
    };
    const initPlaylistData = [
        {
            playlistId: "",
            name: "",
            description: "",
            userName: "",
            thumbnail: "",
            videos: {},
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);
    const [createPlaylist, setCreatePlaylist] = useState(initCreatePlaylist);
    const [playlistId, setPlaylistId] = useState(-1);
    const [isShow, setIsShow] = useState(false);
    const [playlistName, setPlaylistName] = useState("Playlist 생성");
    const [playlistData, setPlaylistData] = useState(initPlaylistData.videos);
    const [selectedPlaylist, setSelectedPlaylist] = useState(initPlaylistData);
    const [playlistSize, setPlaylistSize] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(initPlaylistData.videos);
    const [isSelected, setIsSelected] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [clickedVideo, setClickedVideo] = useState({});
    const [playlistDuration, setPlaylistDuration] = useState();
    const [savedPlaylistName, setSavedPlaylistName] = useState("");
    useEffect(() => {
        const fetchMyPlaylists = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/playlist?userId=${userId}`);
                // console.log(response.data);
                setPlaylistData(response.data);
            } catch (err) {
                console.log("err >> ", err);
            }
        };
        fetchMyPlaylists();
    }, []);

    useEffect(() => {}, [playlistData]);

    const handlePlaylistChange = (name) => {
        let num = 0;
        for (let count = 0; count < playlistData.length; count++) {
            setSavedPlaylistName(playlistData[count].name);
            if (playlistData[count].name == name) {
                break;
            }
            num++;
        }
        console.log(num);
        console.log("playlist data", playlistData[num]);

        //var selected = playlistData[num].videos;
        setSelectedVideo(playlistData[num].videos);
        setPlaylistId(playlistData[num].playlistId);
        setSelectedPlaylist(playlistData[num].name);
        setPlaylistSize(playlistData[num].videos.length);
        setIsSelected(true);
        setClickedVideo(playlistData[num].videos[0]);
        setPlaylistDuration(playlistData[num].totalDuration);
        console.log(selectedVideo);
        setIsClicked(false);
    };

    const handleChange = (e) => {
        setCreatePlaylist({
            ...createPlaylist,
            [e.target.name]: e.target.value.trim(),
            userId: userId,
        });
    };

    const handleSubmit = async () => {
        console.log(JSON.stringify(createPlaylist));
        let temp;
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/create`, JSON.stringify(createPlaylist), {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(function (res) {
                console.log(res.data.playlistId);
                temp = res.data.playlistId;
                setPlaylistId(temp);
                setIsShow(true);
            });
        console.log(createPlaylist.playlistName);
        setPlaylistName(createPlaylist.playlistName);
    };
    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu="learntube"
                secondParentMenu="event"
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                CanvasLogo={Logo}
                mobileNormalLogo={Logo}
                CanvasClass="right_menu_togle hidden-md"
                headerClass="full-width-header header-style1 home8-style4"
            />

            <div className="rs-event orange-style pb-100 md-pb-80 gray-bg">
                <div className="container">
                    {/* <h3>LearnTube Studio</h3> */}

                    <div class="container text-center dashboard-tabs">
                        <div className="intro-info-tabs border-none row">
                            {/* <div className="widget-area">
                                    < SearchWidget />
                                </div> */}
                            {/* <div className="col-lg-4 col-md-12">
                                <div className="widget-area">
                                    <MyPlaylistWidget />
                                </div>
                            </div> */}
                            <div className="col-lg-12 col-md-12">
                                <div className="widget-area">
                                    <div className="mb-50">
                                        <div className="row align-items-center ">
                                            <div className="d-flex justify-content-between align-items-center row mb-3">
                                                <div className="col">
                                                    <h3 className="col text-start" style={{ minWidth: "191px", padding: "55px 0px 25px 30px" }}>
                                                        나의 Playlist
                                                    </h3>
                                                </div>

                                                {playlistData ? (
                                                    <>
                                                        <div className="col d-flex justify-content-end align-items-center">
                                                            <div className="d-flex dropdown show" style={{ height: "135px" }}>
                                                                <Form.Select
                                                                    aria-label="SelectBox"
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value);
                                                                        handlePlaylistChange(e.target.value);
                                                                        setIsClicked(false);
                                                                    }}
                                                                >
                                                                    <option>----- Playlist 선택하기 -----</option>
                                                                    {playlistData ? (
                                                                        playlistData.map((data, i) => (
                                                                            //console.log(playlistData[i].videos.length),({playlistData[i].videos.length})
                                                                            <option key={playlistData[i].playlistId} id={playlistData[i].playlistId} name={playlistData[i].title}>
                                                                                {playlistData[i].name}
                                                                            </option>
                                                                        ))
                                                                    ) : (
                                                                        <option key="playlistsData">Playlist가 존재하지 않습니다.</option>
                                                                    )}
                                                                </Form.Select>
                                                            </div>
                                                            <Button
                                                                onClick={() => {
                                                                    openModal();
                                                                }}
                                                                style={{ backgroundColor: "#6483d8" }}
                                                            >
                                                                만들기
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <PlaylistWidget
                                                isSelected={isSelected}
                                                selectedPlaylist={selectedPlaylist}
                                                selectedVideo={selectedVideo}
                                                playlistId={playlistId}
                                                savedPlaylistName={savedPlaylistName}
                                                playlistSize={playlistSize}
                                                playlistDuration={playlistDuration}
                                                userId={userId}
                                                isClicked={isClicked}
                                                clickedVideo={clickedVideo}
                                                setClickedVideo={setClickedVideo}
                                                handlePlaylistChange={handlePlaylistChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal
                                isOpen={isOpen}
                                onClose={() => {
                                    openModal();
                                }}
                                onRequestClose={() => setIsOpen(false)}
                                style={{
                                    overlay: {
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgb(0, 0, 0, 0.55)",
                                    },
                                    content: {
                                        position: "absolute",
                                        top: "23%",
                                        left: "25%",
                                        right: "25%",
                                        bottom: "140px",
                                        background: "#fff",
                                        overflow: "auto",
                                        WebkitOverflowScrolling: "touch",
                                        outline: "none",
                                        padding: "0px",
                                    },
                                }}
                            >
                                <div className="">
                                    <div className="register-section ">
                                        <div className="container">
                                            <div className="py-3 px-5">
                                                <div className="sec-title text-center mb-10">
                                                    <h2 className="title mt-3 mb-10">{playlistName}</h2>
                                                </div>
                                                <div className="styled-form">
                                                    <div id="form-messages"></div>
                                                    <form id="contact-form" method="post" action="#">
                                                        {isShow ? (
                                                            <div></div>
                                                        ) : (
                                                            <div className="row clearfix">
                                                                <div className="form-group col-lg-12 mb-25">
                                                                    <div className="my-2">
                                                                        Playlist 이름
                                                                        <span className="ms-1" style={{ color: "red" }}>
                                                                            *
                                                                        </span>
                                                                    </div>
                                                                    <input type="text" id="title" name="playlistName" placeholder="제목을 입력하세요" onChange={handleChange} required />
                                                                </div>
                                                                <div className="form-group col-lg-12">
                                                                    <div className="my-2">Playlist 설명</div>
                                                                    <textarea
                                                                        type="textarea"
                                                                        id="description"
                                                                        name="description"
                                                                        onChange={handleChange}
                                                                        placeholder="설명을 입력하세요"
                                                                        style={{ height: "80px", borderRadius: "0px" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {isShow ? (
                                                            <div className="row d-flex justify-content-center ms-3 me-1 mt-3">
                                                                <button
                                                                    type="submit"
                                                                    className="canclebtn"
                                                                    onClick={() => {
                                                                        setIsShow(false);
                                                                        setPlaylistName("Playlist 생성");
                                                                    }}
                                                                >
                                                                    <span className="txt">취소</span>
                                                                </button>
                                                                <Link
                                                                    className="moveToSearch text-center pt-2 d-flex align-items-center justify-content-center"
                                                                    to={{
                                                                        pathname: "/learntube/learntube-studio/youtubeSearch",
                                                                        state: {
                                                                            playlistName: createPlaylist.playlistName,
                                                                            playlistId: playlistId,
                                                                            update: false,
                                                                        },
                                                                    }}
                                                                >
                                                                    <span>playlist에 영상 추가하기</span>
                                                                </Link>
                                                            </div>
                                                        ) : (
                                                            <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                                                <button
                                                                    type="submit"
                                                                    className="canclebtn"
                                                                    onClick={() => {
                                                                        openModal();
                                                                        setIsShow(false);
                                                                        setPlaylistName("Playlist 생성");
                                                                    }}
                                                                    style={{ height: "40px", borderRadius: "5px" }}
                                                                >
                                                                    <span className="txt">취소</span>
                                                                </button>
                                                                <button type="submit" className="createbtn" onClick={handleSubmit} style={{ height: "40px", borderRadius: "5px" }}>
                                                                    {/* <div className="createbtn text-center d-flex align-items-center justify-content-center" onClick={handleSubmit}> */}
                                                                    <span className="txt">저장</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <Footer footerClass="rs-footer home9-style main-home" footerLogo={footerLogo} />

            {/* <CreatePlaylistButton
                scrollClassName="scrollup orange-color"
                onClick={() => { openModal(); }}
            /> */}

            {/* scrolltop-start */}
            {/* <ScrollToTop
                scrollClassName="scrollup orange-color"
            /> */}
            {/* scrolltop-end */}

            <SearchModal />
        </React.Fragment>
    );
};

export default Playlist;
