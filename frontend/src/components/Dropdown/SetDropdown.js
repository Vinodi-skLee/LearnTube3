import React, { Component, useEffect, useState, useRef } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";
import "../../assets/css/dropdown.css";
import setIcon from "../../assets/img/icon/settingIcon.png";
import { useHistory } from "react-router-dom";

export default function SetDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { userId } = props.userId;
    const history = useHistory();
    const user = window.sessionStorage.getItem("userId");
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const useClick = () => setIsActive(!isActive);
    const openModal = () => setIsOpen(!isOpen);

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

    useEffect(() => {}, [userId]);

    const useDetectOutsideClick = (el, initialState) => {
        const [isActive, setIsActive] = useState(initialState);
        useEffect(() => {
            const pageClickEvent = (e) => {
                if (el.current !== null && !el.current.contains(e.target)) {
                    setIsActive(!isActive);
                }
            };
            if (isActive) {
                window.addEventListener("click", pageClickEvent);
            }
            return () => {
                window.removeEventListener("click", pageClickEvent);
            };
        }, [isActive, setIsActive]);
    };

    const handleChange = (e) => {
        if (e.target.value !== null) {
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
        alert("강의실 정보가 업데이트 되었습니다.");
    };

    const onDelete = () => {
        if (window.confirm("강의실을 삭제하시겠습니까?")) {
            deleteClassroom();
        } else {
            return;
        }
    };

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
        window.location.href = `${process.env.REACT_APP_REDIRECT_URL}`;
        alert("강의실이 삭제되었습니다");
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
                                                <div className="my-2">강의실 이름</div>
                                                <input type="text" id="className" name="className" placeholder={props.classRoomData.className} onChange={handleChange} />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <div className="my-2">강의실 설명</div>
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
                                            <div className="my-2">강의실 이미지</div>
                                            {props.classRoomData.image === null ? (
                                                <input type="text" id="image" name="image" placeholder={props.classRoomData.image} onChange={handleChange} />
                                            ) : (
                                                <input type="text" id="image" name="image" placeholder="이미지 링크를 입력해 주세요." onChange={handleChange} />
                                            )}
                                        </div>
                                        <div className="form-group col-lg-12">
                                            <div className="my-2">강의실 마감일</div>
                                            <input type="datetime-local" id="closeDate" name="closeDate" onChange={handleChange} />
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
            {props.classRoomData.instructorId === userId ? (
                <div className="menu-container">
                    <button onClick={useClick} className="menu-trigger">
                        <img className="setIcon" src={setIcon} alt="User avatar" />
                    </button>
                    <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                        <ul>
                            <li>
                                <button onClick={() => openModal()} style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}>
                                    강의실 수정
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onDelete()} style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}>
                                    강의실 삭제
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        console.log(props.classRoomData.classId);
                                        history.replace({
                                            pathname: "/learntube/course/manage",
                                            state: {
                                                classId: props.classRoomData.classId,
                                            },
                                        });
                                    }}
                                    style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}
                                >
                                    강의실 관리
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : null}
        </>
    );
}
