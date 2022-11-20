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
    // setLastSeq,
    checkPlaylistName,
    updatePlaylistData,
    handleTitleSubmit,
    newTitleChange,
    setSavedPlaylistName,
    isActive,
    setIsActive,
    setIsEmpty,
}) => {
    const [isVideoClicked, setIsVideoClicked] = useState(isClicked);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [cardView, setCardView] = useState(false);
    const [videoIdx, setvideoIdx] = useState();
    //   console.log(selectedVideo[videoNum]);
    console.log(classroomList);
    console.log(playlistData);
    const [classTempData, setClassTempData] = useState([{}]);
    const [linkData, setLinkData] = useState([{ playlist_id: "", contentName: "" }]);
    const { playlist_id, contentName } = linkData;
    useEffect(() => {
        if (classroomList) {
            for (let i = 0; i < classroomList.length; i++) {
                console.log("aa");
                const fetchClassRoom = async () => {
                    try {
                        const res1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom?userId=${userId}&classId=${classroomList[i].classId}`);
                        console.log(res1.data);
                        setClassTempData([...classTempData, res1.data]);
                        // classTempData.concat(res1.data);
                        console.log(classTempData[1]);
                    } catch (err) {
                        console.log("err >> ", err);
                    }
                };
                fetchClassRoom();
            }
        }
    }, []);
    useEffect(() => {
        // const classroomList_ = classTempData.map((class, i) => (
        //     const lecturesList = classTempData.lectures[i].map((lec, j) => (
        //         const contentList = classTempData.lectures[i].contents[j].map((con, k) => (

        //         ))
        //     ))
        // ))
        for (let i = 1; i < classTempData.length; i++) {
            for (let j = 0; j < classTempData[i].lectures.length; j++) {
                for (let k = 0; k < classTempData[i].lectures[j].contents.length; k++) {
                    setLinkData([
                        {
                            ...linkData,
                            [playlist_id]: classTempData[i].lectures[j].contents[k].playlistId,
                            [contentName]: classTempData[i].lectures[j].contents[k].contentName,
                        },
                    ]);

                    console.log(linkData);
                }
            }
        }

        // <div key={data.playlist_id}></div>)
        // {
        //     Array.isArray(classTempData) ? (
        //         classTempData &&
        //         classTempData.map(
        //             (data, i) =>
        //                 //   Array.isArray(classTempData[i].lectures)
        //                 //   ?
        //                 classTempData[i].lectures &&
        //                 classTempData[i].lectures.map(
        //                     (data2, j) =>
        //                         classTempData[i].lectures[j].contents && classTempData[i].lectures[j].contents.map((data3, k) => <div>{classTempData[i].lectures[j].contents[k].playlistId}</div>)
        //                 )
        //             //   : null;
        //         )
        //     ) : (
        //         <></>
        //     );
        // }
    }, [classTempData]);
    useEffect(() => {
        console.log("abc");
        console.log(linkData[1]);
        for (let a = 0; a < linkData.length; a++) {
            console.log(linkData[a]);
        }
    }, [classTempData, linkData, setLinkData]);
    // const linkList =
    //     playlistData &&
    //     playlistData.map((playlistData, i) => (
    //         <li key={playlistData[i].playlistId}>{linkData.filter((data) => data.playlist_id === playlistData[i].playlistId)}</li>
    //         // console.log(linkData.filter((data) => data.playlist_id === playlistData[i].playlistId));
    //         // <></>
    //     ));
    useEffect(() => {}, [linkData]);
    useEffect(() => {
        // setUpdatePlaylistTitle(savedPlaylistName);
        // console.log("savedPlaylistName", savedPlaylistName);
        // console.log("updatePlaylistTitle", updatePlaylistTitle);
    }, [setUpdatePlaylistTitle, setSavedPlaylistName, setVideoNum, videoNum, setSelectedVideo, selectedVideo]);

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
    // const updatePlaylistData = {
    //     playlistId: playlistId,
    //     playlistName: updatePlaylistTitle,
    //     description: "",
    // };
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
                .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`, updateRequest, {
                    method: "POST",
                    headers: {
                        // Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => console.log(res));
        }

        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/update`, JSON.stringify(updatePlaylistData), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        if (selectedPlaylist || savedPlaylistName || updatePlaylistTitle === undefined || "") {
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
            _selectedVideo[grabPosition] = _selectedVideo.splice(targetPosition, 1, _selectedVideo[grabPosition])[0];
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
                                <div className="d-flex justify-content-between align-items-center row pt-30" style={{ right: "0px" }}></div>

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
                                            <div className="pt-5 fs-4">{clickedVideo.newTitle ? decodeHTML(clickedVideo.newTitle) : decodeHTML(clickedVideo.title)}</div>
                                        </div>
                                        <div className="d-flex fw-light ms-0">
                                            재생 시간: {clickedVideo.duration ? toHHMMSS(clickedVideo.duration) : "duration 없음"}
                                            &ensp;| 재생 구간: {clickedVideo.start_s ? toHHMMSS(clickedVideo.start_s) : "00:00"} ~
                                            {clickedVideo.end_s ? toHHMMSS(clickedVideo.end_s) : toHHMMSS(clickedVideo.duration)}{" "}
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
                                                {updatePlaylistTitle ? updatePlaylistTitle : savedPlaylistName}
                                                {/* 비디오 추가 */}
                                                <Link
                                                    className="d-flex justify-content-end"
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
                                                        <i className="fa fa-plus" data-for="addVideo" data-tip></i>
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
                                                <span>&ensp;전체 재생 시간 - {playlistDuration ? toHHMMSS(playlistDuration) : ""}</span>
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
                                                            <div className="d-flex justify-content-center align-items-center ps-3 pe-3" style={{ fontSize: "0.8rem", width: "10px" }}>
                                                                {/* {i + 1} */}
                                                                {i === videoNum && !isEditMode ? <span style={{ width: "10px" }}>▶</span> : <span style={{ width: "10px" }}>{i + 1}</span>}
                                                            </div>
                                                            <span className="d-flex position-relative justify-content-start align-items-center" style={{ maxWidth: "30%" }}>
                                                                <img
                                                                    src={"https://i.ytimg.com/vi/".concat(selectedVideo[i].youtubeId, "/hqdefault.jpg")}
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
                                                            <div className="d-flex row pt-0 ps-3 align-items-center " style={{ width: "100%" }}>
                                                                <div className="playlist-title d-flex row pt-1 pb-0 ps-3 fw-light text-start" style={{ height: "50px" }}>
                                                                    {selectedVideo[i].newTitle ? decodeHTML(selectedVideo[i].newTitle) : decodeHTML(selectedVideo[i].title)}
                                                                </div>
                                                                <div className="d-flex row pt-0 ps-3" style={{ fontSize: "0.8rem" }}>
                                                                    시작: {selectedVideo[i].start_s ? toHHMMSS(selectedVideo[i].start_s) : "00:00"} ~ 종료:{" "}
                                                                    {selectedVideo[i].end_s ? toHHMMSS(selectedVideo[i].end_s) : toHHMMSS(selectedVideo[i].duration)}{" "}
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
                                    <img src={mediaIcon} style={{ margin: "auto", width: "200px" }}></img>
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
                                                                handlePlaylistChange(playlistData[i].playlistId);
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
                                                                        <div className="d-flex ">
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
                                                                        </div>
                                                                        <img
                                                                            // className="img-fluid"
                                                                            style={{
                                                                                objectFit: "cover",
                                                                                width: "260px",
                                                                                height: "156px",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
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
                                                                <div className="d-flex pl-12 h5 pt-1">{video.name ? video.name : " - "}</div>
                                                                <div className="d-flex pl-12">생성일자: {playlistData[i].createdAt ? playlistData[i].createdAt.split("T")[0] : " - "}</div>
                                                                <div className="d-flex pl-12">전체시간: {video.totalDuration ? toHHMMSS(video.totalDuration) : " - "}</div>
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
                                                            className="course-part clearfix m-0 p-3 col-lg-6 col-sm-15"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handlePlaylistChange(playlistData[i].playlistId);
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
                                                                                // className="img-fluid"
                                                                                style={{
                                                                                    objectFit: "cover",
                                                                                    width: "260px",
                                                                                    height: "156px",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
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
                                                                    <div className="d-flex pl-12 h5">{video.name ? video.name : "플레이리스트 제목 없음"}</div>

                                                                    {/* {Array.isArray(linkData)
                                                                        ? linkData.map((linkData, i) => (
                                                                              <></>
                                                                              // {linkData[i].playlist_id===playlistData[i].playlistId ? <h>{linkData[i].contentName}</h>:null}
                                                                          ))
                                                                        : null} */}
                                                                    {/* 11 */}
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
                                        {playlistData ? (
                                            <div className="row d-flex mt-70 mb-70 align-items-center">
                                                <img src={mediaIcon} style={{ margin: "auto", width: "200px" }}></img>
                                                <div className="text-align-center fw-normal">플레이리스트가 비었습니다.</div>
                                            </div>
                                        ) : (
                                            <div class="text-center" style={{ marginTop: "10%", height: "30rem" }}>
                                                <Spinner animation="grow" variant="secondary" style={{ width: "10rem", height: "10rem" }} />
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
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
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
                                                                <div className="d-flex pl-12 h5">{video.name ? video.name : " - "}</div>
                                                                <div className="d-flex pl-12">생성일자: {playlistData[i].createdAt ? playlistData[i].createdAt.split("T")[0] : " - "}</div>
                                                                <div className="d-flex pl-12">전체시간: {video.totalDuration ? toHHMMSS(video.totalDuration) : " - "}</div>
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
                                                                                src={"https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")}
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
                                                                    <div className="d-flex pl-12 h5">{video.name ? video.name : "플레이리스트 제목 없음"}</div>
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
                                    <>
                                        {playlistData ? (
                                            <div class="text-center" style={{ marginTop: "10%", height: "30rem" }}>
                                                <Spinner animation="grow" variant="secondary" style={{ width: "10rem", height: "10rem" }} />
                                            </div>
                                        ) : (
                                            <div className="row d-flex mt-70 mb-70 align-items-center">
                                                <div className="text-align-center fw-normal">플레이리스트가 비었습니다.</div>
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
