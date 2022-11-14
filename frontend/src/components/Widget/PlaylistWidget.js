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
const PlaylistWidget = ({
    userId,
    playlistData,
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
    classroomList,
    setClassroomList,
    classroomData,
    setClassroomData,
    updatePlaylist,
    setUpdatePlaylist,
    lastSeq,
    setLastSeq,
    checkPlaylistName,
}) => {
    const [isVideoClicked, setIsVideoClicked] = useState(isClicked);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [cardView, setCardView] = useState(false);
    const [videoIdx, setvideoIdx] = useState();
    //   console.log(selectedVideo[videoNum]);
    // console.log(playlistData);
    useEffect(() => {
        console.log(classroomList);
        // if (classroomList) {
        //     for (let i = 0; i < classroomList.length; i++) {
        //         console.log("aa");
        //         const fetchClassRoom = async () => {
        //             try {
        //                 const res1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom?userId=${userId}&classId=${classroomList[i].classId}`);
        //                 console.log(res1.data);
        //                 setClassroomData([...classroomData, res1.data]);
        //             } catch (err) {
        //                 console.log("err >> ", err);
        //             }
        //         };
        //         fetchClassRoom();
        //     }
        // }
        console.log(classroomData);
    }, [classroomList, classroomData]);
    useEffect(() => {
        setUpdatePlaylistTitle(savedPlaylistName);
        // console.log("savedPlaylistName", savedPlaylistName);
        // console.log("updatePlaylistTitle", updatePlaylistTitle);
    }, [savedPlaylistName, setVideoNum, videoNum, setSelectedVideo, selectedVideo]);

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
    const updatePlaylistData = {
        playlistId: playlistId,
        playlistName: updatePlaylistTitle,
        description: "",
    };
    const handleSubmit = async () => {
        for (let j = 0; j < selectedVideo.length; j++) {
            console.log(selectedVideo[j]);
            selectedVideo[j].seq = j;
            console.log(selectedVideo[j].seq);
            // console.log(selectedVideo[j].videoNum);
            // selectedVideo[videoNum];
            let updateRequest = {
                videoId: selectedVideo[j].id,
                youtubeId: selectedVideo[j].youtubeId,
                title: selectedVideo[j].title,
                newTitle: selectedVideo[j].title.newTitle,
                start_s: selectedVideo[j].title.start_s,
                end_s: selectedVideo[j].title.end_s,
                duration: selectedVideo[j].title.duration,
                seq: j,
                tag: selectedVideo[j].tag,
            };
            console.log("seq", j);
            const response2 = await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`, updateRequest, {
                    method: "POST",
                    headers: {
                        // Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => console.log(res));

            // }
            // alert("플레이리스트가 수정되었습니다.");
        }
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/update`, JSON.stringify(updatePlaylistData), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        // alert(updatePlaylistTitle + "로 playlist 정보가 업데이트 되었습니다.");
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
        e.preventDefault();
    };

    const _onDragStart = (e) => {
        setGrab(e.target);
        e.target.classList.add("grabbing");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
    };

    const _onDragEnd = async (e) => {
        e.target.classList.remove("grabbing");
        e.dataTransfer.dropEffect = "move";
        console.log(e.currentTarget.dataset.position);
        setVideoNum(e.currentTarget.dataset.position);
        //여기서부터
        // for (let j = 0; j < selectedVideo.length; j++) {
        //     console.log(selectedVideo[j]);
        //     selectedVideo[j].seq = j;
        //     console.log(selectedVideo[j].seq);
        //     // console.log(selectedVideo[j].videoNum);
        //     // selectedVideo[videoNum];
        //     let updateRequest = {
        //         videoId: selectedVideo[j].id,
        //         youtubeId: selectedVideo[j].youtubeId,
        //         title: selectedVideo[j].title,
        //         newTitle: selectedVideo[j].title.newTitle,
        //         start_s: selectedVideo[j].title.start_s,
        //         end_s: selectedVideo[j].title.end_s,
        //         duration: selectedVideo[j].title.duration,
        //         seq: j,
        //         tag: selectedVideo[j].tag,
        //     };
        //     console.log("seq", videoNum);
        //     const response2 = await axios
        //         .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`, updateRequest, {
        //             method: "POST",
        //             headers: {
        //                 // Accept: "application/json",
        //                 "Content-Type": "application/json",
        //             },
        //         })
        //         .then((res) => console.log(res));

        // }
        //여기까지
        // setClickedVideo(video);
        // setStartTime(video.start_s);
        // setEndTime(video.end_s);
        // setVideoNum(i);
        // console.log(i);

        console.log("bb");
    };

    const _onDrop = (e) => {
        let grabPosition = Number(grab.dataset.position);
        let targetPosition = Number(e.target.dataset.position);
        let _selectedVideo = [...selectedVideo];
        _selectedVideo[grabPosition] = _selectedVideo.splice(targetPosition, 1, _selectedVideo[grabPosition])[0];
        setSelectedVideo(_selectedVideo);
        console.log("aa");
    };
    return (
        <div
        // className="row justify-content-center"
        >
            {!isSelected ? (
                <div className="pt-1 pb-3 justify-content-end btn-toolbar">
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
                        <ReactTooltip id="galleryHover" getContent={(dataTip) => "갤러리형"} />
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
                            {/* {isSelected ? ( */}
                            {/* <Link
                                to={{
                                    pathname: "/learntube/learntube-studio/youtubeSearch",
                                    state: {
                                        playlistName: selectedPlaylist,
                                        playlistId: playlistId,
                                        update: true,
                                        existingVideo: selectedVideo,
                                        lastSeq: lastSeq,
                                    },
                                }}
                            >*/}
                            {/* 비디오 추가 */}
                            {/*<div
                                    onClick={(e) => {
                                        checkPlaylistName(e, selectedPlaylist);
                                    }}
                                    className="ms-1 d-flex rounded-circle align-items-center justify-content-center"
                                    style={{
                                        background: "#ff7d4b",
                                        color: "white",
                                        padding: "15px",
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        cursor: "pointer",
                                    }}
                                    data-for="addVideo"
                                    data-tip
                                >
                                    <i className="fa fa-plus" data-for="addVideo" data-tip></i>
                                    <ReactTooltip
                                        id="addVideo"
                                        getContent={(dataTip) => "비디오 추가"}
                                        // style={{ width: "20px" }}
                                    />
                                </div>
                                {/* <Button
                                      onClick={(e) => {
                                        checkPlaylistName(e, selectedPlaylist);
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        // height: "40px",
                                        backgroundColor: "#ff7d4b",
                                      }}
                                    >
                                      비디오 추가
                                    </Button> */}
                            {/* </Link> */}
                            <Button
                                onClick={() => {
                                    setIsEditMode(false);
                                    setUpdatePlaylist(false);
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
                                <div className="d-flex justify-content-between align-items-center row" style={{ right: "0px" }}></div>
                                <Link
                                    className="d-flex justify-content-end p-3"
                                    to={{
                                        pathname: "/learntube/learntube-studio/youtubeSearch",
                                        state: {
                                            playlistName: selectedPlaylist,
                                            playlistId: playlistId,
                                            update: true,
                                            existingVideo: selectedVideo,
                                        },
                                    }}
                                    style={{ padding: "0", margin: "0" }}
                                >
                                    {/* 비디오 추가 */}
                                    <div
                                        onClick={(e) => {
                                            checkPlaylistName(e, selectedPlaylist);
                                        }}
                                        className="ms-1 d-flex rounded-circle align-items-center justify-content-center"
                                        style={{
                                            background: "#ff7d4b",
                                            color: "white",
                                            padding: "15px",
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            cursor: "pointer",
                                        }}
                                        data-for="addVideo"
                                        data-tip
                                    >
                                        <i className="fa fa-plus" data-for="addVideo" data-tip></i>
                                        <ReactTooltip
                                            id="addVideo"
                                            getContent={(dataTip) => "비디오 추가"}
                                            // style={{ width: "20px" }}
                                        />
                                    </div>
                                    {/* <Button
                                      onClick={(e) => {
                                        checkPlaylistName(e, selectedPlaylist);
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        // height: "40px",
                                        backgroundColor: "#ff7d4b",
                                      }}
                                    >
                                      비디오 추가
                                    </Button> */}
                                </Link>
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
                                            <div className="pt-5 fs-4">{clickedVideo.newTitle ? clickedVideo.newTitle : clickedVideo.title}</div>
                                        </div>
                                        <div className="d-flex fw-light ms-0">
                                            재생 시간: {clickedVideo.duration ? toHHMMSS(clickedVideo.duration) : "duration 없음"}
                                            &ensp;| 재생 구간: {clickedVideo.start_s ? toHHMMSS(clickedVideo.start_s) : "00:00"} ~
                                            {clickedVideo.end_s ? toHHMMSS(clickedVideo.end_s) : toHHMMSS(clickedVideo.duration)}{" "}
                                        </div>

                                        <div class="mt-5 mx-md-3 fs-5 text-start text-muted">{clickedVideo.tag}</div>
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
                                            <div class="d-flex text-start fs-6 fw-bold pt-3 pb-0">{selectedPlaylist ? <>{selectedPlaylist}</> : null}</div>
                                            <div class="text-start" style={{ fontSize: "0.8rem" }}>
                                                <span style={{ width: "20px" }}>
                                                    {!isEditMode ? (
                                                        <>
                                                            {videoNum + 1} / {playlistSize}
                                                            &ensp; &#183;
                                                        </>
                                                    ) : null}
                                                </span>
                                                <span>&ensp;전체 재생 시간 - {playlistDuration ? toHHMMSS(playlistDuration) : ""}</span>
                                            </div>
                                        </div>
                                        <div className="my_playlist">
                                            {selectedVideo
                                                // .sort((a, b) => (a.seq > b.seq ? 1 : -1))
                                                .map((data, i) => (
                                                    <>
                                                        <div
                                                            key={i}
                                                            data-position={i}
                                                            onDragOver={_onDragOver}
                                                            onDragStart={_onDragStart}
                                                            onDragEnd={_onDragEnd}
                                                            onDrop={_onDrop}
                                                            draggable
                                                            className="d-flex p-3"
                                                            onClick={() => selectVideo(data, i)}
                                                            style={
                                                                data === clickedVideo
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
                                                            <div className="d-flex justify-content-center align-items-center pe-3" style={{ fontSize: "0.8rem", width: "10px" }}>
                                                                {i + 1}
                                                                {/* {i !== videoNum ? <>{i + 1}</> : <i className="fa fa-caret-right fa-lg" style={{ padding: "0.1rem" }}></i>} */}
                                                            </div>
                                                            <span className="d-flex position-relative justify-content-start" style={{ maxWidth: "30%" }}>
                                                                <img src={"https://i.ytimg.com/vi/".concat(selectedVideo[i].youtubeId, "/hqdefault.jpg")} />
                                                                <span
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
                                                                </span>
                                                            </span>
                                                            <div className="d-flex row pt-0 ps-3 " style={{ width: "100%" }}>
                                                                <div className="playlist-title d-flex row pt-0 ps-3 fw-light text-start" style={{ height: "50px" }}>
                                                                    {selectedVideo[i].newTitle ? selectedVideo[i].newTitle : selectedVideo[i].title}
                                                                </div>
                                                                <div className="d-flex row pt-0 ps-3" style={{ fontSize: "0.8rem" }}>
                                                                    시작: {selectedVideo[i].start_s ? toHHMMSS(selectedVideo[i].start_s) : "00:00"} ~ 종료:{" "}
                                                                    {selectedVideo[i].end_s ? toHHMMSS(selectedVideo[i].end_s) : toHHMMSS(selectedVideo[i].duration)}{" "}
                                                                </div>
                                                            </div>
                                                            {isEditMode ? (
                                                                <div className="d-flex align-items-center">
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
                                <Link
                                    className="d-flex justify-content-end p-3"
                                    to={{
                                        pathname: "/learntube/learntube-studio/youtubeSearch",
                                        state: {
                                            playlistName: selectedPlaylist,
                                            playlistId: playlistId,
                                            update: true,
                                            existingVideo: selectedVideo,
                                        },
                                    }}
                                    style={{ padding: "0", margin: "0" }}
                                >
                                    {/* 비디오 추가 */}
                                    <div
                                        onClick={(e) => {
                                            checkPlaylistName(e, selectedPlaylist);
                                        }}
                                        className="ms-1 d-flex rounded-circle align-items-center justify-content-center"
                                        style={{
                                            background: "#ff7d4b",
                                            color: "white",
                                            padding: "15px",
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            cursor: "pointer",
                                        }}
                                        data-for="addVideo"
                                        data-tip
                                    >
                                        <i className="fa fa-plus" data-for="addVideo" data-tip></i>
                                        <ReactTooltip
                                            id="addVideo"
                                            getContent={(dataTip) => "비디오 추가"}
                                            // style={{ width: "20px" }}
                                        />
                                    </div>
                                    {/* <Button
                                      onClick={(e) => {
                                        checkPlaylistName(e, selectedPlaylist);
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        // height: "40px",
                                        backgroundColor: "#ff7d4b",
                                      }}
                                    >
                                      비디오 추가
                                    </Button> */}
                                </Link>
                                <div className="row d-flex mt-70 mb-70 align-items-center">
                                    <img src={mediaIcon} style={{ margin: "auto", width: "200px" }}></img>
                                    <div className="text-align-center fw-normal">비디오가 없습니다</div>
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
                                                            className="p-2 col-lg-3 col-sm-6"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handlePlaylistChange(playlistData[i].name);
                                                                setSearchMode(false);
                                                            }}
                                                        >
                                                            {/* <span className="d-flex position-relative justify-content-start" style={{ maxWidth: "30%" }}> */}
                                                            {/* <div className="d-flex m-0 row-3 justify-content-center"> */}
                                                            <div
                                                                className="img-part content-part"
                                                                style={
                                                                    {
                                                                        // position: "relative",
                                                                        // width: "250px",
                                                                        // height: "120px",
                                                                    }
                                                                }
                                                            >
                                                                {video.videos[0] ? (
                                                                    <>
                                                                        {" "}
                                                                        <span
                                                                            className="position-absolute rounded justify-content-end text-white ps-2 pe-2 pt-1 pb-1 m-3 align-items-center"
                                                                            style={{ backgroundColor: "#ff614d" }}
                                                                        >
                                                                            <i
                                                                                className="fa"
                                                                                style={{
                                                                                    zIndex: "0",
                                                                                    paddingRight: "3px",
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    style={{
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "13px",
                                                                                        color: "white",
                                                                                    }}
                                                                                >
                                                                                    사용중
                                                                                </span>
                                                                            </i>
                                                                        </span>
                                                                        <img
                                                                            className="img-fluid"
                                                                            style={{
                                                                                height: "180px",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
                                                                        />
                                                                        <span
                                                                            className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                            style={{
                                                                                right: "10px",
                                                                                bottom: "-10px",
                                                                                display: "inline-table",
                                                                                fontSize: "0.8rem",
                                                                            }}
                                                                        >
                                                                            {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <div
                                                                        className="course-features-info"
                                                                        style={{
                                                                            backgroundSize: "cover",
                                                                            backgroundImage: `url(${logo})`,
                                                                            borderRadius: "5px",
                                                                            width: "245px",
                                                                            height: "auto",
                                                                        }}
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                display: "inline-block",
                                                                                height: "180px",
                                                                                lineHeight: "170px",
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
                                                                    minHeight: "100px",
                                                                    maxHeight: "100px",
                                                                }}
                                                            >
                                                                <div className="d-flex pl-12 h5">{video.name ? video.name : " - "}</div>
                                                                <div className="d-flex pl-12">영상개수: {video.videos.length ? video.videos.length + "개" : " - "}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {playlistData.map(function (video, i) {
                                                    return (
                                                        <div
                                                            className="course-part clearfix m-0 p-2 col-lg-6 col-sm-15"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handlePlaylistChange(playlistData[i].name);
                                                                setSearchMode(false);
                                                            }}
                                                        >
                                                            <div className="d-flex m-0 row-3 justify-content-center">
                                                                <div
                                                                    className="img-part content-part"
                                                                    style={{
                                                                        position: "relative",
                                                                        width: "250px",
                                                                        height: "170px",
                                                                    }}
                                                                >
                                                                    {video.videos[0] ? (
                                                                        <>
                                                                            {" "}
                                                                            <span
                                                                                className="position-absolute rounded justify-content-end text-white ps-2 pe-2 pt-1 pb-1 m-3 align-items-center"
                                                                                style={{ backgroundColor: "#ff614d" }}
                                                                            >
                                                                                <i
                                                                                    className="fa"
                                                                                    style={{
                                                                                        zIndex: "0",
                                                                                        paddingRight: "3px",
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "13px",
                                                                                            color: "white",
                                                                                        }}
                                                                                    >
                                                                                        사용중
                                                                                    </span>
                                                                                </i>
                                                                            </span>
                                                                            <img
                                                                                className="img-fluid"
                                                                                style={{
                                                                                    height: "180px",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
                                                                            />
                                                                            <span
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
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <div
                                                                            className="img-part content-part"
                                                                            style={{
                                                                                backgroundSize: "cover",
                                                                                backgroundImage: `url(${logo})`,
                                                                                width: "245px",
                                                                                height: "auto",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    height: "180px",
                                                                                    lineHeight: "170px",
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
                                                                        minHeight: "100px",
                                                                        maxHeight: "100px",
                                                                    }}
                                                                >
                                                                    <div className="d-flex pl-12 h5">{video.name ? video.name : "영상제목"}</div>
                                                                    <div className="d-flex pl-12">생성일자: {playlistData[i].createdAt ? playlistData[i].createdAt.split("T")[0] : " - "}</div>
                                                                    <div className="d-flex pl-12">전체시간: {video.totalDuration ? toHHMMSS(video.totalDuration) : " - "}</div>
                                                                    <div className="d-flex pl-12">영상개수: {video.videos.length ? video.videos.length + "개" : " - "}</div>
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
                                        <div className="row d-flex mt-70 mb-70 align-items-center">
                                            <img src={mediaIcon} style={{ margin: "auto", width: "200px" }}></img>
                                            <div className="text-align-center fw-normal">플레이리스트가 없습니다</div>
                                        </div>
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
                                                            className="p-2 col-lg-3 col-sm-6"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handlePlaylistChange(searchData[i].name);
                                                                setSearchMode(false);
                                                            }}
                                                        >
                                                            <div className="d-flex m-0 row-3 justify-content-center">
                                                                <div
                                                                    className="img-part content-part"
                                                                    style={{
                                                                        position: "relative",
                                                                        width: "250px",
                                                                        height: "170px",
                                                                    }}
                                                                >
                                                                    {video.videos[0] ? (
                                                                        <>
                                                                            <img
                                                                                className="img-fluid"
                                                                                style={{
                                                                                    height: "180px",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
                                                                            />
                                                                            <span
                                                                                className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                                                                style={{
                                                                                    right: "10px",
                                                                                    bottom: "-10px",
                                                                                    display: "inline-table",
                                                                                    fontSize: "0.8rem",
                                                                                }}
                                                                            >
                                                                                {video.totalDuration ? toHHMMSS(video.totalDuration) : ""}
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <div
                                                                            className="course-features-info"
                                                                            style={{
                                                                                backgroundSize: "cover",
                                                                                backgroundImage: `url(${logo})`,
                                                                                borderRadius: "5px",
                                                                                width: "245px",
                                                                                height: "auto",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    height: "180px",
                                                                                    lineHeight: "170px",
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
                                                                    minHeight: "100px",
                                                                    maxHeight: "100px",
                                                                }}
                                                            >
                                                                <div className="d-flex pl-12 h5">{video.name ? video.name : " - "}</div>
                                                                <div className="d-flex pl-12">영상개수: {video.videos.length ? video.videos.length + "개" : " - "}</div>
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
                                                                handlePlaylistChange(searchData[i].name);
                                                                setSearchMode(false);
                                                            }}
                                                        >
                                                            <div className="d-flex m-0 row-3 justify-content-center">
                                                                <div
                                                                    className="img-part content-part"
                                                                    style={{
                                                                        position: "relative",
                                                                        width: "250px",
                                                                        height: "170px",
                                                                    }}
                                                                >
                                                                    {video.videos[0] ? (
                                                                        <>
                                                                            <img
                                                                                className="img-fluid"
                                                                                style={{
                                                                                    height: "180px",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
                                                                            />
                                                                            <span
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
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <div
                                                                            className="img-part content-part"
                                                                            style={{
                                                                                backgroundSize: "cover",
                                                                                backgroundImage: `url(${logo})`,
                                                                                width: "245px",
                                                                                height: "auto",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display: "inline-block",
                                                                                    height: "180px",
                                                                                    lineHeight: "170px",
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
                                                                        minHeight: "100px",
                                                                        maxHeight: "100px",
                                                                    }}
                                                                >
                                                                    <div className="d-flex pl-12 h5">{video.name ? video.name : "영상제목"}</div>
                                                                    <div className="d-flex pl-12">생성일자: {searchData[i].createdAt ? searchData[i].createdAt.split("T")[0] : " - "}</div>
                                                                    <div className="d-flex pl-12">전체시간: {video.totalDuration ? toHHMMSS(video.totalDuration) : " - "}</div>
                                                                    <div className="d-flex pl-12">영상개수: {video.videos.length ? video.videos.length + "개" : " - "}</div>
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
                                        <div className="row d-flex mt-70 mb-70 align-items-center">
                                            <img src={mediaIcon} style={{ margin: "auto", width: "200px" }}></img>
                                            <div className="text-align-center fw-normal">플레이리스트가 없습니다</div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
                {!isEditMode ? (
                    <></>
                ) : (
                    <div className="col mt-40 d-flex justify-content-center align-items-center">
                        <Button className="btn btn-sm" onClick={() => deletePlaylist()} style={{ backgroundColor: "red" }}>
                            플레이리스트 삭제
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistWidget;
