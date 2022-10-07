import React, { useEffect, useState } from "react";
import CourseSidebar from "./CourseSidebar";
import CurriculumPart from "./CurriculumPart";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import SetDropdown from "../../../components/Dropdown/SetDropdown";

function CourseDetailsPart() {
    const location = useLocation();
    const [userId, SetUserId] = useState("");

    const [classRoomData, setClassRoomData] = useState();
    const cid = useLocation().state.classId;
    const [clicked, setClicked] = useState(false);
    const [students, setStudents] = useState([{ userId: "", name: "", email: "" }]);
    const [takesData, setTakesData] = useState();
    const [waiting, setWaiting] = useState([]);
    const uid = location.state.userId;
    const [valid, setValid] = useState(false);
    //console.log("cid in detail part " + cid);
    const joinClass = () => {
        if (window.confirm("수강신청 하시겠습니까?")) {
            const fetchJoinClass = async () => {
                try {
                    let body = { userId: userId, classId: cid };
                    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/enroll`, JSON.stringify(body), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(response);
                    console.log(response.data);
                    setTakesData(response.data);
                    console.log("takesData: " + takesData);
                    // setTakesData(response.data);
                    // console.log(takesData);
                } catch (err) {
                    console.log("err >> ", err);
                }
            };
            // console.log(takesData);
            fetchJoinClass();
            alert("신청 되었습니다.");
            window.location.href = "/learntube/dashboard";
        }
    };

    useEffect(() => {
        if (location.state) {
            // console.log("uid", uid);
            {
                uid ? SetUserId(uid) : SetUserId(window.sessionStorage.getItem("userId"));
            }

            // console.log("userId", userId);
            if (userId) {
                //console.log(cid);
                const fetchClassRoom = async () => {
                    try {
                        const res1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom?userId=${userId}&classId=${cid}`);
                        const res2 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/students?classId=${cid}`);
                        const res3 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`);

                        console.log(res1.data);
                        setClassRoomData(res1.data);
                        setStudents(res2.data);
                        setWaiting(res3.data);
                        setValid(waiting.find((e) => e.userId == userId));
                        console.log(valid);
                        console.log("waiting:", waiting);
                    } catch (err) {
                        console.log("err >> ", err);
                    }
                };
                fetchClassRoom();
            }
        }
    }, [userId]);

    return (
        <React.Fragment>
            <div className="intro-section gray-bg pt-94 pb-100 md-pt-80 md-pb-80 loaded">
                <div className="container">
                    <h5>커리큘럼</h5>
                    {classRoomData ? (
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <h3>{classRoomData.className}</h3>
                                    <p>⇣ {classRoomData.classDescription}</p>
                                </div>
                            </div>
                            {classRoomData.instructor.userId == userId ? (
                                <div className="col">
                                    <SetDropdown classRoomData={classRoomData} students={students} userId={userId} />
                                    {/* <Link to="/learntube/course/course-single/manage">
                                        <Button style={{ float: "right", width: "8rem", minWidth: "6rem", marginRight: "1.5rem", marginTop: "3.15rem" }}>수강생 관리</Button>
                                    </Link> */}
                                </div>
                            ) : null}
                            {classRoomData.instructor.userId != userId && classRoomData.isTake === false ? (
                                <div className="col">
                                    {!valid ? (
                                        <Button id="joinBtn" className="" onClick={joinClass} style={{ float: "right", width: "8rem", minWidth: "6rem", marginRight: "1.5rem", marginTop: "3rem" }}>
                                            수강신청
                                        </Button>
                                    ) : (
                                        <Button
                                            id="joinBtn"
                                            className=""
                                            onClick={joinClass}
                                            style={{ float: "right", width: "8rem", minWidth: "6rem", marginRight: "1.5rem", marginTop: "3rem" }}
                                            disabled
                                        >
                                            대기중
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="col">
                                    {!valid ? (
                                        <Button id="joinBtn" className="" onClick={joinClass} style={{ float: "right", width: "8rem", minWidth: "6rem", marginRight: "1.5rem", marginTop: "3rem" }}>
                                            수강신청
                                        </Button>
                                    ) : (
                                        <Button
                                            id="joinBtn"
                                            className=""
                                            onClick={joinClass}
                                            style={{ float: "right", width: "8rem", minWidth: "6rem", marginRight: "1.5rem", marginTop: "3rem" }}
                                            disabled
                                        >
                                            대기중
                                        </Button>
                                    )}
                                </div>
                            )}

                            <div className="row clearfix">
                                <div className="col-lg-8 md-mb-50">
                                    <CurriculumPart classRoomData={classRoomData} userId={userId} />
                                </div>
                                <div className="video-column col-lg-4">
                                    <CourseSidebar classRoomData={classRoomData} students={students} userId={userId} />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
}

export default CourseDetailsPart;
