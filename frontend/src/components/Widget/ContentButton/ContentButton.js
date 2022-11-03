import React, { useEffect, useState } from "react";

const ContentButton = ({
  lectureNum,
  setLectureNum,
  contentId,
  setContentId,
  contentNum,
  setContentNum,
  playing,
  setPlaying,
  lectures,
  videoNum,
  setVideoNum,
}) => {
  const prevContentHandler = () => {
    if (contentNum < 0) {
      setContentNum(0);
      setContentId(lectures[lectureNum - 1].contents[contentNum - 1].contentId);
      setPlaying(false);
    }
    if (contentNum > 0) setContentNum(contentNum - 1);
    setContentId(lectures[lectureNum - 1].contents[contentNum - 1].contentId);
    setPlaying(false);
    setVideoNum(0);
  };
  const nextContentHandler = () => {
    if (contentNum < 0) setContentNum(0);
    setContentNum(contentNum + 1);
    setContentId(lectures[lectureNum - 1].contents[contentNum + 1].contentId);
    setPlaying(false);
    setVideoNum(0);
  };
  useEffect(() => {}, [contentId, lectureNum]);
  return (
    <>
      {" "}
      {/* 이전 콘텐츠 버튼 */}
      {lectures[lectureNum - 1].contents.length != 1 ? (
        <>
          {/* {!props.lectures[lectureNum - 1].contents[0] ? ( */}
          <ul
            className={
              contentNum != 0
                ? "pagination-part shadow-none border-0 contentBtn"
                : "pagination-part shadow-none border-0 contentBtn_disabled"
            }
            style={contentNum != 0 ?{ cursor: "pointer"} : null}
          >
            {contentNum != 0 ? (
              <li onClick={prevContentHandler} style={{ fontSize: "0.9rem", color: "white" }}>
                <i
                  className="fa fa-play"
                  style={{ transform: "rotate(180deg)" }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            ) : (
              <li style={{ fontSize: "0.9rem", color: "rgb(195, 195, 195)" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    // color: "gray",
                  }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            )}
          </ul>
        </>
      ) : (
        <>
          {/* {!props.lectures[lectureNum - 1].contents[0] ? ( */}
          {contentNum != 0 ? (
            <ul
              className="pagination-part shadow-none border-0 contentBtn"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
              style={contentNum != 0 ?{ cursor: "pointer"} : null}
            >
              <li style={{ fontSize: "0.9rem", color: "white" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    // color: "#fff",
                  }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 contentBtn_disabled"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
            >
              <li style={{ fontSize: "0.9rem", color: "rgb(195, 195, 195)" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    // color: "gray",
                  }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            </ul>
          )}
        </>
      )}
      {lectures[lectureNum - 1].contents.length != 1 ? (
        <>
          {/* <h>{props.lectures[lectureNum - 1].contents.length}</h>
{contentNum} */}
          {lectures[lectureNum - 1].contents.length != contentNum + 1 ? (
            <ul
              className="pagination-part shadow-none border-0 contentBtn"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
              style={lectures[lectureNum - 1].contents.length != contentNum + 1 ?{ cursor: "pointer"} : null}
            >
              <li onClick={nextContentHandler} style={{ fontSize: "0.9rem", color: "white" }}>
                다음 콘텐츠&ensp;<i className="fa fa-play"></i>
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 contentBtn_disabled"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
            >
              <li style={{ fontSize: "0.9rem", color: "rgb(195, 195, 195)" }}>
                다음 콘텐츠&ensp;
                <i className="fa fa-play"></i>
              </li>
            </ul>
          )}
        </>
      ) : (
        <>
          {lectures[lectureNum - 1].contents.length != contentNum + 1 ? (
            <ul
              className="pagination-part shadow-none border-0 contentBtn"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
              style={lectures[lectureNum - 1].contents.length != contentNum + 1 ?{ cursor: "pointer"} : null}
            >
              <li style={{ fontSize: "0.9rem", color: "white" }}>
                다음 콘텐츠&ensp;<i className="fa fa-play"></i>
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 contentBtn_disabled"
              // style={{ cursor: "pointer", backgroundColor: "#a5abbd" }}
            >
              <li style={{ fontSize: "0.9rem", color: "rgb(195, 195, 195)" }}>
                다음 콘텐츠&ensp;
                <i className="fa fa-play"></i>
              </li>
            </ul>
          )}
        </>
      )}
    </>
  );
};
export default ContentButton;
