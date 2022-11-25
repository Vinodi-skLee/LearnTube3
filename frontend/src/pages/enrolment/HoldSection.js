import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import CourseDashBoard from "../../components/Courses/CourseDashBoard";
import { Spinner } from "react-bootstrap";

const HoldPart = (props) => {
    //const [takesData, setTakesData] = useState(null);
    const userId = window.sessionStorage.getItem("userId");
    const location = useLocation();
    // const [waitList, setWaitList] = useState();
    const [sidList, setSidList] = useState([]);
    const [rejectList, setRejectList] = useState([]);
    let cid = location.state.classId;
    const [hasReject, setHasReject] = useState(false);

    const [waitList, setWaitList] = useState([]);
    const [managedClassroom, setManagedClassroom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let index = 0;

    const acceptAll = async () => {
        let body = {
            classId: cid,
        };
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/accept-all`, JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        alert("모두 수락 완료!");
        window.location.reload();
    };

    const rejectAll = async () => {
        let body = {
            classId: cid,
        };
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/reject-all`, JSON.stringify(body), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        alert("모두 거절 완료!");
        window.location.reload();
    };

    const pressOkay = async () => {
        if (sidList.length != 0) {
            await Promise.all(
                sidList.map(async (sid) => {
                    let body = {
                        takeId: sid,
                    };
                    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/accept`, JSON.stringify(body), {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                })
            );
        }
        if (rejectList.length != 0) {
            await Promise.all(
                rejectList.map(async (sid) => {
                    let body = {
                        takeId: sid,
                    };
                    const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/reject`, JSON.stringify(body), {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                })
            );
        }
        window.location.reload();
    };

    const useConfirm = (message = "", onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            return;
        }
        const confirmAction = () => {
            if (window.confirm(message)) onConfirm();
            else onCancel();
            return;
        };
        return confirmAction;
    };

    const cancelOkay = () => {
        alert("취소되었습니다");
    };
    const confirmDelete = useConfirm("거절하시겠습니까?", pressOkay, cancelOkay);
    const confirmDeleteAll = useConfirm("모두 거절하시겠습니까?", rejectAll, cancelOkay);

    const fetchManagesClassRoom = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${userId}`);
            // await setManagedClassroom(response.data);
            // console.log(response.data);
            for (const prop in response.data) {
                managedClassroom[prop] = response.data[prop];
            }
            // console.log(managedClassroom);
        } catch (err) {
            console.log("err >> ", err);
        }
    };

    const fetchWaitList = async (cid) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`);
            for (const prop in response.data) {
                waitList[index] = response.data[prop];
                waitList[index]["classId"] = cid;
                index++;
            }
        } catch (err) {
            console.log("err > ", err);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchManagesClassRoom();
            // console.log(managedClassroom);
            setTimeout(() => {
                if (managedClassroom) {
                    managedClassroom.map((classroom) => {
                        // console.log(classroom);
                        fetchWaitList(classroom.classId).then(() => {
                            // console.log(waitList);
                        });
                    });
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                }
            }, 300);
        }
    }, [userId]);

    const acceptCheckboxHandler = (e) => {
        if (sidList.includes(e.target.value)) {
            e.preventDefault();
        } else {
            if (rejectList.includes(e.target.value)) {
                const idx = rejectList.indexOf(e.target.value);
                if (idx > -1) rejectList.splice(idx, 1);
            }
            if (!rejectList.length) setHasReject(false);
            else setHasReject(true);
            sidList.push(e.target.value);
        }
        // console.log("sidList: ", sidList);
        // console.log("rejectList", rejectList);
    };
    const rejectCheckboxHandler = (e) => {
        if (rejectList.includes(e.target.value)) {
            e.preventDefault();
        } else {
            if (sidList.includes(e.target.value)) {
                const idx = sidList.indexOf(e.target.value);
                if (idx > -1) sidList.splice(idx, 1);
            }
            rejectList.push(e.target.value);
            if (!rejectList.length) setHasReject(false);
            else setHasReject(true);
        }
        // console.log("rejectList: ", rejectList);
        // console.log("sidList: ", sidList);
    };

    return (
        <div id="rs-popular-course" className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog white-bg pb-100 md-pt-70 md-pb-80 text-start">
            {isLoading ? (
                <div class="text-center" style={{ marginTop: "10%", height: "30rem" }}>
                    <Spinner animation="grow" variant="secondary" style={{ width: "10rem", height: "10rem" }} />
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="pr-50 md-pr-14">
                            <div style={{ margin: "15px" }}></div>
                            <Table
                                bordered
                                hover
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>강의실</th>
                                        <th>이름</th>
                                        <th>이메일</th>
                                        <th>허락</th>
                                        <th>거절</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waitList
                                        ? // 여기에 리스트 꾸며줘
                                          waitList.map((waiting) => (
                                              <tr>
                                                  {managedClassroom.map((classroom) => {
                                                      // console.log(waiting);
                                                      if (waiting.classId === classroom.classId) return <td>{classroom.className}</td>;
                                                  })}
                                                  <td>{waiting.username}</td>
                                                  <td>{waiting.email}</td>
                                                  <td>
                                                      <input type="radio" name={waiting.userId} onClick={acceptCheckboxHandler} value={waiting.takeId} />
                                                  </td>
                                                  <td>
                                                      <input type="radio" name={waiting.userId} onClick={rejectCheckboxHandler} value={waiting.takeId} />
                                                  </td>
                                              </tr>
                                          ))
                                        : null}
                                </tbody>
                            </Table>
                            <div>
                                <Button onClick={acceptAll} style={{ marginRight: "10px", background: "#7cbdb5" }}>
                                    모두 허락
                                </Button>
                                <Button variant="secondary" style={{ background: "#ff7d4b" }} onClick={confirmDeleteAll} active>
                                    모두 거절
                                </Button>
                                {!hasReject ? (
                                    <Button
                                        style={{
                                            float: "right",
                                            background: "#273857",
                                        }}
                                        onClick={pressOkay}
                                    >
                                        확인
                                    </Button>
                                ) : (
                                    <Button
                                        style={{
                                            float: "right",
                                            background: "#273857",
                                        }}
                                        onClick={confirmDelete}
                                    >
                                        확인
                                    </Button>
                                )}
                            </div>
                            <div className="pagination-area orange-color text-center mt-30 md-mt-0">
                                {/* <ul className="pagination-part">
                <li className="active">
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">2</Link>
                </li>
                <li>
                  <Link to="#">
                    Next <i className="fa fa-long-arrow-right"></i>
                  </Link>
                </li>
              </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HoldPart;
