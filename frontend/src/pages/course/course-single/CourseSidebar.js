import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/img/logo/img-background.png";
import { ProgressBar } from "react-bootstrap";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";

const CourseSidebar = (props) => {
    const [visible, setVisible] = useState(false);
    const [accepted, setAccepted] = useState([]);
    const [progress, setProgress] = useState(0);
    const userId = props.userId;

    const cid = props.classRoomData.classId;

    const location = useLocation();

    useEffect(() => {
        //console.log(cid);
        const fetchAcceptedUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/accepted-list?classId=${cid}`);

                // console.log("accepted: ", res.data);
                setAccepted(res.data);
            } catch (err) {
                console.log("err >> ", err);
            }
        };
        fetchAcceptedUser();
    }, [cid]);

    return (
        <>
            <div className="inner-column">
                {props.classRoomData.image ? (
                    <img src={props.classRoomData.image} />
                ) : (
                    <div
                        className="course-features-info"
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url(${logo})`,
                            width: "auto",
                            height: "auto",
                            borderRadius: "5px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "275px",
                                height: "170px",
                                lineHeight: "170px",
                                textAlign: "center",
                                color: "#404040",
                                fontWeight: "bold",
                                fontSize: "18px",
                                fontFamily: "Nunito, sans-serif;",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {props.classRoomData.className}
                        </span>
                    </div>
                )}
                <div className="course-features-info">
                    <ul>
                        <li className="lectures-feature">
                            <i className="fa fa-user"></i>
                            <span className="label">Instructor</span>
                            <span className="value">{props.classRoomData.instructor.name}</span>
                        </li>
                        <li className="lectures-feature">
                            <i className="fa fa-files-o"></i>
                            <span className="label">Lectures</span>
                            <span className="value">{props.classRoomData.lectures.length}</span>
                        </li>
                        <li
                            className="students-feature"
                            onClick={() => {
                                setVisible(!visible);
                                // console.log(visible);
                                // console.log("userId", userId);
                                // console.log("props.userId", props.classRoomData.instructor.userId);
                            }}
                        >
                            <i className="fa fa-users"></i>
                            <span className="label">
                                Students
                                {props.classRoomData.instructor.userId === parseInt(userId) ? <i className="fa fa-angle-down" role="button" Style="font-size:20px; padding-left:4px;"></i> : null}
                            </span>

                            <span className="value">{accepted.length}</span>
                        </li>

                        {visible === true && props.classRoomData.instructor.userId === parseInt(userId) ? (
                            <div className="p-2 pt-0 mt-4" style={{ border: "solid 2px", borderRadius: "10px", borderColor: "#273857", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <span className="d-flex flex-fill bd-highlight" style={{ fontSize: "13px" }}>
                                    <li>No</li>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <li>Name</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <li>Email</li>
                                    {/* <li>Email</li> */}
                                </span>
                                <hr className="p-0 m-0"></hr>
                                {props.students
                                    ? props.students.map((students, i) => (
                                          <span className="d-flex flex-fill bd-highlight" style={{ fontSize: "13px" }}>
                                              &nbsp;<li>{i + 1}</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <li>{props.students[i].name}</li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <li style={{ width: "130px" }}>{props.students[i].email}</li>
                                          </span>
                                      ))
                                    : null}
                            </div>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CourseSidebar;
