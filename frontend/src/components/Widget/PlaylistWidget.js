import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BsFillGridFill, BsList } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import ReactPlayer from "react-player";
import mediaIcon from "../../assets/img/icon/mediaIcon.png";
import logo from "../../assets/img/logo/img-background.png";
import { TbCurrencyKroneSwedish } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
const PlaylistWidget = ({
  userId,
  playlistData,
  setPlaylistData,
  isSelected,
  selectedPlaylist,
  selectedVideo,
  setSelectedVideo,
  playlistId,
  savedPlaylistName,
  playlistSize,
  playlistDuration,
  isEditMode,
  setIsEditMode,
  isClicked,
  clickedVideo,
  setClickedVideo,
  searchData,
  searched,
  setSearchMode,
  deletePlaylist,
  updatePlaylistTitle,
  setUpdatePlaylistTitle,
  handlePlaylistChange,
  videoNum,
  setVideoNum,
  //   classroomList,
  //   setClassroomList,
  //   classroomData,
  //   setClassroomData,
  updatePlaylist,
  setUpdatePlaylist,
  lastSeq,
  // setLastSeq,
  checkPlaylistName,
  updatePlaylistData,
  handleTitleSubmit,
  newTitleChange,
  setSavedPlaylistName,
  isActive,
  setIsActive,
  setIsEmpty,
  managedClassroom,
  usedPlaylist,
  //   linkClass,
  //   linkLecture,
  //   lectureNum,
  //   contentNum,
}) => {
  const [isVideoClicked, setIsVideoClicked] = useState(isClicked);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [cardView, setCardView] = useState(false);
  const [videoIdx, setvideoIdx] = useState();
  //   console.log(selectedVideo[videoNum]);
  //   console.log(managedClassroom);
  //   let classroomData = [];
  //   useEffect(() => {
  //     // console.log(managedClassroom);
  //     if (managedClassroom) {
  //       managedClassroom.map((classroom, i) => {
  //         // console.log("aa");
  //         const fetchClassRoom = async () => {
  //           try {
  //             const res1 = await axios.get(
  //               `${process.env.REACT_APP_SERVER_URL}/api/classroom?userId=${userId}&classId=${classroom.classId}`
  //             );
  //             // console.log(res1.data);
  //             classroomData = [...classroomData, res1.data];
  //             window.sessionStorage.setItem(
  //               "classroom" + i,
  //               JSON.stringify(res1.data)
  //             );
  //             let data = window.sessionStorage.getItem("classroom");
  //             console.log(data);
  //           } catch (err) {
  //             console.log("err >> ", err);
  //           }
  //         };
  //         fetchClassRoom();
  //       });
  //     }
  //   }, [classroomData]);

  //   let classData;
  //   let usedPlaylist = [];
  //   useEffect(() => {
  //     if (managedClassroom) {
  //       managedClassroom.map((classroom, i) => {
  //         classData = JSON.parse(window.sessionStorage.getItem("classroom" + i));
  //         // console.log(classData.lectures);
  //         if (playlistData && classData && classData.lectures)
  //           classData.lectures.map((lec, j) => {
  //             if (lec.contents)
  //               lec.contents.map((con, j) => {
  //                 playlistData.map((pl, k) => {
  //                   if (con.playlistId === pl.playlistId) {
  //                     usedPlaylist = [...usedPlaylist, con.playlistId];
  //                     console.log(usedPlaylist);
  //                   } //   console.log(pl.playlistId);
  //                 });
  //                 // console.log(con.playlistId);
  //               });
  //           });
  //       });
  //     }
  //   }, [classroomData]);
  const [usedPl, setUsedPl] = useState({
    playlistId: "",
    used: 0,
    classId: -1,
    className: "",
    contentName: "",
  });
  let linkClass_ = JSON.parse(window.sessionStorage.getItem("linkClass"));
  let linkClass;
  let lectureNum = [];
  //   let contentNum;
  let lecNumArr = [];
  function add(i, key, value) {
    linkClass_[i][key] = value;
    return { ...linkClass_[i], [key]: value };
  }
  if (linkClass_) {
    console.log(linkClass_);
    linkClass_.map((link, i) => {
      link.lectures.map((lec, j) => {
        // console.log(lec);
        lec.contents.map((con, k) => {
          add(i, "p_id", con.playlistId);
        });

        lecNumArr = [...lecNumArr, lec.lectureNum];
        console.log(lec.contentNum);
        add(i, "lecture_num", lec.lectureNum);
        lectureNum = [...lectureNum, lec.lectureNum];
        // lectureNum = 0;
      });
      window.sessionStorage.setItem("lectureNum", lectureNum);

      console.log(link.className);
      console.log(link.lectures.lectureNum);
      //   add(i, "lecture_num", lecNumArr);
      lecNumArr = [];
    });
    linkClass = [...linkClass_].sort((a, b) => (a.p_id > b.p_id ? -1 : 1));
    // linkClass = [...linkClass_];
    console.log("linkClass");
    console.log(linkClass);
    // lectureNum = JSON.parse(window.sessionStorage.getItem("lectureNum"));
    console.log(lectureNum);
    // contentNum = JSON.parse(window.sessionStorage.getItem("contentNum"));
    // console.log(contentNum);
  }

  useEffect(() => {
    // if (playlistData)
    //   playlistData.map((playlist, i) => {
    //     add(i, "used", 0);
    //   });
    console.log(playlistData);
  }, [playlistData]);
  //   useEffect(() => {
  //     // setUpdatePlaylistTitle(savedPlaylistName);
  //     // console.log("savedPlaylistName", savedPlaylistName);
  //     // console.log("updatePlaylistTitle", updatePlaylistTitle);
  //     console.log(usedPlaylist);
  //     console.log(playlistData);
  //     if (playlistData)
  //       playlistData.map((playlist, i) => {
  //         usedPlaylist.map((used, j) => {
  //           if (used === playlist.playlistId) {
  //             playlistData[i].used = 1;
  //             // setPlaylistData({ ...playlistData[i] });
  //             // add(i, "used", 1);
  //             // console.log(add(i, "used", 1));
  //             // setPlaylistData([...playlistData, { nale: 2 }]);
  //             console.log(playlistData[i]);
  //           }
  //         });
  //       });
  //   }, [
  //     playlistData,
  //     setPlaylistData,
  //     setUpdatePlaylistTitle,
  //     setSavedPlaylistName,
  //     setVideoNum,
  //     videoNum,
  //     setSelectedVideo,
  //     selectedVideo,
  //     usedPlaylist,
  //   ]);
  useEffect(() => {}, [usedPlaylist, playlistData, setPlaylistData]);

  //   console.log(clickedVideo);

  const popUp = (video) => {
    setIsVideoClicked(true);
    setClickedVideo(video);
    setStartTime(video.start_s);
    setEndTime(video.end_s);
  };

  const selectVideo = (video, i) => {
    setClickedVideo(video);
    setStartTime(video.start_s);
    setEndTime(video.end_s);
    setVideoNum(i);
    console.log(i);
    console.log(videoNum);
  };

  const handleSubmit = async () => {
    for (let j = 0; j < selectedVideo.length; j++) {
      console.log(selectedVideo[j]);
      selectedVideo[j].seq = j;
      console.log(selectedVideo[j].seq);
      // selectedVideo[videoNum];
      let updateRequest = {
        videoId: selectedVideo[j].id,
        youtubeId: selectedVideo[j].youtubeId,
        title: selectedVideo[j].title,
        newTitle: selectedVideo[j].newTitle,
        start_s: selectedVideo[j].start_s,
        end_s: selectedVideo[j].end_s,
        duration: selectedVideo[j].duration,
        seq: j,
        tag: selectedVideo[j].tag,
      };
      console.log("seq", j);
      console.log(updateRequest.end_s);

      const response2 = await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`,
          updateRequest,
          {
            method: "POST",
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    }

    const response = await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/playlist/update`,
        JSON.stringify(updatePlaylistData),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));
    if (
      selectedPlaylist ||
      savedPlaylistName ||
      updatePlaylistTitle === undefined ||
      ""
    ) {
      //   console.log(selectedPlaylist);
      //   console.log(savedPlaylistName);
      //   console.log(updatePlaylistTitle);

      setUpdatePlaylist(selectedPlaylist);
      setSavedPlaylistName(selectedPlaylist);
    } else {
      setUpdatePlaylistTitle(updatePlaylistTitle);
      setSavedPlaylistName(updatePlaylistTitle);
    }
    alert(savedPlaylistName + "로 playlist 제목이 업데이트 되었습니다.");
    alert("플레이리스트가 수정되었습니다.");
    // window.location.reload();
  };

  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  // console.log(playlistData);
  const [grab, setGrab] = React.useState(null);

  const _onDragOver = (e) => {
    if (isEditMode) {
      e.preventDefault();
    }
  };

  const _onDragStart = (e) => {
    if (isEditMode) {
      setGrab(e.target);
      e.target.classList.add("grabbing");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target);
    }
  };

  const _onDragEnd = async (e) => {
    if (isEditMode) {
      e.target.classList.remove("grabbing");
      e.dataTransfer.dropEffect = "move";
      console.log(e.currentTarget.dataset.position);
      setVideoNum(e.currentTarget.dataset.position);
    }
  };

  const _onDrop = (e) => {
    if (isEditMode) {
      let grabPosition = Number(grab.dataset.position);
      let targetPosition = Number(e.target.dataset.position);
      let _selectedVideo = [...selectedVideo];
      _selectedVideo[grabPosition] = _selectedVideo.splice(
        targetPosition,
        1,
        _selectedVideo[grabPosition]
      )[0];
      setSelectedVideo(_selectedVideo);
    }
  };
  function decodeHTML(words) {
    var decode = require("decode-html");
    console.log(decode(words));
    return decode(words);
  }

  const handleCancle = () => {
    let num = 0;
    for (let count = 0; count < playlistData.length; count++) {
      if (playlistData[count].playlistId === playlistId) {
        break;
      }
      num++;
    }
    setClickedVideo(playlistData[num].videos[0]);
    setUpdatePlaylistTitle("");
    setSavedPlaylistName(selectedPlaylist);
  };
  return (
    <div
    // className="row justify-content-center"
    >
      {!isSelected ? (
        <div className="pt-1 pb-3 justify-content-end btn-toolbar">
          {/* <div>툴바</div> */}
          <div className="btn-group" style={{ display: "block" }}>
            <button
              type="button"
              className="p-0 btn btn-default"
              style={
                !cardView
                  ? {
                      width: "30px",
                      height: "30px",
                      background: "#7cbdb5",
                    }
                  : {
                      width: "30px",
                      height: "30px",
                      background: "#E7E9EB",
                    }
              }
              onClick={() => {
                setCardView(false);
              }}
              data-for="listHover"
              data-tip
            >
              <BsList size={20} color="white" />
            </button>
            <ReactTooltip id="listHover" getContent={(dataTip) => "리스트형"} />
            <button
              type="button"
              className="p-0 btn btn-default"
              style={
                cardView
                  ? {
                      width: "30px",
                      height: "30px",
                      background: "#7cbdb5",
                    }
                  : {
                      width: "30px",
                      height: "30px",
                      background: "#E7E9EB",
                    }
              }
              onClick={() => {
                setCardView(true);
              }}
              data-for="galleryHover"
              data-tip
            >
              <BsFillGridFill size={20} color="white" />
            </button>
            <ReactTooltip
              id="galleryHover"
              getContent={(dataTip) => "갤러리형"}
            />
          </div>
        </div>
      ) : (
        <>
          {isEditMode ? (
            <div
              className="col d-flex justify-content-end align-items-center pb-3"
              // style={{ height: "135px" }}
              onClick={() => {
                setUpdatePlaylist(true);
              }}
            >
              <Button
                onClick={() => {
                  setIsEditMode(false);
                  setUpdatePlaylist(false);
                  setVideoNum(0);
                  handleCancle();
                  selectVideo(selectedVideo[0], 0);
                  selectedVideo.map();
                }}
                style={{
                  marginLeft: "10px",
                  // height: "40px",
                  backgroundColor: "#7cbdb5",
                }}
              >
                취소
              </Button>
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
                  backgroundColor: "#ff7d4b",
                }}
              >
                저장
              </Button>
            </div>
          ) : null}
        </>
      )}

      <hr class="solid mt-0 mb-3"></hr>
      <div className="row">
        {isSelected ? (
          <>
            {clickedVideo ? (
              <>
                <div
                  className="d-flex justify-content-between align-items-center row pt-30"
                  style={{ right: "0px" }}
                ></div>

                <div
                  className="col-md-8 col-sm-12"
                  // style={{ left: "0" }}
                >
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${clickedVideo.youtubeId}?start=${clickedVideo.start_s}&end=${clickedVideo.end_s}`}
                    width="100%"
                    height="500px"
                    controls={true} // 플레이어 컨트롤 노출 여부
                    pip={true} // pip 모드 설정 여부
                  />
                  <div className="row">
                    <div class="row text-start pt-30">
                      <div className="pt-5 fs-4">
                        {clickedVideo.newTitle
                          ? decodeHTML(clickedVideo.newTitle)
                          : decodeHTML(clickedVideo.title)}
                      </div>
                    </div>
                    <div className="d-flex fw-light ms-0">
                      재생 시간:{" "}
                      {clickedVideo.duration
                        ? toHHMMSS(clickedVideo.duration)
                        : "duration 없음"}
                      &ensp;| 재생 구간:{" "}
                      {clickedVideo.start_s
                        ? toHHMMSS(clickedVideo.start_s)
                        : "00:00"}{" "}
                      ~
                      {clickedVideo.end_s
                        ? toHHMMSS(clickedVideo.end_s)
                        : toHHMMSS(clickedVideo.duration)}{" "}
                    </div>

                    {/* <div class="mt-5 mx-md-3 fs-5 text-start text-muted">{clickedVideo.tag}</div> */}
                  </div>
                </div>

                {/* 플리 */}
                <>
                  {/* playlist 연속재생 토글버튼 */}
                  <div className="col-md-4 col-sm-12 ">
                    <div
                      className="text-start align-items-center p-3 pt-0 pb-2"
                      style={{
                        background: "#fff",
                        border: "1px solid lightgray",
                        // borderRight: "1px solid lightgray",
                        // borderBottom: "1px solid lightgray",
                      }}
                    >
                      <div class="d-flex justify-content-between text-start fs-6 fw-bold pt-3 pb-0">
                        {" "}
                        {updatePlaylistTitle
                          ? updatePlaylistTitle
                          : savedPlaylistName}
                        {/* 비디오 추가 */}
                        <Link
                          className="d-flex justify-content-end"
                          to={{
                            pathname:
                              "/learntube/learntube-studio/youtubeSearch",
                            state: {
                              playlistName: selectedPlaylist,
                              playlistId: playlistId,
                              update: true,
                              existingVideo: selectedVideo,
                            },
                          }}
                          style={{ padding: "0", margin: "0" }}
                        >
                          <span
                            onClick={(e) => {
                              checkPlaylistName(e, selectedPlaylist);
                            }}
                            className="rounded-circle text-center p-2"
                            style={{
                              //   background: "#ff7d4b",
                              background: "#273857 ",
                              color: "white",
                              // padding: "15px",
                              width: "2.5rem",
                              height: "2.5rem",
                              cursor: "pointer",
                            }}
                            data-for="addVideo"
                            data-tip
                          >
                            <i
                              className="fa fa-plus"
                              data-for="addVideo"
                              data-tip
                            ></i>
                            <ReactTooltip
                              id="addVideo"
                              getContent={(dataTip) => "비디오 추가"}
                              // style={{ width: "20px" }}
                            />
                          </span>
                        </Link>
                      </div>
                      <span class="text-start" style={{ fontSize: "0.8rem" }}>
                        <span style={{ width: "20px" }}>
                          {!isEditMode ? (
                            <>
                              {videoNum + 1} / {playlistSize}
                              &ensp; &#183;
                            </>
                          ) : null}
                        </span>
                        <span>
                          &ensp;전체 재생 시간 -{" "}
                          {playlistDuration ? toHHMMSS(playlistDuration) : ""}
                        </span>
                      </span>
                    </div>
                    <div className="my_playlist">
                      {selectedVideo
                        // .sort((a, b) => (a.seq > b.seq ? 1 : -1))
                        .map((data, i) => (
                          <>
                            <div
                              key={i}
                              data-position={i}
                              onDragOver={isEditMode ? _onDragOver : null}
                              onDragStart={isEditMode ? _onDragStart : null}
                              onDragEnd={isEditMode ? _onDragEnd : null}
                              onDrop={isEditMode ? _onDrop : null}
                              draggable={isEditMode ? "true" : "false"}
                              // draggable
                              className="d-flex pt-1 pb-1 "
                              onClick={() => selectVideo(data, i)}
                              style={
                                data === clickedVideo && !isEditMode
                                  ? {
                                      background: "#A5ABBD",
                                      // background: "#e4e8f5",
                                      // borderTop: "1px solid lightgray",
                                      borderLeft: "1px solid lightgray",
                                      borderRight: "1px solid lightgray",
                                      borderBottom: "1px solid lightgray",
                                      // padding: "25px 20px",
                                      width: "100%",
                                    }
                                  : {
                                      background: "#fff",
                                      // borderTop: "1px solid lightgray",
                                      borderLeft: "1px solid lightgray",
                                      borderBottom: "1px solid lightgray",
                                      borderRight: "1px solid lightgray",
                                      // padding: "25px 20px",
                                      width: "100%",
                                    }
                              }
                            >
                              <div
                                className="d-flex justify-content-center align-items-center ps-3 pe-3"
                                style={{ fontSize: "0.8rem", width: "10px" }}
                              >
                                {/* {i + 1} */}
                                {i === videoNum && !isEditMode ? (
                                  <span style={{ width: "10px" }}>▶</span>
                                ) : (
                                  <span style={{ width: "10px" }}>{i + 1}</span>
                                )}
                              </div>
                              <span
                                className="d-flex position-relative justify-content-start align-items-center"
                                style={{ maxWidth: "30%" }}
                              >
                                <img
                                  src={"https://i.ytimg.com/vi/".concat(
                                    selectedVideo[i].youtubeId,
                                    "/hqdefault.jpg"
                                  )}
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "80%",
                                    // borderRadius: "5px",
                                  }}
                                />
                                {/* <span
                                                                    className="position-absolute justify-content-end bg-black text-white m-1 me-1 ps-1 pe-1"
                                                                    style={{
                                                                        right: "0px",
                                                                        bottom: "0px",
                                                                        // display: "flex",
                                                                        display: "inline-table",
                                                                        fontSize: "0.5rem",
                                                                    }}
                                                                >
                                                                    {selectedVideo[i].duration ? toHHMMSS(selectedVideo[i].duration) : ""}
                                                                </span> */}
                              </span>
                              <div
                                className="d-flex row pt-0 ps-3 align-items-center "
                                style={{ width: "100%" }}
                              >
                                <div
                                  className="playlist-title d-flex row pt-1 pb-0 ps-3 fw-light text-start"
                                  style={{ height: "50px" }}
                                >
                                  {selectedVideo[i].newTitle
                                    ? decodeHTML(selectedVideo[i].newTitle)
                                    : decodeHTML(selectedVideo[i].title)}
                                </div>
                                <div
                                  className="d-flex row pt-0 ps-3"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  시작:{" "}
                                  {selectedVideo[i].start_s
                                    ? toHHMMSS(selectedVideo[i].start_s)
                                    : "00:00"}{" "}
                                  ~ 종료:{" "}
                                  {selectedVideo[i].end_s
                                    ? toHHMMSS(selectedVideo[i].end_s)
                                    : toHHMMSS(selectedVideo[i].duration)}{" "}
                                </div>
                              </div>
                              {isEditMode ? (
                                <div className="d-flex align-items-center pe-3">
                                  <BsList />
                                </div>
                              ) : null}
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </>
              </>
            ) : (
              <div>
                <div className="row d-flex mt-70 mb-70 align-items-center">
                  <img
                    src={mediaIcon}
                    style={{ margin: "auto", width: "200px" }}
                  ></img>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            {!searched ? (
              <>
                {playlistData ? (
                  <>
                    {cardView ? (
                      <div className="row">
                        {playlistData.map(function (video, i) {
                          return (
                            <div
                              className="p-3 col-lg-3 col-sm-6 "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handlePlaylistChange(
                                  playlistData[i].playlistId
                                );
                                setSearchMode(false);
                              }}
                            >
                              {/* <span className="d-flex position-relative justify-content-start" style={{ maxWidth: "30%" }}> */}
                              {/* <div className="d-flex m-0 row-3 justify-content-center"> */}
                              <div
                                className="d-flex position-relative justify-content-center"
                                // style={{ maxWidth: "80%", maxHeight: "80%" }}
                                // className="img-part content-part d-flex justify-content-center"
                                // style={{
                                // position: "relative",
                                // width: "250px",
                                // height: "120px",
                                // }}
                              >
                                {video.videos[0] ? (
                                  <>
                                    <img
                                      // className="img-fluid"
                                      style={{
                                        objectFit: "cover",
                                        width: "260px",
                                        height: "156px",
                                        borderRadius: "5px",
                                      }}
                                      src={"https://i.ytimg.com/vi/".concat(
                                        video.videos[0].youtubeId,
                                        "/hqdefault.jpg"
                                      )}
                                    />
                                    {/* <span
                                                                            className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                            style={{
                                                                                right: "10px",
                                                                                bottom: "-10px",
                                                                                display: "inline-table",
                                                                                fontSize: "0.8rem",
                                                                            }}
                                                                        >
                                                                            {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                        </span> */}
                                  </>
                                ) : (
                                  <div
                                    className="course-features-info "
                                    style={{
                                      backgroundSize: "cover",
                                      backgroundImage: `url(${logo})`,
                                      borderRadius: "5px",
                                      objectFit: "cover",
                                      width: "260px",
                                      height: "156px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "inline-block",
                                        height: "180px",
                                        lineHeight: "160px",
                                        textAlign: "center",
                                        color: "#404040",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        fontFamily: "Nunito, sans-serif;",
                                      }}
                                    >
                                      {video.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {/* </span> */}
                              <div
                                className="pt-3 px-3"
                                style={{
                                  minHeight: "150px",
                                  maxHeight: "150px",
                                }}
                              >
                                {/* 22 */}
                                <div className="d-flex pl-12 h5 pt-1">
                                  {video.name ? video.name : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  생성일자:{" "}
                                  {playlistData[i].createdAt
                                    ? playlistData[i].createdAt.split("T")[0]
                                    : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  전체시간:{" "}
                                  {video.totalDuration
                                    ? toHHMMSS(video.totalDuration)
                                    : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  영상개수:{" "}
                                  {video.videos.length
                                    ? video.videos.length + "개"
                                    : " - "}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="row">
                        {playlistData
                          .sort((a, b) =>
                            a.playlistId < b.playlistId ? 1 : -1
                          )
                          .map(function (video, i) {
                            return (
                              <div
                                className="course-part clearfix m-0 p-3 col-lg-6 col-sm-15"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handlePlaylistChange(
                                    playlistData[i].playlistId
                                  );
                                  setSearchMode(false);
                                }}
                              >
                                <div className="d-flex m-0 row-3 justify-content-center">
                                  <div
                                    // className="img-part content-part"
                                    style={{
                                      objectFit: "cover",
                                      width: "260px",
                                      height: "156px",
                                    }}
                                  >
                                    {video.videos[0] ? (
                                      <>
                                        {playlistData[i].used === 1 ? (
                                          // 사용중
                                          <div
                                            data-for="usedPlaylist"
                                            data-tip
                                            className="d-flex justify-content-start"
                                          >
                                            <FaCheck
                                              size="20px"
                                              color="#ffffff"
                                              className="position-absolute  justify-content-end m-3 align-items-center"
                                              style={{
                                                backgroundColor: "#008a4a",
                                                // backgroundColor: "#21a7d0",
                                                borderRadius: "50%",
                                                padding: "0.1rem",
                                              }}
                                            >
                                              {" "}
                                            </FaCheck>
                                            <ReactTooltip
                                              id="usedPlaylist"
                                              getContent={(dataTip) =>
                                                "사용중인 플레이리스트"
                                              }
                                            />
                                          </div>
                                        ) : null}
                                        {/* {typeof playlistData[i].playlistId}
                                      {typeof usedPlaylist[0]} */}
                                        <img
                                          // className="img-fluid"
                                          style={{
                                            objectFit: "cover",
                                            width: "260px",
                                            height: "156px",
                                            borderRadius: "5px",
                                          }}
                                          src={"https://i.ytimg.com/vi/".concat(
                                            video.videos[0].youtubeId,
                                            "/hqdefault.jpg"
                                          )}
                                        />
                                        {/* <span
                                                                                className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                                style={{
                                                                                    right: "8px",
                                                                                    bottom: "0px",
                                                                                    // display: "flex",
                                                                                    display: "inline-table",
                                                                                    fontSize: "0.8rem",
                                                                                }}
                                                                            >
                                                                                {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                            </span> */}
                                      </>
                                    ) : (
                                      <div
                                        // className="img-part content-part d-flex justify-content-center"
                                        style={{
                                          backgroundSize: "cover",
                                          backgroundImage: `url(${logo})`,
                                          objectFit: "cover",
                                          width: "260px",
                                          height: "156px",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            display: "inline-block",
                                            height: "180px",
                                            lineHeight: "160px",
                                            textAlign: "center",
                                            color: "#404040",
                                            fontWeight: "bold",
                                            fontSize: "18px",
                                            fontFamily: "Nunito, sans-serif;",
                                          }}
                                        >
                                          {video.name}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className="pl-12 content-part pt-3 px-3 "
                                    style={{
                                      width: "50%",
                                      minHeight: "150px",
                                      maxHeight: "150px",
                                    }}
                                  >
                                    <div className="d-flex pl-12 h5">
                                      {video.name
                                        ? video.name
                                        : "플레이리스트 제목 없음"}
                                    </div>
                                    {/* {Array.isArray(linkData)
                                                                        ? linkData.map((linkData, i) => (
                                                                              <></>
                                                                              // {linkData[i].playlist_id===playlistData[i].playlistId ? <h>{linkData[i].contentName}</h>:null}
                                                                          ))
                                                                        : null} */}
                                    {/* 11 */}
                                    {/* {usedPlaylist ? ( */}
                                    {/* {usedPlaylist.map((pl, a) => ( */}
                                    <>
                                      {playlistData[i].used === 1 ? (
                                        <div className="d-flex pl-12">
                                          {/* 콘텐츠매핑 */}
                                          {/* <Link
                                          //   className="popup-videos play-icon"
                                          to={{
                                            pathname: "/learntube/content",
                                            state: {
                                              lectures:
                                                linkClass[playlistData[i].idx]
                                                  .lectures,
                                              classRoomData:
                                                linkClass[playlistData[i].idx],
                                              i: lectureNum[
                                                playlistData[i].idx
                                              ],
                                              j: contentNum[
                                                playlistData[i].idx
                                              ],
                                            },
                                          }}
                                        > */}
                                          {/* 커리큘럼매핑 */}
                                          <span data-for="linkToCurri" data-tip>
                                            <Link
                                              to={{
                                                pathname:
                                                  "/learntube/course/course-single",
                                                state: {
                                                  classId:
                                                    linkClass[
                                                      playlistData[i].idx
                                                    ].classId,
                                                },
                                              }}
                                            >
                                              <h>
                                                {/* {lectureNum.findIndex(
                                                (x) =>
                                                  x ===
                                                  playlistData[i].playlistId
                                              )} */}
                                                {/* {playlistData[i].idx} &ensp; */}
                                                {/* {playlistData[i].playlistId} */}
                                                {
                                                  linkClass[playlistData[i].idx]
                                                    .className
                                                }
                                                &ensp;
                                                {/* {
                                                  linkClass[playlistData[i].idx]
                                                    .lecture_num
                                                }
                                                강 */}
                                                {/* 강 >
                                            {
                                              linkClass[playlistData[i].idx]
                                                .lectures[
                                                lectureNum[playlistData[i].idx]
                                              ].contents[
                                                contentNum[playlistData[i].idx]
                                              ].contentName
                                            } */}
                                              </h>
                                            </Link>
                                            <ReactTooltip
                                              id="linkToCurri"
                                              getContent={(dataTip) =>
                                                "강의실로 이동"
                                              }
                                            />
                                          </span>
                                        </div>
                                      ) : null}
                                    </>

                                    <div className="d-flex pl-12">
                                      생성일자:{" "}
                                      {playlistData[i].createdAt
                                        ? playlistData[i].createdAt.split(
                                            "T"
                                          )[0]
                                        : " - "}
                                    </div>
                                    <div className="d-flex pl-12">
                                      전체시간:{" "}
                                      {video.totalDuration
                                        ? toHHMMSS(video.totalDuration)
                                        : " - "}
                                    </div>
                                    <div className="d-flex pl-12">
                                      영상개수:{" "}
                                      {video.videos.length
                                        ? video.videos.length + "개"
                                        : " - "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    {playlistData ? (
                      <div className="row d-flex mt-70 mb-70 align-items-center">
                        <img
                          src={mediaIcon}
                          style={{ margin: "auto", width: "200px" }}
                        ></img>
                        <div className="text-align-center fw-normal">
                          플레이리스트가 비었습니다.
                        </div>
                      </div>
                    ) : (
                      <div
                        class="text-center"
                        style={{ marginTop: "10%", height: "30rem" }}
                      >
                        <Spinner
                          animation="grow"
                          variant="secondary"
                          style={{ width: "10rem", height: "10rem" }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {searchData ? (
                  <>
                    {cardView ? (
                      <div className="row">
                        {searchData.map(function (video, i) {
                          return (
                            <div
                              className="p-2 col-lg-3 col-sm-6 "
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handlePlaylistChange(searchData[i].playlistId);
                                setSearchMode(false);
                              }}
                            >
                              <div className=" justify-content-center">
                                <div
                                  className="img-part content-part justify-content-center"
                                  style={{
                                    objectFit: "cover",
                                    width: "260px",
                                    height: "156px",
                                  }}
                                >
                                  {video.videos[0] ? (
                                    <>
                                      <img
                                        // className="img-fluid"
                                        style={{
                                          objectFit: "cover",
                                          width: "260px",
                                          height: "156px",
                                          borderRadius: "5px",
                                        }}
                                        src={"https://i.ytimg.com/vi/".concat(
                                          video.videos[0].youtubeId,
                                          "/hqdefault.jpg"
                                        )}
                                      />
                                      {/* <span
                                                                                className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                                style={{
                                                                                    right: "10px",
                                                                                    bottom: "-10px",
                                                                                    display: "inline-table",
                                                                                    fontSize: "0.8rem",
                                                                                }}
                                                                            >
                                                                                {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                            </span> */}
                                    </>
                                  ) : (
                                    <div
                                      className="course-features-info"
                                      style={{
                                        backgroundSize: "cover",
                                        backgroundImage: `url(${logo})`,
                                        borderRadius: "5px",
                                        objectFit: "cover",
                                        width: "260px",
                                        height: "156px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "inline-block",
                                          height: "180px",
                                          lineHeight: "160px",
                                          textAlign: "center",
                                          color: "#404040",
                                          fontWeight: "bold",
                                          fontSize: "18px",
                                          fontFamily: "Nunito, sans-serif;",
                                        }}
                                      >
                                        {video.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className="pt-3 px-3"
                                style={{
                                  minHeight: "150px",
                                  maxHeight: "150px",
                                }}
                              >
                                <div className="d-flex pl-12 h5">
                                  {video.name ? video.name : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  생성일자:{" "}
                                  {playlistData[i].createdAt
                                    ? playlistData[i].createdAt.split("T")[0]
                                    : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  전체시간:{" "}
                                  {video.totalDuration
                                    ? toHHMMSS(video.totalDuration)
                                    : " - "}
                                </div>
                                <div className="d-flex pl-12">
                                  영상개수:{" "}
                                  {video.videos.length
                                    ? video.videos.length + "개"
                                    : " - "}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="row">
                        {searchData.map(function (video, i) {
                          return (
                            <div
                              className="course-part clearfix m-0 p-2 col-lg-6 col-sm-15"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handlePlaylistChange(searchData[i].playlistId);
                                setSearchMode(false);
                              }}
                            >
                              <div className="d-flex m-0 row-3 justify-content-center">
                                <div
                                  className="img-part content-part"
                                  style={{
                                    objectFit: "cover",
                                    width: "260px",
                                    height: "156px",
                                  }}
                                >
                                  {video.videos[0] ? (
                                    <>
                                      <img
                                        // className="img-fluid"
                                        style={{
                                          objectFit: "cover",
                                          width: "260px",
                                          height: "156px",
                                          borderRadius: "5px",
                                        }}
                                        src={"https://i.ytimg.com/vi/".concat(
                                          video.videos[0].youtubeId,
                                          "/hqdefault.jpg"
                                        )}
                                      />
                                      {/* <span
                                                                                className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                                style={{
                                                                                    right: "8px",
                                                                                    bottom: "0px",
                                                                                    // display: "flex",
                                                                                    display: "inline-table",
                                                                                    fontSize: "0.8rem",
                                                                                }}
                                                                            >
                                                                                {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                            </span> */}
                                    </>
                                  ) : (
                                    <div
                                      className="img-part content-part"
                                      style={{
                                        backgroundSize: "cover",
                                        backgroundImage: `url(${logo})`,
                                        borderRadius: "5px",
                                        objectFit: "cover",
                                        width: "260px",
                                        height: "156px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "inline-block",
                                          height: "180px",
                                          lineHeight: "160px",
                                          textAlign: "center",
                                          color: "#404040",
                                          fontWeight: "bold",
                                          fontSize: "18px",
                                          fontFamily: "Nunito, sans-serif;",
                                        }}
                                      >
                                        {video.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="pl-12 content-part "
                                  style={{
                                    width: "50%",
                                    minHeight: "150px",
                                    maxHeight: "150px",
                                  }}
                                >
                                  <div className="d-flex pl-12 h5">
                                    {video.name
                                      ? video.name
                                      : "플레이리스트 제목 없음"}
                                  </div>
                                  <div className="d-flex pl-12">
                                    생성일자:{" "}
                                    {searchData[i].createdAt
                                      ? searchData[i].createdAt.split("T")[0]
                                      : " - "}
                                  </div>
                                  <div className="d-flex pl-12">
                                    전체시간:{" "}
                                    {video.totalDuration
                                      ? toHHMMSS(video.totalDuration)
                                      : " - "}
                                  </div>
                                  <div className="d-flex pl-12">
                                    영상개수:{" "}
                                    {video.videos.length
                                      ? video.videos.length + "개"
                                      : " - "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {playlistData ? (
                      <div
                        class="text-center"
                        style={{ marginTop: "10%", height: "30rem" }}
                      >
                        <Spinner
                          animation="grow"
                          variant="secondary"
                          style={{ width: "10rem", height: "10rem" }}
                        />
                      </div>
                    ) : (
                      <div className="row d-flex mt-70 mb-70 align-items-center">
                        <div className="text-align-center fw-normal">
                          플레이리스트가 비었습니다.
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
        {!isEditMode ? (
          <></>
        ) : (
          <div className="col mt-40 d-flex justify-content-center align-items-center">
            <Button
              className="btn btn-sm"
              onClick={() => deletePlaylist()}
              style={{ backgroundColor: "red" }}
            >
              플레이리스트 삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistWidget;
