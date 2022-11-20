import React, { useEffect, useState } from "react";
import CourseSidebar from "./CourseSidebar";
import CurriculumPart from "./CurriculumPart";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import SetDropdown from "../../../components/Dropdown/SetDropdown";
import { Spinner } from "react-bootstrap";

function CourseDetailsPart() {
    const location = useLocation();
    const [userId, SetUserId] = useState("");

    const [classRoomData, setClassRoomData] = useState();
    const cid = useLocation().state.classId;
    const [clicked, setClicked] = useState(false);
    const [students, setStudents] = useState([{ userId: "", name: "", email: "" }]);
    const [takesData, setTakesData] = useState();
    const [waiting, setWaiting] = useState([]);
    // const uid = location.state.userId;
    const [isWaiting, setIsWaiting] = useState(false);
    // console.log("uid", uid);
    console.log("userId", userId);
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
            // window.location.href = "/learntube/dashboard-main";
            window.location.reload();
        }
    };

    useEffect(() => {
        if (location.state) {
            // console.log("uid", uid);
            {
                userId ? SetUserId(userId) : SetUserId(window.sessionStorage.getItem("userId"));
            }

            // console.log("userId", userId);
            if (userId) {
                console.log("cid: " + cid);
                const fetchClassRoom = async () => {
                    try {
                        const res1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom?userId=${userId}&classId=${cid}`);
                        const res2 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/students?classId=${cid}`);
                        const res3 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`);
                        console.log("data ?? ");
                        console.log(res1.data);
                        setClassRoomData(res1.data);
                        console.log(res2.data);
                        setStudents(res2.data);
                        console.log(res3.data);
                        setWaiting(res3.data);
                        for (const prop in res3.data) {
                            waiting[prop] = res3.data[prop];
                            if (res3.data[prop].userId == userId) setIsWaiting(true);
                        }
                        // waiting.map((data) => {
                        //   console.log(data.userId);
                        //   console.log(userId);
                        //   if(data.userId == userId)
                        //     setValid(true);
                        // });
                        // console.log("valid? " + valid);
                        console.log("waiting: " + waiting);
                    } catch (err) {
                        console.log("err >> " + err);
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
                                <div className="row" style={{ width: "50vw" }}>
                                    <h3>{classRoomData.className}</h3>
                                    <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>⇣ {classRoomData.classDescription}</p>
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
                            {classRoomData.instructor.userId != userId && classRoomData.isTake === false && !isWaiting ? (
                                <div className="col">
                                    <Button
                                        id="joinBtn"
                                        className=""
                                        onClick={joinClass}
                                        style={{
                                            float: "right",
                                            width: "8rem",
                                            minWidth: "6rem",
                                            marginRight: "1.5rem",
                                            marginTop: "3rem",
                                            background: "#ff7d4b",
                                        }}
                                    >
                                        수강신청
                                    </Button>
                                </div>
                            ) : isWaiting ? (
                                <Button
                                    style={{
                                        float: "right",
                                        width: "10rem",
                                        height: "50px",
                                        marginRight: "40px",
                                        marginTop: "50px",
                                        background: "#273857",
                                    }}
                                >
                                    수강 대기중
                                </Button>
                            ) : null}
                            <div className="row clearfix">
                                <div className="col-lg-8 md-mb-50">
                                    <CurriculumPart classRoomData={classRoomData} userId={userId} isWaiting={isWaiting} />
                                </div>
                                <div className="video-column col-lg-4">
                                    <CourseSidebar classRoomData={classRoomData} students={students} userId={userId} />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        <div class="text-center" style={{ marginTop: "10%", height: "30rem" }}>
                            <Spinner animation="grow" variant="secondary" style={{ width: "10rem", height: "10rem" }} />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default CourseDetailsPart;
