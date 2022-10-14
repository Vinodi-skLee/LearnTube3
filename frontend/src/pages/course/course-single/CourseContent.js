import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import OffWrap from "../../../components/Layout/Header/OffWrap";
import SearchModal from "../../../components/Layout/Header/SearchModal";
import ContentWidget from "../../../components/Widget/ContentWidget";
import favIcon from "../../../assets/img/fav-orange.png";
import Logo from "../../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../../assets/img/logo/lite-logo.png";
import ReactTooltip from "react-tooltip";
import { FcNext, FcPrevious } from "react-icons/fc";
import { GrNext, GrPrevious } from "react-icons/gr";
const CourseContent = (props) => {
  const location = useLocation();
  // const [classRoomData, setClassRoomData] = useState(props.classRoomData);
  const [lectures, setLectures] = useState(
    location.state.classRoomData.lectures
  );
  // useEffect(() => {
  //   console.log(classRoomData.instructorName);
  // }, [classRoomData]);
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
  const [contentId, setContentId] = useState(
    location.state.classRoomData.lectures[location.state.i].contents[
      location.state.j
    ].contentId
  );
  const [lectureNum, setLectureNum] = useState(
    location.state.classRoomData.lectures[location.state.i].lectureNum
  );

  const [playing, setPlaying] = useState(false);
  const [contentNum, setContentNum] = useState(0);
  useEffect(() => {
    // console.log(contentId);
    const fetchClassRoom = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/content?contentId=${contentId}`
        );
        // console.log(res.data);
        setContentData(res.data);
        // console.log(contentData);
      } catch (err) {
        console.log("err >> ", err);
      }
    };
    fetchClassRoom();
  }, [contentId, lectureNum]);
  const prevLectureHandler = () => {
    if (lectureNum != 1) {
      // console.log("prevLectureHandler", lectureNum);
      // console.log(
      //   location.state.classRoomData.lectures[lectureNum - 2].contents[0]
      //     .contentId
      // );
      setContentId(lectures[lectureNum - 2].contents[0].contentId);
      setLectureNum(lectureNum - 1);
      setContentNum(0);
      setPlaying(false);
    }
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
    <React.Fragment>
      <Helmet>
        <link rel="icon" href={favIcon} />
      </Helmet>
      <OffWrap />
      <Header
        parentMenu="dashboard"
        secondParentMenu="event"
        headerNormalLogo={Logo}
        headerStickyLogo={Logo}
        CanvasLogo={Logo}
        mobileNormalLogo={Logo}
        CanvasClass="right_menu_togle hidden-md"
        headerClass="full-width-header header-style1 home8-style4"
      />
      <div
        className="pb-100 md-pb-10 gray-bg"
        // style={{ backgroundColor: "#fff" }}
      >
        <div className="container">
          {/* <div className="justify-content-around align-items-center d-flex"> */}
          <div className="d-flex align-items-center">
            {/* 이전 강의 버튼 */}
            <div className=" md-mt-0 p-3">
              <ul
                className={
                  lectureNum != 1
                    ? "pagination-part border-0 contentBtn"
                    : "pagination-part border-0 contentBtn_block"
                }
                // style={{ cursor: "pointer", backgroundColor: "#273857" }}
                // style={
                //   lectureNum != 1
                //     ? { backgroundColor: "gray" }
                //     : { backgroundColor: "#273857" }
                // }
              >
                {lectureNum != 1 ? (
                  <>
                    <li
                      onClick={prevLectureHandler}
                      data-for="prevLectureBtnHover"
                      data-tip
                    >
                      {/* <GrPrevious /> */}
                      <i
                        className="fa fa-angle-left fa-lg"
                        // style={{ color: "#f3f8f9" }}
                      ></i>
                    </li>{" "}
                    <ReactTooltip
                      id="prevLectureBtnHover"
                      getContent={(dataTip) => "이전 강의"}
                      // style={{ width: "20px" }}
                    />
                  </>
                ) : (
                  <>
                    <li data-for="prevLectureBtnHover" data-tip>
                      {" "}
                      {/* <GrPrevious style={{ color: "gray" }} /> */}
                      <i
                        className="fa fa-angle-left fa-lg"
                        // style={{ color: "gray" }}
                      ></i>
                    </li>{" "}
                    <ReactTooltip
                      id="prevLectureBtnHover"
                      getContent={(dataTip) => "이전 강의"}
                      // style={{ width: "20px" }}
                    />
                  </>
                )}
              </ul>
            </div>
            <div className="pl-0">
              <div class=" text-center dashboard-tabs">
                <div className=" intro-info-tabs border-none row">
                  <div className="col-lg-12 col-md-12">
                    <div className="widget-area">
                      <ContentWidget
                        className={location.state.classRoomData.className}
                        lecture={
                          location.state.classRoomData.lectures[
                            location.state.i
                          ]
                        }
                        lectureNum={lectureNum}
                        setLectureNum={setLectureNum}
                        content={
                          location.state.classRoomData.lectures[
                            location.state.i
                          ].contents[location.state.j]
                        }
                        i={location.state.i}
                        j={location.state.j}
                        lectures={lectures}
                        contentData={contentData}
                        contentNum={contentNum}
                        setContentNum={setContentNum}
                        videos={contentData.playlist.videos}
                        contentId={contentId}
                        setContentId={setContentId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* 다음 강의 버튼 */}
            <span className="shadow-none orange-color text-center md-mt-0 p-3">
              <ul
                className={
                  lectureNum + 1 != lectures.length
                    ? "pagination-part shadow-none border-0 contentBtn"
                    : // style={{ cursor: "pointer", backgroundColor: "#273857" }}
                      "pagination-part shadow-none border-0 contentBtn_block"
                }
              >
                {/* <h>{(lectureNum, lectures.length)}</h> */}
                {lectureNum + 1 != lectures.length ? (
                  <>
                    <li
                      onClick={nextLectureHandler}
                      data-for="nextLectureBtnHover"
                      data-tip
                    >
                      {/* <GrNext size={15} color="#ff614d" /> */}
                      <i
                        className="fa fa-angle-right fa-lg"
                        // style={{ color: "#f3f8f9" }}
                      ></i>
                    </li>
                    <ReactTooltip
                      id="nextLectureBtnHover"
                      getContent={(dataTip) => "다음 강의"}
                      // style={{ width: "20px" }}
                    />
                  </>
                ) : (
                  <>
                    <li
                      data-for="nextLectureBtnHover"
                      data-tip
                      // style={{ backgroundColor: "gray" }}
                    >
                      {/* <GrNext size={15} color="#808080" /> */}
                      <i
                        className="fa fa-angle-right fa-lg"
                        // style={{ color: "gray" }}
                      ></i>
                    </li>{" "}
                    <ReactTooltip
                      id="nextLectureBtnHover"
                      getContent={(dataTip) => "다음 강의"}
                      // style={{ width: "20px" }}
                    />
                  </>
                )}
              </ul>
            </span>
          </div>
        </div>{" "}
      </div>
      <Footer
        footerClass="rs-footer home9-style main-home"
        footerLogo={footerLogo}
      />
      <SearchModal />
    </React.Fragment>
  );
};

export default CourseContent;
