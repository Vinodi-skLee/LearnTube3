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
  };
  const nextContentHandler = () => {
    if (contentNum < 0) setContentNum(0);
    setContentNum(contentNum + 1);
    setContentId(lectures[lectureNum - 1].contents[contentNum + 1].contentId);
    setPlaying(false);
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
            className="pagination-part shadow-none border-0 "
            style={{ cursor: "pointer", backgroundColor: "#273857" }}
          >
            {contentNum != 0 ? (
              <li
                onClick={prevContentHandler}
                style={{ color: "#f3f8f9", fontSize: "0.9rem" }}
              >
                <i
                  className="fa fa-play"
                  style={{ transform: "rotate(180deg)" }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            ) : (
              <li style={{ color: "gray", fontSize: "0.9rem" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    color: "gray",
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
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li style={{ fontSize: "0.9rem" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    color: "#f3f8f9",
                  }}
                ></i>
                &ensp;이전 콘텐츠
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li style={{ color: "gray", fontSize: "0.9rem" }}>
                <i
                  className="fa fa-play"
                  style={{
                    transform: "rotate(180deg)",
                    color: "gray",
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
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li
                onClick={nextContentHandler}
                style={{ color: "#f3f8f9", fontSize: "0.9rem" }}
              >
                다음 콘텐츠&ensp;<i className="fa fa-play"></i>
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li style={{ color: "gray", fontSize: "0.9rem" }}>
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
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li style={{ fontSize: "0.9rem" }}>
                다음 콘텐츠&ensp;<i className="fa fa-play"></i>
              </li>
            </ul>
          ) : (
            <ul
              className="pagination-part shadow-none border-0 btn"
              style={{ cursor: "pointer", backgroundColor: "#273857" }}
            >
              <li style={{ color: "gray", fontSize: "0.9rem" }}>
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
