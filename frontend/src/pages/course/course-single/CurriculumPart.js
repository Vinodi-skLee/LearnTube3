import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import ModalVideo from "react-modal-video";
import Modal from "react-modal";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import UpdateContent from "../../../components/Modal/Content/UpdateContent";
import CreateContent from "../../../components/Modal/Content/CreateContent";
import CreateNotice from "../../../components/Modal/CreateNotice";
import UpdateNotice from "../../../components/Modal/UpdateNotice";
import DeleteNotice from "../../../components/Modal/DeleteNotice";
import NoticeCard from "./NoticeCard";
import NoticePagenation from "./NoticePagenation";

const CurriculumPart = (props) => {
    Modal.setAppElement("body");
    const userId = parseInt(window.sessionStorage.getItem("userId"));
    // console.log("curi userID", userId);
    const instructor_id = props.classRoomData.instructor.userId;

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);

    const [isViewOpen, setViewOpen] = useState(false);
    const openView = () => setViewOpen(!isViewOpen);

    const [noticeIdx, setNoticeIdx] = useState(0);

    const [showMore, setShowMore] = useState(false);
    const [contentVideoNum, setContentVideoNum] = useState({});

    let notices = props.classRoomData.notices;
    let history = useHistory();

    console.log("isTakeCheck? " + props.classRoomData.isTake);
    console.log("isWaiting? " + props.isWaiting);

    const isTakeCheck = (e) => {
        if ((props.isWaiting == true || props.classRoomData.isTake === false)&& props.classRoomData.instructor.userId != userId) {
            alert("수강 신청이 필요합니다. ");
            e.preventDefault(); //to prevent the Link to action
        }
    };

    const clickModalHandler = (params) => {
        if ((props.isWaiting == true || props.classRoomData.isTake === false) && props.classRoomData.instructor.userId != userId) {
            alert("수강 신청이 필요합니다. ");
            setIsOpen(isOpen);
            return;
        } else {
            console.log(params);
            setNoticeIdx(params);
            console.log(noticeIdx);
        }
    };

    useEffect(() => {
        const fetchContentData = async (contentId) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/content?contentId=${contentId}`);
                console.log(res.data);
                if(res.data){
                    res.data.playlist ? contentVideoNum[contentId] = res.data.playlist.videos.length : contentVideoNum[contentId] = 0;
                    setContentVideoNum({...contentVideoNum}, contentVideoNum[contentId]);
                    // console.log(contentData);
                }
            } catch (err) {
                console.log("err >> ", err);
            }
        };
        props.classRoomData.lectures.map((lecture) => {
            lecture.contents.map((content) => {
                fetchContentData(content.contentId);
            })
        })
        console.log(contentVideoNum);
    }, []);
    

    const createLecture = async (e) => {
        let body = {
            classId: e,
        };
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/lecture`, JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        alert("생성 완료");
        window.location.reload();
    };

    const deleteLecture = async (e) => {
        let body = {
            lectureId: e,
        };
        if (window.confirm("강의가 삭제됩니다. 정말 삭제하시겠습니까? (ex.1강)") == true) {
            const response = await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/lecture/delete`, JSON.stringify(body), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => console.log(res));
            alert("삭제되었습니다.");
            window.location.reload();
        } else {
            return false;
        }
    };
    const deleteContent = async (e) => {
        let body = {
            contentId: e,
        };
        if (window.confirm("강의 차수 내에 콘텐츠가 삭제됩니다. 정말 삭제하시겠습니까?") == true) {
            const response = await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/content/delete`, JSON.stringify(body), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => console.log(res));
            window.location.reload();
        }
    };

    const getDateDiff = (date) => {
        let today = new Date();
        let year = today.getFullYear();
        let month = ("0" + (1 + today.getMonth())).slice(-2);
        let day = ("0" + today.getDate()).slice(-2);

        let secondDate = year + month + day;
        let firstDate = date.split("-").join("");
        var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
        var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
        var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());

        let result = Math.floor(betweenTime / (1000 * 60 * 60 * 24));
        if (result > 7) return "";
        else return "New";
    };

    const toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;

        var total = "";

        if(hours != 0){
            total += hours;
            if(minutes < 10)
                total += ":0" + minutes;
            else
                total += ":" + minutes;
            if(seconds < 10)
                total += ":0" + seconds;
            else
                total += ":" + seconds;
        }
        else if(minutes != 0){
            total += minutes;
            if(seconds < 10)
                total += ":0" + seconds;
            else
                total += ":" + seconds;
        }
        else total += seconds;

        return total;

        // return [hours, minutes, seconds]
        //     .map((v, i) => (i != 0 && v < 10 ? "0" + v : v))
        //     .filter((v, i) => v !== "00" || i > 0)
        //     .join(":");
    };

    const [noticeState, setNoticeState] = useState({
        start: 0,
        end: 3,
    });

    const [count, setCount] = useState(notices.length); //아이템 총 개수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(3); //페이지당 아이템 개수
    const [isLoading, setIsLoading] = useState(false);
    const [indexOfLastPost, setIndexOfLastPost] = useState(currentpage * postPerPage);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(indexOfLastPost - postPerPage);
    const setPage = (e) => {
        console.log("e " + e);
        setNoticeState({
            start: e * 3 - 3,
            end: e * 3,
        });
        setNoticeIdx(0);
        console.log("start" + noticeState.start);
        console.log("end" + noticeState.end);
        if (!isLoading) setIsLoading(true);
        else setIsLoading(false);
        setCurrentpage(e);
    };

    return (
        <>
            {props.classRoomData ? (
                <div className="content">
                    <Accordion className="accordion-box" preExpanded={"a"}>
                        <AccordionItem className="accordion-item" uuid="a">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    <button
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div style={{ display: "flex", marginRight: "25px" }}>공지</div>
                                        {props.classRoomData.instructor.userId === userId ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginRight: "25px",
                                                }}
                                            >
                                                <div>
                                                    <CreateNotice instructorId={props.classRoomData.instructor.userId} classId={props.classRoomData.classId} userId={userId} />
                                                </div>
                                                {/* <span
                                                    onClick={() => {
                                                        openView();
                                                    }}
                                                >
                                                    <i
                                                        className="fa fa-bars"
                                                        style={{
                                                            padding: "5px",
                                                            zIndex: "0",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </span> */}
                                            </div>
                                        ) : null}

                                        {/* create show more button here */}

                                        {/* <Modal
                                            isOpen={isViewOpen}
                                            onClose={() => {
                                                openView();
                                            }}
                                            onRequestClose={() => setViewOpen(false)}
                                            style={{
                                                overlay: {
                                                    zIndex: "100",
                                                    position: "fixed",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundColor: "rgb(0, 0, 0, 0.20)",
                                                },
                                                content: {
                                                    position: "absolute",
                                                    top: "10%",
                                                    left: "25%",
                                                    right: "25%",
                                                    bottom: "10%",
                                                    background: "#fff",
                                                    overflowX: "hidden",
                                                    overflowY: "scroll",
                                                    WebkitOverflowScrolling: "touch",
                                                    outline: "none",
                                                    padding: "0px",
                                                },
                                            }}
                                        >
                                            <div className="container">
                                                <div className="py-3 px-5">
                                                    <div className="sec-title text-center mb-10">
                                                        <h3 className="title">전체공지</h3>
                                                        <hr></hr>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ paddingTop: "10px" }}>
                                                {Array.isArray(notices)
                                                    ? notices.map((notices, i) => (
                                                          <Table>
                                                              <NoticeCard notices={notices} i={i} notice={props.classRoomData.notices[i]} instructorId={instructor_id} userId={userId} />
                                                          </Table>
                                                      ))
                                                    : null}
                                            </div>
                                        </Modal> */}
                                    </button>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="card-body acc-content current">
                                {Array.isArray(notices)
                                    ? notices.slice(noticeState.start, noticeState.end).map((notices, i) => (
                                          <div className="content">
                                              {/* {showMore ? notices: props.classRoomData.notices.slice(3)} */}

                                              <div className="clearfix">
                                                  {/* 공지 모달 open */}
                                                  <Modal
                                                      isOpen={isOpen}
                                                      onClose={() => {
                                                          openModal();
                                                      }}
                                                      onRequestClose={() => setIsOpen(false)}
                                                      style={{
                                                          overlay: {
                                                              zIndex: "100",
                                                              position: "fixed",
                                                              top: 0,
                                                              left: 0,
                                                              right: 0,
                                                              bottom: 0,
                                                              backgroundColor: "rgb(0, 0, 0, 0.20)",
                                                          },
                                                          content: {
                                                              position: "absolute",
                                                              top: "20%",
                                                              left: "30%",
                                                              right: "30%",
                                                              bottom: "20%",
                                                              background: "#fff",
                                                              overflow: "auto",
                                                              WebkitOverflowScrolling: "touch",
                                                              outline: "none",
                                                              padding: "0px",
                                                          },
                                                      }}
                                                  >
                                                      <div className="">
                                                          <div className="register-section ">
                                                              <div className="container">
                                                                  <div className="py-3 px-5">
                                                                      <div className="sec-title text-center mb-10" style={{ paddingBottom: "0.7rem" }}>
                                                                          <h3 className="title mt-3 mb-10">Notice</h3>
                                                                          <hr></hr>
                                                                      </div>
                                                                      <div className="styled-form">
                                                                          <div id="form-messages"></div>
                                                                          <form id="contact-form" method="post" action="#">
                                                                              <div className="row clearfix">
                                                                                  <div
                                                                                      className="title mt-3 mb-10"
                                                                                      style={{
                                                                                          fontSize: "20px",
                                                                                          fontWeight: "bold",
                                                                                          paddingBottom: "1rem",
                                                                                      }}
                                                                                  >
                                                                                      {props.classRoomData.notices[noticeIdx + noticeState.start].title}
                                                                                  </div>
                                                                                  <div className="form-group col-lg-12 mb-25" style={{ paddingBottom: "3rem" }}>
                                                                                      <div className="my-2" style={{ fontSize: "17px" }}>
                                                                                          {props.classRoomData.notices[noticeIdx + noticeState.start].content}
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              <br></br>
                                                                              <p className="text-muted">
                                                                                  최종 업로드:
                                                                                  {props.classRoomData.notices[noticeIdx + noticeState.start].modDate.split("T")[0] +
                                                                                      " " +
                                                                                      props.classRoomData.notices[noticeIdx + noticeState.start].modDate.split("T")[1].split(":")[0] +
                                                                                      ":" +
                                                                                      props.classRoomData.notices[noticeIdx + noticeState.start].modDate.split("T")[1].split(":")[1]}
                                                                              </p>
                                                                              <hr></hr>
                                                                              <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                                                                  <button
                                                                                      type="button"
                                                                                      className="createbtn text-center pt-2"
                                                                                      onClick={() => {
                                                                                          openModal();
                                                                                      }}
                                                                                  >
                                                                                      <span className="txt">확인</span>
                                                                                  </button>
                                                                              </div>
                                                                          </form>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </Modal>
                                                  <div
                                                      className="pull-left popup-videos play-icon "
                                                      key={props.classRoomData.notices[i + noticeState.start].id}
                                                      onClick={() => {
                                                          openModal();
                                                          clickModalHandler(i);
                                                      }}
                                                  >
                                                      {getDateDiff(props.classRoomData.notices[i + noticeState.start].modDate.split("T")[0]) === "New" ? (
                                                          <i className="fa" style={{ zIndex: "0", paddingRight: "3px" }}>
                                                              <span
                                                                  style={{
                                                                      fontWeight: "bold",
                                                                      fontSize: "13px",
                                                                      color: "#ff614d",
                                                                  }}
                                                              >
                                                                  NEW
                                                              </span>
                                                          </i>
                                                      ) : (
                                                          <i className="fa fa-list" style={{ zIndex: "0", paddingRight: "3px" }} />
                                                      )}
                                                      {props.classRoomData.notices[i + noticeState.start].title}
                                                  </div>
                                                  <div className="pull-right">
                                                      <div className="minutes">
                                                          {props.classRoomData.instructor.userId === userId ? (
                                                              <div
                                                                  style={{
                                                                      display: "flex",
                                                                  }}
                                                              >
                                                                  <span>
                                                                      <UpdateNotice
                                                                          notice={props.classRoomData.notices[i + noticeState.start]}
                                                                          instructorId={props.classRoomData.instructor.userId}
                                                                          userId={userId}
                                                                      />
                                                                  </span>
                                                                  <span>
                                                                      <DeleteNotice
                                                                          notices={props.classRoomData.notices}
                                                                          instructorId={props.classRoomData.instructor.userId}
                                                                          i={i + noticeState.start}
                                                                          userId={userId}
                                                                      />
                                                                  </span>
                                                              </div>
                                                          ) : null}
                                                      </div>
                                                  </div>
                                                  <div className="pull-right">
                                                      <div
                                                          className="minutes"
                                                          style={{
                                                              paddingTop: "10px",
                                                              paddingRight: "15px",
                                                          }}
                                                      >
                                                          {props.classRoomData.notices[i + noticeState.start].modDate.split("T")[0]}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                    : null}
                                {count > 3 ? <NoticePagenation page={currentpage} count={count} setPage={setPage} /> : <></>}
                            </AccordionItemPanel>
                        </AccordionItem>
                        {/* 강의 */}
                        {props.classRoomData.instructor.userId === userId ? (
                            <div style={{ marginTop: "20px", marginBottom: "90px" }}>
                                <div className="pull-right">
                                    <Button
                                        onClick={() => {
                                            createLecture(props.classRoomData.classId);
                                        }}
                                        style={{ backgroundColor: "#273857" }}
                                    >
                                        섹션 추가
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                        {Array.isArray(props.classRoomData.lectures)
                            ? props.classRoomData.lectures.map((lectures, i) => (
                                  <AccordionItem className="accordion-item">
                                      <AccordionItemHeading>
                                          <AccordionItemButton>
                                              <button
                                                  style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent: "space-between",
                                                  }}
                                              >
                                                  <div style={{ display: "flex", marginRight: "25px" }}>{props.classRoomData.lectures[i].lectureNum}강</div>
                                                  {props.classRoomData.instructor.userId === userId ? (
                                                      <div
                                                          style={{
                                                              display: "flex",
                                                              alignItems: "center",
                                                              marginRight: "25px",
                                                          }}
                                                      >
                                                          <div>
                                                              <CreateContent lectureId={props.classRoomData.lectures[i].lectureId} classId={props.classRoomData.classId} userId={userId} />
                                                          </div>
                                                          <span
                                                              onClick={() => {
                                                                  deleteLecture(props.classRoomData.lectures[i].lectureId);
                                                              }}
                                                          >
                                                              <i
                                                                  className="fa fa-trash"
                                                                  style={{
                                                                      padding: "5px",
                                                                      zIndex: "0",
                                                                      cursor: "pointer",
                                                                  }}
                                                              />
                                                          </span>
                                                      </div>
                                                  ) : null}
                                              </button>
                                          </AccordionItemButton>
                                      </AccordionItemHeading>
                                      <AccordionItemPanel className="card-body acc-content">
                                          {Array.isArray(props.classRoomData.lectures)
                                              ? props.classRoomData.lectures[i].contents.map((contents, j) => (
                                                <>
                                                    <div className="content">
                                                        <div className="clearfix">
                                                            <div className="pull-left">
                                                                <Link
                                                                    className="popup-videos play-icon"
                                                                    to={{
                                                                        pathname: "/learntube/content",
                                                                        state: {
                                                                            lectures: lectures,
                                                                            classRoomData: props.classRoomData,
                                                                            i: i,
                                                                            j: j,
                                                                        },
                                                                    }}
                                                                    onClick={isTakeCheck}
                                                                >
                                                                    <i className="fa fa-play"></i>
                                                                    {contents.contentName}
                                                                </Link>
                                                            </div>
                                                            <div className="pull-right">
                                                                <div
                                                                    className="minutes"
                                                                    style={{
                                                                        paddingTop: "10px",
                                                                    }}
                                                                >
                                                                    {contents.closeDate ? (
                                                                        <>
                                                                            <span>영상 {contentVideoNum[props.classRoomData.lectures[i].contents[j].contentId]}개 | </span>
                                                                            {
                                                                                contents.playlistDuration
                                                                                    ? toHHMMSS(contents.playlistDuration)
                                                                                    : "-"
                                                                                /* 마감일:
                                                                            {props.classRoomData.lectures[i].contents[j].closeDate.split("T")[0] +
                                                                                " " +
                                                                                props.classRoomData.lectures[i].contents[j].closeDate.split("T")[1].split(":")[0] +
                                                                                ":" +
                                                                                props.classRoomData.lectures[i].contents[j].closeDate.split("T")[1].split(":")[1]} */
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                    {props.classRoomData.instructor.userId === userId ? (
                                                                        <>
                                                                            <div className="pull-right">
                                                                                <span
                                                                                    onClick={() => {
                                                                                        deleteContent(props.classRoomData.lectures[i].contents[j].contentId);
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        className="fa fa-trash"
                                                                                        style={{
                                                                                            padding: "5px",
                                                                                            zIndex: "0",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                    ></i>
                                                                                </span>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <UpdateContent content={props.classRoomData.lectures[i].contents[j]} userId={userId} />
                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </>
                                                ))
                                              : null}
                                      </AccordionItemPanel>
                                  </AccordionItem>
                              ))
                            : null}
                    </Accordion>
                </div>
            ) : null}
        </>
    );
};

export default CurriculumPart;
