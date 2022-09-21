import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/logo/img-background.png";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";

const CourseSidebar = (props) => {
    const [visible, setVisible] = useState(false);
    const { userId } = props.userId;

    useEffect(() => {
        // console.log("sidebar : ", props.classRoomData);
        // console.log("side student: ", props.students);
    }, [userId]);

    return (
        <>
            <div className="inner-column">
                {props.classRoomData.image ? (
                    <img src={props.classRoomData.image} />
                ) : (
                    <div className="course-features-info" style={{ backgroundSize: "cover", backgroundImage: `url(${logo})`, width: "auto", height: "auto", borderRadius: "5px" }}>
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
                            }}
                        >
                            <i className="fa fa-users"></i>
                            <span className="label">
                                Students
                                {props.classRoomData.instructor.userId === parseInt(userId) ? <i className="fa fa-angle-down" role="button" Style="font-size:20px; padding-left:4px;"></i> : null}
                            </span>

                            <span className="value">{props.classRoomData.takeNum}</span>
                        </li>

                        {visible === true && props.classRoomData.instructor.userId === parseInt(userId) ? (
                            <div className=" p-2 rounded bg-light">
                                <span className="d-flex flex-fill bd-highlight">
                                    <li>#</li>&nbsp;&nbsp;&nbsp;
                                    <li>Name</li>
                                    {/* <li>Email</li> */}
                                </span>
                                {props.students
                                    ? props.students.map((students, i) => (
                                          <span className="d-flex flex-fill bd-highlight">
                                              <li>{i + 1}</li>&nbsp;&nbsp;&nbsp;&nbsp;
                                              <li>{props.students[i].name}</li>
                                              <li className="ms-auto bd-highlight"></li>
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
