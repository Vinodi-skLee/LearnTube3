import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form } from "react-bootstrap";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import PlaylistWidget from "../../components/Widget/PlaylistWidget";
import SetPlaylistDropdown from "../../components/Dropdown/SetPlaylistDropdown";
import PlaylistSearchWidget from "../../components/Widget/PlaylistSearchWidget";
import ReactTooltip from "react-tooltip";
import axios from "axios";
// Image
import { IoIosSearch } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
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
    const [searchData, setSearchData] = useState(initPlaylistData.videos);
    const [selectedPlaylist, setSelectedPlaylist] = useState(initPlaylistData);
    const [playlistSize, setPlaylistSize] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(initPlaylistData.videos);
    const [isSelected, setIsSelected] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const [clickedVideo, setClickedVideo] = useState({});
    const [playlistDuration, setPlaylistDuration] = useState();
    const [savedPlaylistName, setSavedPlaylistName] = useState("");
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(savedPlaylistName);
    const [searched, setSearched] = useState(false);

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

    const updatePlaylistData = {
        playlistId: playlistId,
        playlistName: updatePlaylistTitle,
        description: "",
    };

    const newTitleChange = (e) => {
        console.log(updatePlaylistTitle);
        setUpdatePlaylistTitle(e.target.value);
    };

    const handleSubmit = async () => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/update`, JSON.stringify(updatePlaylistData), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        alert(updatePlaylistTitle + "로 playlist 정보가 업데이트 되었습니다.");

        window.location.reload();
    };

    const findSearchData = async (e) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/playlist/search?userId=${userId}&playlistName=${e}`);
            // console.log(response.data);
            setSearchData(response.data);
            setSearched(true);
        } catch (err) {
            console.log("err >> ", err);
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
                    <div class="container text-center dashboard-tabs">
                        <div className="intro-info-tabs border-none row">
                            <div className="col-lg-12 col-md-12">
                                <div className="widget-area">
                                    <div className="mt-0 mb-0">
                                        <div className="row d-flex mt-0 justify-content-between align-items-center" style={{ height: "110px" }}>
                                            <div className="col">
                                                <h3 className="pt-5 fs-4 text-start">
                                                    {isSelected ? "My Playlist > " : "My Playlist"}
                                                    {typeof selectedPlaylist == "string" ? (
                                                        <>
                                                            {updatePlaylist ? (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        id="updatedTitle"
                                                                        name="updatedTitle"
                                                                        placeholder={selectedPlaylist}
                                                                        className="border-0"
                                                                        value={updatePlaylistTitle}
                                                                        onChange={newTitleChange}
                                                                    />
                                                                    <i
                                                                        className="fa fa-check ps-3 pt-3 orange-color"
                                                                        onClick={() => {
                                                                            setUpdatePlaylist(!updatePlaylist);
                                                                            handleSubmit();
                                                                        }}
                                                                    ></i>
                                                                    <i
                                                                        className="fa fa-times ps-3 pt-3 orange-color"
                                                                        onClick={() => {
                                                                            setUpdatePlaylist(!updatePlaylist);
                                                                            setUpdatePlaylistTitle("");
                                                                        }}
                                                                    ></i>
                                                                </>
                                                            ) : (
                                                                <>{selectedPlaylist}</>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </h3>
                                            </div>

                                            {playlistData ? (
                                                <>
                                                    <div className="col d-flex justify-content-end align-items-center">
                                                        {searchMode ? (
                                                            <PlaylistSearchWidget findSearchData={findSearchData} />
                                                        ) : (
                                                            <div className="dropdown show" style={{ width: "300px", height: "135px", left: "90px", bottom: "7px" }}>
                                                                <Form.Select
                                                                    aria-label="SelectBox"
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value);
                                                                        handlePlaylistChange(e.target.value);
                                                                        setIsClicked(false);
                                                                    }}
                                                                >
                                                                    <option>------- Playlist 선택하기 -------</option>
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
                                                        )}

                                                        <div className="d-flex justify-content-end menu-container3" style={{ right: "0px" }}>
                                                            {!searchMode ? (
                                                                <>
                                                                    <button
                                                                        className="menu-trigger"
                                                                        style={{ width: "35px", height: "35px" }}
                                                                        onClick={() => {
                                                                            setSearchMode(true);
                                                                        }}
                                                                        data-for="searchHover"
                                                                        data-tip
                                                                    >
                                                                        <IoIosSearch size={30} color={"#696969"} />
                                                                    </button>
                                                                    <ReactTooltip id="searchHover" getContent={(dataTip) => "검색"} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className="menu-trigger"
                                                                        style={{ width: "35px", height: "35px" }}
                                                                        onClick={() => {
                                                                            setSearchMode(false);
                                                                            setSearched(false);
                                                                        }}
                                                                        data-for="cancelHover"
                                                                        data-tip
                                                                    >
                                                                        <GiCancel size={30} color={"#696969"} />
                                                                    </button>
                                                                    <ReactTooltip id="cancelHover" getContent={(dataTip) => "취소"} />
                                                                </>
                                                            )}
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
                                                            setIsEditMode={setIsEditMode}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <hr class="solid mt-0 mb-0"></hr>
                                        <PlaylistWidget
                                            isSelected={isSelected}
                                            selectedPlaylist={selectedPlaylist}
                                            selectedVideo={selectedVideo}
                                            playlistId={playlistId}
                                            userId={userId}
                                            savedPlaylistName={savedPlaylistName}
                                            playlistSize={playlistSize}
                                            playlistDuration={playlistDuration}
                                            isEditMode={isEditMode}
                                            setIsEditMode={setIsEditMode}
                                            isClicked={isClicked}
                                            clickedVideo={clickedVideo}
                                            setClickedVideo={setClickedVideo}
                                            updatePlaylist={updatePlaylist}
                                            deletePlaylist={deletePlaylist}
                                            setUpdatePlaylist={setUpdatePlaylist}
                                            updatePlaylistTitle={updatePlaylistTitle}
                                            setUpdatePlaylistTitle={setUpdatePlaylistTitle}
                                            handlePlaylistChange={handlePlaylistChange}
                                            searched={searched}
                                            searchData={searchData}
                                        />
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
