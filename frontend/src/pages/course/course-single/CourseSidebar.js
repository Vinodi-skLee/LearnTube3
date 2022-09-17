import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";

const CourseSidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);
    const [classRoomData, setClassRoomData] = useState();
    const [managesData, setManagesData] = useState(null);

    const [visible, setVisible] = useState(false);
    const { userId } = props;

    const user = window.sessionStorage.getItem("userId");

    const initUpdateClassRoomData = {
        classId: props.classRoomData.classId,
        instructorId: userId,
        className: props.classRoomData.className,
        classDescription: props.classRoomData.classDescription,
        closeDate: props.classRoomData.closeDate,
        entryCode: props.classRoomData.entryCode,
        isOpened: props.classRoomData.isOpened,
        isActive: props.classRoomData.isActive,
        image: props.classRoomData.image,
    };
    const [updateClassRoomData, setUpdateClassRoomData] = useState(initUpdateClassRoomData);

    useEffect(() => {
        // console.log("sidebar : ", props.classRoomData);
        // console.log("side student: ", props.students);
    }, [userId]);

    const handleChange = (e) => {
        if(e.target.value !== null){
            setUpdateClassRoomData({
                ...updateClassRoomData,
                [e.target.name]: e.target.value,
                instructionId: userId,
            });
        }
        console.log(updateClassRoomData);
    };

    const handleSubmit = async () => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/update`, JSON.stringify(updateClassRoomData), {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        openModal();
        window.location.reload();
        alert('강의실 정보가 업데이트 되었습니다.');
    };

    const onDelete = () => {
        if(window.confirm('강의실을 삭제하시겠습니까?')){
            deleteClassroom();
        }
        else{
            return;
        }
    }

    const deleteClassroom = async () => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/delete`, JSON.stringify(updateClassRoomData), {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
        window.location.href=`${process.env.REACT_APP_REDIRECT_URL}`
        alert('강의실이 삭제되었습니다');
    };  

    return (
        <>
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
                        backgroundColor: "rgb(0, 0, 0, 0.55)",
                    },
                    content: {
                        position: "absolute",
                        top: "15%",
                        left: "25%",
                        right: "25%",
                        bottom: "10%",
                        background: "#fff",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        outline: "none",
                        padding: "0px",
                        height: "80%",
                    },
                }}
            >
                <div>
                    <div className="register-section w-100 h-100">
                        <div className="container">
                            <div className="py-3 px-5">
                                <div className="sec-title text-center mb-10">
                                    <h4 className="title mt-3 mb-10">강의실 수정</h4>
                                </div>
                                <div className="styled-form">
                                    <div id="form-messages"></div>

                                    <form id="contact-form">
                                        <div className="row clearfix">
                                            <div className="form-group col-lg-12 mb-25">
                                                <div className="my-2">
                                                    강의실 이름
                                                </div>
                                                <input type="text" id="className" name="className" placeholder={props.classRoomData.className} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <div className="my-2">
                                                    강의실 설명
                                                </div>
                                                <textarea
                                                    type="textarea"
                                                    id="classDescription"
                                                    name="classDescription"
                                                    placeholder={props.classRoomData.classDescription}
                                                    onChange={handleChange}
                                                    style={{
                                                        position: "relative",
                                                        borderRadius: "0px",
                                                        padding: "6px 30px",
                                                        width: "100%",
                                                        color: "#222222",
                                                        fontSize: "16px",
                                                        transition: "all 500ms ease",
                                                        border: "none",
                                                        boxShadow: "0 0 30px #eee",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-lg-12 mb-25">
                                            <div className="my-2">
                                                강의실 이미지
                                            </div>
                                            {
                                                props.classRoomData.image === null ?
                                                (
                                                    <input type="text" id="image" name="image" placeholder={props.classRoomData.image} onChange={handleChange}/>
                                                )
                                                :
                                                (
                                                    <input type="text" id="image" name="image" placeholder="이미지 링크를 입력해 주세요." onChange={handleChange}/>
                                                )
                                            }
                                        </div>
                                        <div className="form-group col-lg-12">
                                            <div className="my-2">
                                                강의실 마감일
                                            </div>
                                            <input type="datetime-local" id="closeDate" name="closeDate" onChange={handleChange}/>
                                        </div>

                                        <div className="row d-flex justify-content-end ms-3 me-1 mt-10">
                                            <Button
                                                className="col-2 btn-secondary btn-sm"
                                                onClick={() => {
                                                    openModal();
                                                }}
                                            >
                                                취소
                                            </Button>
                                            <Button className="ml-10 col-2 btn-sm" onClick={handleSubmit}>
                                                저장
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        <div>
        {props.classRoomData.instructor.userId === parseInt(userId) 
    ?   (<div className="row mb-20">
            <div className="d-grid col-6 mx-auto">
                <Button
                    onClick={openModal}
                    style={{ backgroundColor: "#6483d8" }}
            >
                강의실 수정
                </Button>
            </div>
            <div className="d-grid col-6 mx-auto">
                <Button
                    onClick={() => {
                    onDelete();
                }}
                    style={{ backgroundColor: "#6483d8" }}
                    >
                강의실 삭제
                </Button>
            </div>
        </div>)
        : null}
        </div>
        <div className="inner-column">
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

                    {/* <li className="duration-feature">
            <i className="fa fa-clock-o"></i>
            <span className="label">Duration</span>
            <span className="value">10 week </span>
          </li> */}

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
                    {props.classRoomData.instructor.userId === parseInt(userId) ? (
                        <>
                            {visible ? (
                                <div className=" p-2 rounded bg-light">
                                    <span className="d-flex flex-fill bd-highlight">
                                        <li>#</li>&nbsp;&nbsp;&nbsp;
                                        <li>Name</li>
                                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <li>Email</li> */}
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
                        </>
                    ) : null}
                </ul>
            </div>
        </div>
        </>
    );
};

export default CourseSidebar;
