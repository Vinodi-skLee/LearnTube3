import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import mediaIcon from "../../assets/img/icon/mediaIcon.png";

const ContentWidget = (props) => {
  console.log(props);
  const initContentData = {
    id: "",
    contentName: "",
    contentDescription: "",
    openDate: "",
    closeDate: "",
    playlist: [
      {
        id: "",
        playlistTitle: "",
        totalTime: "",
        videos: [{}],
      },
    ],
  };

  const [contentData, setContentData] = useState(initContentData);
  const [contentId, setContentId] = useState(props.content.contentId);
  const [contentNum, setContentNum] = useState(0);
  const [lectureNum, setLectureNum] = useState(props.lecture.lectureNum);
  const [isSelected, setIsSelected] = useState(false);
  const [clickedVideo, setClickedVideo] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [repeatVideo, setRepeatVideo] = useState(false);
  const [isBigDisplay, setIsBigDisplay] = useState(false);
  const [playing, setPlaying] = useState(false);
  // console.log(contentData.playlist.videos[0]);
  const opts = {
    height: "100",
    width: "150",
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

  const disabled = {
    PointerEvent: null, //This makes it not clickable
    opacity: 0.6, //This grays it out to look disabled
  };

  const selectVideo = (video, i) => {
    console.log("video", video);
    setIsSelected(true);
    setClickedVideo(video);
    setStartTime(video.start_s);
    setEndTime(video.end_s);
    setVideoNum(i);
    console.log(videoNum);
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

  // useEffect(() => {
  //   if (isSelected == false && contentData) {
  //     //   selectVideo(contentData.playlist.videos[0]);
  //     console.log(clickedVideo.youtubeId);
  //   }
  //   console.log(isSelected);
  // }, [isSelected]);

  // useEffect(() => {
  //   console.log(contentData);
  // }, [contentData]);

  useEffect(() => {
    const fetchContent = async () => {
      // setContentId(props.content.contentId);

      console.log(contentId);
      try {
        const response = await axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/api/content?contentId=${contentId}`
          )
          .then((res) => setContentData(res.data));
        console.log(contentData);
        console.log(response.data);

        //setContentData(response.data);
      } catch (err) {
        console.log("err >> ", err);
      }
      if (!clickedVideo) setClickedVideo(contentData.playlist.videos[0]);
      //  if(typeof contentData.playlist != "undefined")
    };
    fetchContent();
  }, [contentId, lectureNum]);

  const prevLectureHandler = () => {
    if (lectureNum != 1) {
      //   console.log(props.lectures[lectureNum - 2].contents[0].contentId);
      setContentId(props.lectures[lectureNum - 2].contents[0].contentId);
      setLectureNum(lectureNum - 1);
      setContentNum(0);
      setPlaying(false);
    }
  };
  const nextLectureHandler = () => {
    if (lectureNum <= props.lectures.length) {
      setContentId(props.lectures[lectureNum].contents[0].contentId);
      setLectureNum(lectureNum + 1);
      setContentNum(0);
      setPlaying(false);
    }
  };
  const prevContentHandler = () => {
    if (contentNum < 0) {
      setContentNum(0);
      setContentId(
        props.lectures[lectureNum - 1].contents[contentNum - 1].contentId
      );
      setPlaying(false);
    }
    if (contentNum > 0) setContentNum(contentNum - 1);
    setContentId(
      props.lectures[lectureNum - 1].contents[contentNum - 1].contentId
    );
    setPlaying(false);
  };
  const nextContentHandler = () => {
    if (contentNum < 0) setContentNum(0);
    setContentNum(contentNum + 1);
    setContentId(
      props.lectures[lectureNum - 1].contents[contentNum + 1].contentId
    );
    setPlaying(false);
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

  return (
    <div className="mb-50">
      {!isBigDisplay ? (
        <div class="d-flex text-start ps-3 fs-4 pt-50 mb-0 pl-0 fw-bold">
          {props.className}&ensp;
          {lectureNum}강&ensp;{"-"}&ensp;
          {contentData ? <>{contentData.contentName}</> : null}
        </div>
      ) : null}

      <div>
        {!isBigDisplay ? (
          <>
            {contentData ? (
              <div>
                {contentData.contentDescription ? (
                  <div className="d-flex justify-content-between text-start pt-50 ">
                    {contentData.contentDescription}
                    <div className="d-flex row">
                      {contentData.openDate ? (
                        <div className="text-start fw-light ">
                          학습 기간 : {contentData.openDate.split("T")[0]}{" "}
                          {contentData.openDate.split("T")[1].substring(0, 5)} ~{" "}
                          {contentData.closeDate.split("T")[0]}{" "}
                          {contentData.closeDate.split("T")[1].substring(0, 5)}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <hr class="solid mt-20 mb-50"></hr>
          </>
        ) : null}
        {clickedVideo ? (
          <div>
            <div className="row text-start">
              <div className="pt-20">
                <div className="row">
                  {/* 큰화면일때 화면구성 */}
                  <div className={isBigDisplay ? null : "col-md-8 col-sm-12"}>
                    {/* //연속재생 false일때 */}
                    {repeatVideo === false ? (
                      <>
                        {/* {"큰화면 아이콘"} */}
                        {isBigDisplay ? (
                          <i
                            className="fa fa-compress "
                            onClick={handleBigDisplay}
                            style={{ color: "gray", cursor: "pointer" }}
                          >
                            &ensp;기본 모드
                          </i>
                        ) : (
                          <i
                            className="fa fa-expand"
                            onClick={handleBigDisplay}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            &ensp;영화관 모드
                          </i>
                        )}
                        {isSelected ? (
                          <div>
                            <div className="row">
                              <ReactPlayer
                                url={
                                  contentData.playlist.videos
                                    ? `https://www.youtube.com/watch?v=${clickedVideo.youtubeId}?start=${clickedVideo.start_s}&end=${clickedVideo.end_s}`
                                    : `https://www.youtube.com/watch?v=${contentData.playlist.videos[0].youtubeId}?start=${contentData.playlist.videos[0].start_s}&end=${contentData.playlist.videos[0].end_s}`
                                }
                                width={isBigDisplay ? "100%" : "750px"}
                                height={isBigDisplay ? "800px" : "500px"}
                                playing={playing} // 자동 재생 on
                                // muted={true} // 자동 재생 on
                                controls={true} // 플레이어 컨트롤 노출 여부
                                pip={true} // pip 모드 설정 여부
                                // onEnded={() => handleVideo()}
                              />
                              <div className="row text-start pt-30">
                                <div className="pt-5 fs-4">
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
                                          contentData.playlist.videos[0]
                                            .duration
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
                                          contentData.playlist.videos[0]
                                            .duration
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
                                    url={`https://www.youtube.com/watch?v=${contentData.playlist.videos[0].youtubeId}?start=${contentData.playlist.videos[0].start_s}&end=${contentData.playlist.videos[0].end_s}`}
                                    width={isBigDisplay ? "100%" : "750px"}
                                    height={isBigDisplay ? "800px" : "500px"}
                                    playing={playing} // 자동 재생 on
                                    controls={true} // 플레이어 컨트롤 노출 여부
                                    pip={true} // pip 모드 설정 여부
                                  />
                                  <div className="row">
                                    <div className="row text-start pt-30">
                                      <div className="pt-5 fs-4">
                                        {
                                          contentData.playlist.videos[0]
                                            .videoTitle
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex fw-light ms-0">
                                      재생 시간:{" "}
                                      {contentData.playlist.videos[0].duration
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .duration
                                          )
                                        : "duration 없음"}
                                      &ensp;| 재생 구간:{" "}
                                      {contentData.playlist.videos[0].start_s
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .start_s
                                          )
                                        : "00:00"}{" "}
                                      ~
                                      {contentData.playlist.videos[0].end_s
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0].end_s
                                          )
                                        : toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .duration
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
                    ) : (
                      // 연속재생 true일때
                      <>
                        {/* {"큰화면 보기"} */}
                        {isBigDisplay ? (
                          <i
                            className="fa fa-compress "
                            onClick={handleBigDisplay}
                            style={{ color: "gray", cursor: "pointer" }}
                          >
                            &ensp;기본 모드
                          </i>
                        ) : (
                          <i
                            className="fa fa-expand"
                            onClick={handleBigDisplay}
                            style={{ color: "black", cursor: "pointer" }}
                          >
                            &ensp;영화관 모드
                          </i>
                        )}
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
                                width={isBigDisplay ? "100%" : "750px"}
                                height={isBigDisplay ? "800px" : "500px"}
                                playing={playing} // 자동 재생 on
                                // muted={true} // 자동 재생 on
                                controls={true} // 플레이어 컨트롤 노출 여부
                                pip={true} // pip 모드 설정 여부
                                onEnded={() => handleVideo()}
                              />
                              <div className="row text-start pt-30">
                                <div className="pt-5 fs-4">
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
                                          contentData.playlist.videos[0]
                                            .duration
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
                                          contentData.playlist.videos[0]
                                            .duration
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
                                    url={`https://www.youtube.com/watch?v=${contentData.playlist.videos[0].youtubeId}?start=${contentData.playlist.videos[0].start_s}&end=${contentData.playlist.videos[0].end_s}`}
                                    width={isBigDisplay ? "100%" : "750px"}
                                    height={isBigDisplay ? "800px" : "500px"}
                                    playing={playing} // 자동 재생 on
                                    controls={true} // 플레이어 컨트롤 노출 여부
                                    pip={true} // pip 모드 설정 여부
                                  />
                                  <div className="row">
                                    <div className="row text-start pt-30">
                                      <div className="pt-5 fs-4">
                                        {
                                          contentData.playlist.videos[0]
                                            .videoTitle
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex fw-light ms-0">
                                      재생 시간:{" "}
                                      {contentData.playlist.videos[0].duration
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .duration
                                          )
                                        : "duration 없음"}
                                      &ensp;| 재생 구간:{" "}
                                      {contentData.playlist.videos[0].start_s
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .start_s
                                          )
                                        : "00:00"}{" "}
                                      ~
                                      {contentData.playlist.videos[0].end_s
                                        ? toHHMMSS(
                                            contentData.playlist.videos[0].end_s
                                          )
                                        : toHHMMSS(
                                            contentData.playlist.videos[0]
                                              .duration
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
                  <div className={isBigDisplay ? "" : "col-md-4 col-sm-12 "}>
                    {contentData.playlist.videos ? (
                      <>
                        {/* playlist 연속재생 토글버튼 */}
                        <div className="d-flex justify-content-between">
                          {repeatVideo ? (
                            <i
                              className="fa fa-retweet fa-2x"
                              onClick={handleRepeat}
                              style={{ color: "black" }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-retweet fa-2x"
                              onClick={handleRepeat}
                              style={{ color: "gray" }}
                            ></i>
                          )}
                          <div>
                            <span className="pe-3">
                              동영상 {contentData.playlist.videos.length}개
                              &ensp; &#183;
                            </span>
                            <span>
                              전체 재생 시간 -{" "}
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
                                        background: "#e4e8f5",
                                        borderTop: "1px solid lightgray",
                                        // padding: "25px 20px",
                                        width: "100%",
                                      }
                                    : {
                                        background: "#fff",
                                        borderTop: "1px solid lightgray",
                                        // padding: "25px 20px",
                                        width: "100%",
                                      }
                                }
                              >
                                {/* {contentData.playlist.videos[i].youtubeId} */}
                                <div className="d-flex align-items-center pe-3">
                                  {i + 1}
                                </div>
                                <div className="d-flex position-relative justify-content-end">
                                  <YouTube
                                    className="align-items-center"
                                    videoId={
                                      contentData.playlist.videos[i].youtubeId
                                    }
                                    opts={opts}
                                    //   onEnd={handleNextVideo}
                                  />
                                  <span
                                    className="position-absolute justify-content-end bg-black text-white m-3 me-1"
                                    style={{
                                      right: "0px",
                                      bottom: "0px",
                                      // display: "flex",
                                      display: "inline-table",
                                      fontSize: "0.8rem",
                                    }}
                                  >
                                    {toHHMMSS(
                                      contentData.playlist.videos[i].duration
                                    )}
                                  </span>
                                </div>
                                <div
                                  className="d-flex row pt-0 ps-3"
                                  style={{ width: "100%" }}
                                >
                                  <div className="">
                                    {contentData.playlist.videos[i].videoTitle}
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="row d-flex mt-70 mb-70 align-items-center">
              <img
                src={mediaIcon}
                style={{ margin: "auto", width: "200px" }}
              ></img>
              <div className="text-align-center fw-normal">
                컨텐츠가 비었습니다.
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 이전 강의 버튼 */}
      <div
        className="d-flex justify-content-between mt-100"
        style={{ cursor: "default" }}
      >
        <div className="shadow-none orange-color text-center md-mt-0 p-3">
          <ul className="pagination-part shadow-none border-0">
            {lectureNum != 1 ? (
              <li onClick={prevLectureHandler}>
                <i className="fa fa-step-backward">&ensp;이전 강의</i>
              </li>
            ) : (
              <li>
                <i className="fa fa-step-backward" style={{ color: "gray" }}>
                  &ensp;이전 강의
                </i>
              </li>
            )}
          </ul>

          {/* 이전 컨텐츠 버튼 */}
          {props.lectures[lectureNum - 1].contents.length != 1 ? (
            <>
              {/* {!props.lectures[lectureNum - 1].contents[0] ? ( */}
              <ul className="pagination-part shadow-none border-0">
                {contentNum != 0 ? (
                  <li onClick={prevContentHandler}>
                    <i
                      className="fa fa-play"
                      style={{ transform: "rotate(180deg)" }}
                    ></i>
                    &ensp;이전 컨텐츠
                  </li>
                ) : (
                  <li style={{ color: "gray" }}>
                    <i
                      className="fa fa-play"
                      style={{ transform: "rotate(180deg)", color: "gray" }}
                    ></i>
                    &ensp;이전 컨텐츠
                  </li>
                )}
              </ul>
            </>
          ) : (
            <>
              {/* {!props.lectures[lectureNum - 1].contents[0] ? ( */}
              {contentNum != 0 ? (
                <ul className="pagination-part shadow-none border-0">
                  <li>
                    <i
                      className="fa fa-play"
                      style={{ transform: "rotate(180deg)" }}
                    ></i>
                    &ensp;이전 컨텐츠
                  </li>
                </ul>
              ) : (
                <ul className="pagination-part shadow-none border-0">
                  <li style={{ color: "gray" }}>
                    <i
                      className="fa fa-play"
                      style={{ transform: "rotate(180deg)", color: "gray" }}
                    ></i>
                    &ensp;이전 컨텐츠
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
        {/* 다음 강의 버튼 */}
        <div className="shadow-none orange-color text-center md-mt-0 p-3">
          {props.lectures[lectureNum - 1].contents.length != 1 ? (
            <>
              {/* <h>{props.lectures[lectureNum - 1].contents.length}</h>
                {contentNum} */}
              {props.lectures[lectureNum - 1].contents.length !=
              contentNum + 1 ? (
                <ul className="pagination-part shadow-none border-0">
                  <li onClick={nextContentHandler}>
                    <i className="fa fa-play">&ensp;다음 컨텐츠</i>
                  </li>
                </ul>
              ) : (
                <ul className="pagination-part shadow-none border-0">
                  <li>
                    <i className="fa fa-play" style={{ color: "gray" }}>
                      &ensp;다음 컨텐츠
                    </i>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              {props.lectures[lectureNum - 1].contents.length !=
              contentNum + 1 ? (
                <ul className="pagination-part shadow-none border-0">
                  <li>
                    <i className="fa fa-play">&ensp;다음 컨텐츠</i>
                  </li>
                </ul>
              ) : (
                <ul className="pagination-part shadow-none border-0">
                  <li>
                    <i className="fa fa-play" style={{ color: "gray" }}>
                      &ensp;다음 컨텐츠
                    </i>
                  </li>
                </ul>
              )}
            </>
          )}
          {/* 다음 컨텐츠 버튼  */}
          <ul className="pagination-part shadow-none border-0">
            <li
              onClick={
                lectureNum != props.lectures.length ? nextLectureHandler : null
              }
            >
              <i
                className="fa fa-step-forward"
                style={
                  lectureNum != props.lectures.length ? null : { color: "gray" }
                }
              >
                &ensp;다음 강의
              </i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentWidget;
