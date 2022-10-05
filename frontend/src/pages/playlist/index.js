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
import SetPlaylistDropdown from "../../components/Dropdown/SetPlaylistDropdown";
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

    const [playlistId, setPlaylistId] = useState(-1);
    const [playlistData, setPlaylistData] = useState(initPlaylistData.videos);
    const [selectedPlaylist, setSelectedPlaylist] = useState(initPlaylistData);
    const [playlistSize, setPlaylistSize] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(initPlaylistData.videos);
    const [isSelected, setIsSelected] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [clickedVideo, setClickedVideo] = useState({});
    const [playlistDuration, setPlaylistDuration] = useState();
    const [savedPlaylistName, setSavedPlaylistName] = useState("");
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(savedPlaylistName);

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

    const deletePlaylist = () => {
        console.log(playlistId);

        if (window.confirm("Playlist를 정말 삭제하시겠습니까?") == true) {
            axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/delete`, JSON.stringify(playlistId), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                })
                .then((res) => console.log(res));
            alert("삭제되었습니다.");
            window.location.reload();
        } else {
            return false;
        }
    };

    const checkPlaylistName = (event, selectedPlaylist) => {
        if (typeof selectedPlaylist != "string") {
            alert("Playlist를 선택해주세요.");
            event.preventDefault();
        }
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
                                                            <div className="d-flex dropdown show" style={{ left: "50px", height: "135px" }}>
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
                                                            <SetPlaylistDropdown
                                                                playlistId={playlistId}
                                                                setPlaylistId={setPlaylistId}
                                                                userId={userId}
                                                                initCreatePlaylist={initCreatePlaylist}
                                                                setUpdatePlaylist={setUpdatePlaylist}
                                                                updatePlaylist={updatePlaylist}
                                                                deletePlaylist={deletePlaylist}
                                                                isSelected={isSelected}
                                                            />
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
                                                updatePlaylist={updatePlaylist}
                                                setUpdatePlaylist={setUpdatePlaylist}
                                                updatePlaylistTitle={updatePlaylistTitle}
                                                setUpdatePlaylistTitle={setUpdatePlaylistTitle}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
