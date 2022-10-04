import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import SetPlaylistDropdown from "../Dropdown/SetPlaylistDropdown";

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"
></script>;

const PlaylistWidget = ({
    isSelected,
    selectedPlaylist,
    selectedVideo,
    playlistId,
    savedPlaylistName,
    playlistSize,
    playlistDuration,
    userId,
    isClicked,
    clickedVideo,
    setClickedVideo,
    handlePlaylistChange,
}) => {
    const [isVideoClicked, setIsVideoClicked] = useState(isClicked);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [playlistData, setPlaylistData] = useState(null);
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

    useEffect(() => {
        setUpdatePlaylistTitle(savedPlaylistName);
        // console.log("savedPlaylistName", savedPlaylistName);
        // console.log("updatePlaylistTitle", updatePlaylistTitle);
    }, [savedPlaylistName]);

    const onClickPlaylist = (e) => {
        handlePlaylistChange(e.name);
    };

    const initUpdatePlaylistData = {
        playlistId: playlistId,
        playlistName: updatePlaylistTitle,
        description: "",
    };
    const opts = {
        height: "125",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const opts2 = {
        height: "450px",
        width: "95%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            start: startTime,
            end: endTime,
        },
    };
    console.log(clickedVideo);
    const popUp = (video) => {
        setIsVideoClicked(true);
        setClickedVideo(video);
        setStartTime(video.start_s);
        setEndTime(video.end_s);
    };

    const checkPlaylistName = (event, selectedPlaylist) => {
        if (typeof selectedPlaylist != "string") {
            alert("Playlist를 선택해주세요.");
            event.preventDefault();
        }
    };

    const selectVideo = (video, i) => {
        console.log("video", video);
        setClickedVideo(video);
        setStartTime(video.start_s);
        setEndTime(video.end_s);
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
    const newTitleChange = (e) => {
        console.log(updatePlaylistTitle);
        setUpdatePlaylistTitle(e.target.value);
    };
    const updatePlaylistData = {
        playlistId: playlistId,
        playlistName: updatePlaylistTitle,
        description: "",
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
    //JSON.stringify(selectedPlaylist)

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
    return (
        <div>
            <div className="row">
                {isSelected ? (
                    <div className="d-flex justify-content-between align-items-center row mb-40" style={{ right: "0px" }}>
                        {typeof selectedPlaylist != "string" ? (
                            <div className="col">
                                <h3 className="col text-start m-0">
                                    <i className="fa fa-play-circle-o pe-1"></i> {typeof selectedPlaylist === "string" ? selectedPlaylist : ""}
                                </h3>
                            </div>
                        ) : (
                            <div className="col">
                                {updatePlaylist ? (
                                    <h3 className="col text-start m-0">
                                        <i className="fa fa-play-circle-o pe-1"></i> {/*{typeof selectedPlaylist === 'string' ? selectedPlaylist : '선택된 playlist 제목'}}*/}
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
                                    </h3>
                                ) : (
                                    <h3 className="text-start ps-3 fs-4 m-0 pl-0 fw-bold">
                                        <i className="fa fa-play-circle-o pe-1"></i> {typeof selectedPlaylist === "string" ? selectedPlaylist : "선택된 playlist 제목"}
                                    </h3>
                                )}
                            </div>
                        )}

                        <div className="col d-flex justify-content-end align-items-center">
                            <SetPlaylistDropdown
                                playlistId={playlistId}
                                selectedPlaylist={selectedPlaylist}
                                checkPlaylistName={checkPlaylistName}
                                setUpdatePlaylist={setUpdatePlaylist}
                                updatePlaylist={updatePlaylist}
                                deletePlaylist={deletePlaylist}
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {isSelected ? (
                    <>
                        <div className=" col-lg-8 mt-26 mb-30" style={{ left: "0" }}>
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${clickedVideo.youtubeId}?start=${clickedVideo.start_s}&end=${clickedVideo.end_s}`}
                                width="750px"
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

                        <div className="col-md-4 col-sm-12">
                            <div className="video_playlist">
                                <div className="row">
                                    <div className="d-flex justify-content-between">
                                        <span>{playlistSize + "개의 동영상"}</span>
                                        <span>전체 재생 시간 - {playlistDuration ? toHHMMSS(playlistDuration) : ""}</span>
                                    </div>
                                    {Array.isArray(selectedVideo)
                                        ? selectedVideo.map((data, i) => (
                                              <div
                                                  className="d-flex"
                                                  onClick={() => selectVideo(data, i)}
                                                  style={
                                                      data === clickedVideo
                                                          ? {
                                                                background: "#e4e8f5",
                                                                borderTop: "1px solid lightgray",
                                                                padding: "25px 20px",
                                                                width: "100%",
                                                                cursor: "pointer",
                                                            }
                                                          : {
                                                                background: "#fff",
                                                                borderTop: "1px solid lightgray",
                                                                padding: "25px 20px",
                                                                width: "100%",
                                                                cursor: "pointer",
                                                            }
                                                  }
                                              >
                                                  <div className="d-flex" onClick={(e) => popUp(data)}>
                                                      <div className="m-1">
                                                          <img
                                                              className="img-fluid"
                                                              style={{ width: "170px", marginRight: "20px" }}
                                                              src={"https://i.ytimg.com/vi/".concat(selectedVideo[i].youtubeId, "/hqdefault.jpg")}
                                                              alt="영상제목"
                                                          />

                                                          {/* <YouTube videoId={selectedVideo[i].youtubeId} opts={opts} /> */}
                                                      </div>
                                                      <div className="col-md-6 col-sm-12" style={{ alignItems: "center" }}>
                                                          <div className="d-flex h5 text-start">{selectedVideo[i].newTitle ? selectedVideo[i].newTitle : selectedVideo[i].title}</div>
                                                          <div className="d-flex fw-light ms-0 ps-0">영상 길이: {selectedVideo[i].duration ? toHHMMSS(selectedVideo[i].duration) : ""}</div>
                                                          <div className="d-flex fw-light">
                                                              시작: {selectedVideo[i].start_s ? toHHMMSS(selectedVideo[i].start_s) : "00:00"} ~ 종료:{" "}
                                                              {selectedVideo[i].end_s ? toHHMMSS(selectedVideo[i].end_s) : toHHMMSS(selectedVideo[i].duration)}{" "}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        {playlistData ? (
                            <div className="row">
                                {/* <div>플레이리스트가 없습니다. </div> */}
                                {playlistData.map(function (video, i) {
                                    return (
                                        <div className="p-2 col-lg-3 col-sm-6" style={{ cursor: "pointer" }} onClick={() => onClickPlaylist(playlistData[i])}>
                                            <div className="m-0 row-3 justify-content-center">
                                                <img
                                                    className="img-fluid"
                                                    style={{ height: "180px" }}
                                                    src={
                                                        video.videos[0]
                                                            ? "https://i.ytimg.com/vi/".concat(video.videos[0].youtubeId, "/hqdefault.jpg")
                                                            : "https://i.ibb.co/HDm4g2y/Learntube-logos-transparent-2-1.png"
                                                    }
                                                    alt={video.name}
                                                />
                                            </div>
                                            <div className="pt-3 px-3" style={{ minHeight: "100px", maxHeight: "100px" }}>
                                                <div className="d-flex pl-12 h5">{video.name ? video.name : "영상제목"}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistWidget;
