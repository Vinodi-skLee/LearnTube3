import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import mediaIcon from "../../assets/img/icon/mediaIcon.png";
import ContentButton from "./ContentButton/ContentButton";
import ReactTooltip from "react-tooltip";
import { TbRectangle } from "react-icons/tb";
const ContentWidget = ({
  className,
  lecture,
  lectureNum,
  setLectureNum,
  content,
  i,
  j,
  lectures,
  contentData,
  contentNum,
  setContentNum,
  videos,
  contentId,
  setContentId,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickedVideo, setClickedVideo] = useState();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [repeatVideo, setRepeatVideo] = useState(false);
  const [isBigDisplay, setIsBigDisplay] = useState(false);
  const [playing, setPlaying] = useState(false);
  // console.log(videos[0]);

  useEffect(() => {
    if (videos) setClickedVideo(videos[0]);
  }, [videos]);
  const opts = {
    height: "80",
    width: "120",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const opts2 = {
    height: "500",
    width: "750",
    playerVars: {
      autoplay: 1,
      start: { startTime },
      end: { endTime },
    },
  };
  const opts3 = {
    height: "800",
    width: "1200",
    playerVars: {
      autoplay: 1,
      start: { startTime },
      end: { endTime },
    },
  };

  const selectVideo = (video, i) => {
    // console.log("video", video);
    setIsSelected(true);
    setClickedVideo(video);
    setStartTime(video.start_s);
    setEndTime(video.end_s);
    setVideoNum(i);
    // console.log(videoNum);
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

  const [videoNum, setVideoNum] = useState(0);
  const handleVideo = () => {
    console.log("end");
    console.log(contentData.playlist.videos[videoNum + 1]);
    // selectVideo(contentData.playlist.videos[videoNum + 1]);
    if (contentData.playlist.videos.length != videoNum + 1) {
      setIsSelected(true);
      setClickedVideo(contentData.playlist.videos[videoNum + 1]);
      // console.log(clickedVideo);
      setStartTime(contentData.playlist.videos[videoNum + 1].start_s);
      setEndTime(contentData.playlist.videos[videoNum + 1].end_s);
      setPlaying(true);
      opts2.autoplay = 1;
      setVideoNum(videoNum + 1);
    }
  };
  const handleRepeat = () => {
    setRepeatVideo(!repeatVideo);
    setPlaying(true);
    console.log(repeatVideo);
  };
  const handleBigDisplay = () => {
    setIsBigDisplay(!isBigDisplay);
    console.log(isBigDisplay);
  };
  const nextLectureHandler = () => {
    if (lectureNum <= lectures.length) {
      // console.log(
      //   location.state.classRoomData.lectures[lectureNum].contents[0].contentId
      // );

      setContentId(lectures[lectureNum].contents[0].contentId);
      setLectureNum(lectureNum + 1);
      setContentNum(0);
      setPlaying(false);
      console.log("nextLectureHandler", lectureNum);
    }
  };
  return (
    <div>
      <div>
        {!isBigDisplay ? (
          <>
            {/* {contentData ? (
                            <div>
                                {contentData.contentDescription ? (
                                    <div className="d-flex justify-content-between text-start pt-5 ">
                                        {contentData.contentDescription}
                                        <div className="d-flex row">
                                            {contentData.openDate ? (
                                                <div className="text-start fw-light ">
                                                    학습 기간 : {contentData.openDate.split("T")[0]} {contentData.openDate.split("T")[1].substring(0, 5)} ~ {contentData.closeDate.split("T")[0]}{" "}
                                                    {contentData.closeDate.split("T")[1].substring(0, 5)}
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null} */}
            {/* <hr class="solid mt-20 mb-50"></hr> */}
          </>
        ) : null}

        {clickedVideo ? (
          <div>
            <div className="row p-10 text-start pt-30">
              {/* {"큰화면 아이콘"} */}
              {isBigDisplay ? (
                <div
                  className="d-flex justify-content-start align-items-center"
                  // className="d-flex justify-content-end align-items-center"
                  style={{ color: "gray", cursor: "pointer" }}
                >
                  <TbRectangle
                    onClick={handleBigDisplay}
                    data-for="handleSmDisplay"
                    data-tip
                  />
                  <ReactTooltip
                    id="handleSmDisplay"
                    getContent={(dataTip) => "기본 모드"}
                    // style={{ width: "20px" }}
                  />
                  {/* <h>기본 모드</h> */}
                </div>
              ) : (
                <>
                  <div
                    className="d-flex justify-content-start align-items-center"
                    // className="d-flex justify-content-end align-items-center"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    <TbRectangle
                      className="fa-lg"
                      // className="justify-content-end"
                      onClick={handleBigDisplay}
                      data-for="handleBigDisplay"
                      data-tip
                    />
                    <ReactTooltip
                      id="handleBigDisplay"
                      getContent={(dataTip) => "영화관 모드"}
                      // size={20}
                    />
                    {/* <h>영화관 모드</h> */}
                  </div>
                </>
              )}
              <div className={isBigDisplay ? null : "col-md-8 col-sm-12"}>
                {/* 큰화면일때 화면구성 */}
                {/* //연속재생 false일때 */}
                {repeatVideo === false ? (
                  <>
                    {isSelected ? (
                      <div>
                        <div className="row">
                          <ReactPlayer
                            url={
                              contentData.playlist.videos
                                ? `https://www.youtube.com/watch?v=${clickedVideo.youtubeId}?start=${clickedVideo.start_s}&end=${clickedVideo.end_s}`
                                : `https://www.youtube.com/watch?v=${contentData.playlist.videos[i].youtubeId}?start=${contentData.playlist.videos[i].start_s}&end=${contentData.playlist.videos[i].end_s}`
                            }
                            width={isBigDisplay ? "100%" : "100%"}
                            height={isBigDisplay ? "800px" : "500px"}
                            playing={playing} // 자동 재생 on
                            // muted={true} // 자동 재생 on
                            controls={true} // 플레이어 컨트롤 노출 여부
                            pip={true} // pip 모드 설정 여부
                            // onEnded={() => handleVideo()}
                          />{" "}
                          {/* 동영상 제목, 재생시간/구간 */}
                          <div className="row text-start pt-10">
                            <div className="pt-1 fs-4">
                              {contentData.playlist.videos
                                ? clickedVideo.videoTitle
                                : contentData.playlist.videos[i].videoTitle}
                            </div>
                          </div>
                          <div className="d-flex fw-light ms-0">
                            {contentData.playlist.videos ? (
                              <>
                                재생 시간:
                                {clickedVideo.duration
                                  ? toHHMMSS(clickedVideo.duration)
                                  : "duration 없음"}
                                &ensp;| 재생 구간:
                                {clickedVideo.start_s
                                  ? toHHMMSS(clickedVideo.start_s)
                                  : "00:00"}
                                ~
                                {clickedVideo.end_s
                                  ? toHHMMSS(clickedVideo.end_s)
                                  : toHHMMSS(clickedVideo.duration)}
                              </>
                            ) : (
                              <>
                                재생 시간:
                                {contentData.playlist.videos[i].duration
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].duration
                                    )
                                  : "duration 없음"}
                                &ensp;| 재생 구간:
                                {contentData.playlist.videos[i].start_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].start_s
                                    )
                                  : "00:00"}
                                ~
                                {contentData.playlist.videos[i].end_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].end_s
                                    )
                                  : toHHMMSS(
                                      contentData.playlist.videos[i].duration
                                    )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {contentData.playlist.videos ? (
                          <>
                            <div>
                              <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${contentData.playlist.videos[i].youtubeId}?start=${contentData.playlist.videos[i].start_s}&end=${contentData.playlist.videos[i].end_s}`}
                                width={isBigDisplay ? "100%" : "100%"}
                                height={isBigDisplay ? "800px" : "500px"}
                                playing={playing} // 자동 재생 on
                                controls={true} // 플레이어 컨트롤 노출 여부
                                pip={true} // pip 모드 설정 여부
                              />
                              <div className="row text-start pt-10">
                                <div className="pt-1 fs-4">
                                  {contentData.playlist.videos[i].videoTitle}
                                </div>
                              </div>
                              <div className="d-flex fw-light ms-0">
                                재생 시간:{" "}
                                {contentData.playlist.videos[i].duration
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].duration
                                    )
                                  : "duration 없음"}
                                &ensp;| 재생 구간:{" "}
                                {contentData.playlist.videos[i].start_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].start_s
                                    )
                                  : "00:00"}{" "}
                                ~
                                {contentData.playlist.videos[i].end_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[i].end_s
                                    )
                                  : toHHMMSS(
                                      contentData.playlist.videos[i].duration
                                    )}{" "}
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  // 연속재생 true일때
                  <>
                    {isSelected ? (
                      // 선택시 불러오는 동영상
                      <div>
                        <div className="row">
                          <ReactPlayer
                            url={
                              contentData.playlist.videos && isSelected
                                ? `https://www.youtube.com/watch?v=${clickedVideo.youtubeId}?start=${clickedVideo.start_s}&end=${clickedVideo.end_s}`
                                : `https://www.youtube.com/watch?v=${contentData.playlist.videos[0].youtubeId}?start=${contentData.playlist.videos[0].start_s}&end=${contentData.playlist.videos[0].end_s}`
                            }
                            width={isBigDisplay ? "100%" : "100%"}
                            height={isBigDisplay ? "800px" : "500px"}
                            playing={playing} // 자동 재생 on
                            // muted={true} // 자동 재생 on
                            controls={true} // 플레이어 컨트롤 노출 여부
                            pip={true} // pip 모드 설정 여부
                            onEnded={() => handleVideo()}
                          />

                          <div className="row text-start ">
                            <div className="pt-1 fs-4">
                              {contentData.playlist.videos
                                ? clickedVideo.videoTitle
                                : contentData.playlist.videos[0].videoTitle}
                            </div>
                          </div>
                          <div className="d-flex fw-light ms-0">
                            {contentData.playlist.videos ? (
                              <>
                                재생 시간:
                                {clickedVideo.duration
                                  ? toHHMMSS(clickedVideo.duration)
                                  : "duration 없음"}
                                &ensp;| 재생 구간:
                                {clickedVideo.start_s
                                  ? toHHMMSS(clickedVideo.start_s)
                                  : "00:00"}
                                ~
                                {clickedVideo.end_s
                                  ? toHHMMSS(clickedVideo.end_s)
                                  : toHHMMSS(clickedVideo.duration)}
                              </>
                            ) : (
                              <>
                                재생 시간:
                                {contentData.playlist.videos[0].duration
                                  ? toHHMMSS(
                                      contentData.playlist.videos[0].duration
                                    )
                                  : "duration 없음"}
                                &ensp;| 재생 구간:
                                {contentData.playlist.videos[0].start_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[0].start_s
                                    )
                                  : "00:00"}
                                ~
                                {contentData.playlist.videos[0].end_s
                                  ? toHHMMSS(
                                      contentData.playlist.videos[0].end_s
                                    )
                                  : toHHMMSS(
                                      contentData.playlist.videos[0].duration
                                    )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      //선택한 것이 없을 때 = default 영상 시
                      <>
                        {contentData.playlist.videos ? (
                          <>
                            <div>
                              <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${contentData.playlist.videos[i].youtubeId}?start=${contentData.playlist.videos[i].start_s}&end=${contentData.playlist.videos[i].end_s}`}
                                // width={isBigDisplay ? "100%" : "100%"}
                                // height={isBigDisplay ? "800px" : "500px"}
                                playing={playing} // 자동 재생 on
                                controls={true} // 플레이어 컨트롤 노출 여부
                                pip={true} // pip 모드 설정 여부
                                onEnded={() => handleVideo()}
                              />{" "}
                              <div className="row">
                                <div className="row text-start pt-10">
                                  <div className="pt-1 fs-4">
                                    {contentData.playlist.videos[i].videoTitle}
                                  </div>
                                </div>
                                <div className="d-flex fw-light ms-0">
                                  재생 시간:{" "}
                                  {contentData.playlist.videos[i].duration
                                    ? toHHMMSS(
                                        contentData.playlist.videos[i].duration
                                      )
                                    : "duration 없음"}
                                  &ensp;| 재생 구간:{" "}
                                  {contentData.playlist.videos[i].start_s
                                    ? toHHMMSS(
                                        contentData.playlist.videos[i].start_s
                                      )
                                    : "00:00"}{" "}
                                  ~
                                  {contentData.playlist.videos[i].end_s
                                    ? toHHMMSS(
                                        contentData.playlist.videos[i].end_s
                                      )
                                    : toHHMMSS(
                                        contentData.playlist.videos[i].duration
                                      )}{" "}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {/* Playlist 부분 */}
              <div
                className={isBigDisplay ? "pt-20" : "col-md-4 col-sm-12 "}
                // style={{ height: "430px" }}
              >
                <div
                  class="d-flex text-start fs-6 fw-bold p-3 pb-0"
                  style={{
                    background: "#fff",
                    borderTop: "1px solid lightgray",
                    borderLeft: "1px solid lightgray",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  {className}&ensp;
                  {lectureNum}강&ensp;{"-"}&ensp;
                  {contentData ? <>{contentData.contentName}</> : null}
                </div>

                {contentData.playlist.videos ? (
                  <>
                    {/* playlist 연속재생 토글버튼 */}
                    <div
                      className="d-flex justify-content-between align-items-center p-3 pt-0 pb-2"
                      style={{
                        background: "#fff",
                        borderLeft: "1px solid lightgray",
                        borderRight: "1px solid lightgray",
                        borderBottom: "1px solid lightgray",
                      }}
                    >
                      {repeatVideo ? (
                        <i
                          className="fa fa-retweet fa-lg"
                          onClick={handleRepeat}
                          style={{ color: "black", cursor: "pointer" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-retweet fa-lg"
                          onClick={handleRepeat}
                          style={{ color: "gray", cursor: "pointer" }}
                        ></i>
                      )}
                      <div style={{ fontSize: "0.8rem" }}>
                        <span>
                          {videoNum + 1} / {contentData.playlist.videos.length}
                          &ensp; &#183;
                        </span>
                        <span>
                          &ensp;전체 재생 시간 -{" "}
                          {contentData.playlist.totalTime
                            ? toHHMMSS(contentData.playlist.totalTime)
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="video_playlist">
                      {contentData.playlist.videos.map((data, i) => (
                        // {/* playlist 연속재생 토글버튼 */}
                        <>
                          <div
                            className="d-flex p-3"
                            onClick={() => selectVideo(data, i)}
                            style={
                              data === clickedVideo
                                ? {
                                    background: "#E3F0FF",
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
                            {/* {contentData.playlist.videos[i].youtubeId} */}
                            <div
                              className="d-flex align-items-center pe-3"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {i !== videoNum ? (
                                <>{i + 1}</>
                              ) : (
                                <i
                                  className="fa fa-caret-right fa-lg"
                                  style={{ padding: "0.1rem" }}
                                ></i>
                              )}
                            </div>
                            <span
                              className="d-flex position-relative justify-content-start"
                              style={{ maxWidth: "30%" }}
                            >
                              <img
                                src={`https://img.youtube.com/vi/${contentData.playlist.videos[i].youtubeId}/mqdefault.jpg`}
                              />
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
                                {toHHMMSS(
                                  contentData.playlist.videos[i].duration
                                )}
                              </span>
                            </span>
                            <div
                              className="d-flex row pt-0 ps-3 "
                              style={{ width: "100%" }}
                            >
                              <div className="playlist-title">
                                {contentData.playlist.videos[i].videoTitle}
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : null}
                <div
                  className="d-flex justify-content-between mt-3"
                  // style={{ fontSize: "0.5rem" }}
                >
                  <ContentButton
                    lectureNum={lectureNum}
                    setLectureNum={setLectureNum}
                    contentId={contentId}
                    setContentId={setContentId}
                    contentNum={contentNum}
                    setContentNum={setContentNum}
                    playing={playing}
                    setPlaying={setPlaying}
                    lectures={lectures}
                  />
                </div>
              </div>
            </div>{" "}
          </div>
        ) : (
          <div>
            <div className="row d-flex mt-70 mb-70 align-items-center">
              <img
                src={mediaIcon}
                style={{ margin: "auto", width: "200px" }}
              ></img>
              <div className="text-align-center fw-normal">
                콘텐츠가 비었습니다.
              </div>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default ContentWidget;
