import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import PlaylistWidget from "../../components/Widget/PlaylistWidget";
import SetPlaylistDropdown from "../../components/Dropdown/SetPlaylistDropdown";
import PlaylistSearchWidget from "../../components/Widget/PlaylistSearchWidget";
import axios from "axios";
// Image
import { IoIosSearch } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import favIcon from "../../assets/img/fav-orange.png";
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";
import { BiX } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
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
      name: "플레이리스트 제목",
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
  const [savedPlaylistName, setSavedPlaylistName] = useState(""); //before
  const [updatePlaylist, setUpdatePlaylist] = useState(false); //after
  const [updatePlaylistTitle, setUpdatePlaylistTitle] = useState(
    initPlaylistData.name
  );
  const [searched, setSearched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [lastSeq, setLastSeq] = useState(0);
  let lastSeq = 0;
  const [videoNum, setVideoNum] = useState(0);
  const [classroomTempData, setClassroomTempData] = useState([{}]);
  const [managedClassroom, setManagedClassroom] = useState();
  //   console.log(selectedPlaylist);
  //   console.log(savedPlaylistName);
  //   console.log(updatePlaylistTitle);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (userId) {
      const fetchManagesClassRoom = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${userId}`
          );
          //   console.log("playlist idx - classroomList", response.data);
          setManagedClassroom(response.data);
        } catch (err) {
          console.log("err >> ", err);
        }
      };
      fetchManagesClassRoom();
    }
  }, []);

  useEffect(() => {
    // console.log("playlist idx", videoNum);
  }, [videoNum]);
  //   useEffect(() => {}, [managedClassroom]);
  useEffect(() => {
    const fetchMyPlaylists = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/playlist?userId=${userId}`
        );
        // console.log(response.data);
        setPlaylistData(response.data);
      } catch (err) {
        console.log("err >> ", err);
      }
    };
    fetchMyPlaylists();
  }, []);
  useEffect(() => {
    // setUpdatePlaylistTitle(playlistData.name);
  }, [playlistData]);

  const handlePlaylistChange = (id) => {
    console.log(typeof id);
    id *= 1;
    let num = 0;
    for (let count = 0; count < playlistData.length; count++) {
      console.log(typeof playlistData[count].playlistId);

      if (id === playlistData[count].playlistId) {
        console.log("aaa");
        setSavedPlaylistName(playlistData[count].name);
        console.log(playlistData[count].name);
        break;
      }
      num++;
    }
    console.log(num);
    console.log("playlist data", playlistData[num].name);
    // console.log(selectedVideo);
    setSelectedVideo(playlistData[num].videos);
    // selectedVideo[Object.keys(selectedVideo).length - 1] ? setLastSeq(selectedVideo[Object.keys(selectedVideo).length - 1].seq) : setLastSeq(0);
    // console.log("lastSeq " + lastSeq);
    if (selectedVideo)
      selectedVideo.length ? (lastSeq = selectedVideo.length) : (lastSeq = 0);
    window.sessionStorage.setItem("lastSeq", lastSeq);
    setClickedVideo(playlistData[num].videos[0]);
    setPlaylistId(playlistData[num].playlistId);
    setSelectedPlaylist(playlistData[num].name);
    setPlaylistSize(playlistData[num].videos.length);
    setIsSelected(true);
    setSearchMode(false);
    setPlaylistDuration(playlistData[num].totalDuration);
    console.log(selectedVideo);
    setIsClicked(false);
    if (playlistData[num].videos.length == 0) {
      setIsEmpty(true);
      console.log("is empty? === " + isEmpty);
    } else {
      setIsEmpty(false);
      console.log("is empty? === " + isEmpty);
    }
  };

  const deletePlaylist = () => {
    console.log(playlistId);

    if (
      window.confirm(
        savedPlaylistName + " 플레이리스트를 정말 삭제하시겠습니까?"
      ) === true
    ) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/playlist/delete`,
          JSON.stringify(playlistId),
          {
            headers: {
              "Content-Type": `application/json`,
            },
          }
        )
        .then((res) => console.log(res));
      alert("플레이리스트가 삭제되었습니다.");
      window.location.reload();
    } else {
      return false;
    }
  };

  const updatePlaylistData = {
    playlistId: playlistId,
    playlistName: updatePlaylistTitle ? updatePlaylistTitle : savedPlaylistName,
    description: "",
  };

  const newTitleChange = (e) => {
    console.log(updatePlaylistTitle);
    console.log(savedPlaylistName);
    setSavedPlaylistName(e.target.value);
    setUpdatePlaylistTitle(e.target.value);
  };
  useEffect(() => {}, [setUpdatePlaylistTitle, setSavedPlaylistName]);

  const findSearchData = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/playlist/search?userId=${userId}&playlistName=${e}`
      );
      // console.log(response.data);
      setSearchData(response.data);
      if (searchData.length == 0) setIsEmpty(true);
      else setIsEmpty(false);
      console.log(isEmpty);
      setSearched(true);
    } catch (err) {
      console.log("err >> ", err);
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
          <div class="container text-center dashboard-tabs">
            <div className="intro-info-tabs border-none row">
              <div className="col-lg-12 col-md-12">
                <div className="widget-area">
                  <div className="mt-0 mb-0 ">
                    <div
                      className="row justify-content-between align-items-center"
                      style={
                        !isEditMode
                          ? { height: "110px" }
                          : { paddingTop: "45px" }
                      }
                    >
                      <div className="col d-flex">
                        <h3 className="fs-4 text-start">
                          {isSelected
                            ? "LearnTube Studio > "
                            : "LearnTube Studio"}
                          {typeof selectedPlaylist === "string" ||
                          "undefined" ? (
                            <>
                              {isEditMode ? (
                                <>
                                  <input
                                    type="text"
                                    id="updatedTitle"
                                    name="updatedTitle"
                                    placeholder={savedPlaylistName}
                                    className="border-0"
                                    value={updatePlaylistTitle}
                                    onChange={newTitleChange}
                                  />
                                  {/* <HiCheck
                                    onClick={() => {
                                      setUpdatePlaylist(!updatePlaylist);
                                      handleSubmit();
                                    }}
                                    style={{ cursor: "pointer" }}
                                  />
                                  <BiX
                                    onClick={() => {
                                      setUpdatePlaylist(!updatePlaylist);
                                      setUpdatePlaylistTitle("");
                                    }}
                                    style={{ cursor: "pointer" }}
                                  /> */}
                                </>
                              ) : (
                                <>
                                  {updatePlaylistTitle
                                    ? updatePlaylistTitle
                                    : savedPlaylistName}
                                  {/* {selectedPlaylist}
                                  <div class="d-flex text-start fs-6 fw-bold p-3 pb-0">
                                    총 비디오 개수&ensp;{":"}&ensp;
                                    {playlistSize}
                                  </div> */}
                                </>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </h3>
                      </div>

                      {isEditMode ? (
                        <div>
                          {/* 원래 여기에 취소, 저장 버튼 (수정눌렀을때 있었음 */}
                        </div>
                      ) : (
                        <>
                          {playlistData ? (
                            <>
                              <div className="col d-flex justify-content-end align-items-center">
                                {/* {searchMode ? ( */}
                                {isSelected ? (
                                  <>
                                    {/* {/* ) : ( */}
                                    <div
                                      className="dropdown show"
                                      style={{
                                        width: "300px",
                                        // height: "135px",
                                        // left: "90px",
                                        // bottom: "7px",
                                      }}
                                    >
                                      <Form.Select
                                        aria-label="SelectBox"
                                        onChange={(e) => {
                                          handlePlaylistChange(e.target.value);
                                          setIsClicked(false);
                                        }}
                                      >
                                        {playlistId ? (
                                          <option>
                                            ------- Playlist 이동하기 -------
                                          </option>
                                        ) : (
                                          // playlistData.title
                                          <option>
                                            ------- Playlist 이동하기 -------
                                          </option>
                                        )}

                                        {playlistData ? (
                                          playlistData.map((data, i) => (
                                            //console.log(playlistData[i].videos.length),({playlistData[i].videos.length})

                                            <option
                                              key={playlistData[i].playlistId}
                                              id={playlistData[i].playlistId}
                                              value={playlistData[i].playlistId}
                                              name={playlistData[i].title}
                                            >
                                              {playlistData[i].name}
                                            </option>
                                          ))
                                        ) : (
                                          <option key="playlistsData">
                                            Playlist가 존재하지 않습니다.
                                          </option>
                                        )}
                                      </Form.Select>
                                    </div>

                                    {/* )}  */}

                                    {/* <div
                                  className="d-flex justify-content-end menu-container3"
                                  style={{ right: "0px" }}
                                >
                                  {!searchMode ? (
                                    <> */}
                                    {/* {!isSelected ? (
                                        <>
                                          <button
                                            className="menu-trigger"
                                            style={{
                                              width: "35px",
                                              height: "35px",
                                            }}
                                            onClick={() => {
                                              setSearchMode(true);
                                            }}
                                            data-for="searchHover"
                                            data-tip
                                          >
                                            <IoIosSearch
                                              size={30}
                                              color={"#696969"}
                                            />
                                          </button>
                                          <ReactTooltip
                                            id="searchHover"
                                            getContent={(dataTip) => "검색"}
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )} */}
                                    {/* </>
                                  ) : ( */}
                                  </>
                                ) : (
                                  <PlaylistSearchWidget
                                    findSearchData={findSearchData}
                                  />
                                )}
                                <>
                                  {/* 추가 버튼 */}
                                  {/* <div className="scrollup pe-3">
                                    <div
                                    // onClick={() => setModalIsOpen(true)}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </div>
                                  </div> */}
                                  {/* <button
                                    className="menu-trigger"
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                    }}
                                    onClick={() => {
                                      setSearchMode(false);
                                      setSearched(false);
                                    }}
                                    data-for="cancelHover"
                                    data-tip
                                  >
                                    <GiCancel size={30} color={"#696969"} />
                                  </button> */}
                                  {/* <ReactTooltip
                                    id="cancelHover"
                                    getContent={(dataTip) => "취소"}
                                  /> */}
                                </>
                                {/* )} */}
                                {/* </div> */}
                                <SetPlaylistDropdown
                                  playlistId={playlistId}
                                  setPlaylistId={setPlaylistId}
                                  userId={userId}
                                  initCreatePlaylist={initCreatePlaylist}
                                  setIsEmpty={setIsEmpty}
                                  isSelected={isSelected}
                                  setIsEditMode={setIsEditMode}
                                  isEmpty={isEmpty}
                                  selectedPlaylist={selectedPlaylist}
                                  selectedVideo={selectedVideo}
                                  isActive={isActive}
                                  setIsActive={setIsActive}
                                />{" "}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                    {/* <hr class="solid mt-0 mb-0"></hr> */}
                    {/* <Link to="/learntube/learntube-studio/playlist"> */}
                    <PlaylistWidget
                      userId={userId}
                      playlistData={playlistData}
                      setPlaylistData={setPlaylistData}
                      isSelected={isSelected}
                      selectedPlaylist={selectedPlaylist}
                      selectedVideo={selectedVideo}
                      setSelectedVideo={setSelectedVideo}
                      playlistId={playlistId}
                      savedPlaylistName={savedPlaylistName}
                      playlistSize={playlistSize}
                      playlistDuration={playlistDuration}
                      isEditMode={isEditMode}
                      setIsEditMode={setIsEditMode}
                      isClicked={isClicked}
                      clickedVideo={clickedVideo}
                      setClickedVideo={setClickedVideo}
                      updatePlaylist={updatePlaylist}
                      setUpdatePlaylist={setUpdatePlaylist}
                      deletePlaylist={deletePlaylist}
                      updatePlaylistTitle={updatePlaylistTitle}
                      setUpdatePlaylistTitle={setUpdatePlaylistTitle}
                      handlePlaylistChange={handlePlaylistChange}
                      searched={searched}
                      setSearchMode={setSearchMode}
                      searchData={searchData}
                      videoNum={videoNum}
                      setVideoNum={setVideoNum}
                      //   classroomList={classroomList}
                      //   setClassroomList={setClassroomList}
                      //   classroomData={classroomData}
                      //   setClassroomData={setClassroomData}
                      lastSeq={lastSeq}
                      // setLastSeq={setLastSeq}
                      checkPlaylistName={checkPlaylistName}
                      updatePlaylistData={updatePlaylistData}
                      newTitleChange={newTitleChange}
                      setSavedPlaylistName={setSavedPlaylistName}
                      isActive={isActive}
                      setIsActive={setIsActive}
                      setIsEmpty={setIsEmpty}
                      managedClassroom={managedClassroom}
                    />
                    {/* </Link> */}
                    {/* {isEditMode ? (
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={() => {
                            setIsEditMode(false);
                            // setUpdatePlaylist(false);
                            setUpdatePlaylist(!updatePlaylist);
                            handleSubmit();
                          }}
                          style={{
                            marginLeft: "10px",
                            // height: "40px",
                            backgroundColor: "#7cbdb5",
                          }}
                        >
                          저장
                        </Button>
                      </div>
                    ) : null} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        footerClass="rs-footer home9-style main-home"
        footerLogo={footerLogo}
      />

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
