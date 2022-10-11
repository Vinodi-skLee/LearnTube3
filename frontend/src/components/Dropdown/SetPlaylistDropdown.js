import React, { Component, useEffect, useState, useRef } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../../assets/css/dropdown.css";
import setIcon from "../../assets/img/icon/settingIcon.png";
import ReactTooltip from "react-tooltip";

export default function SetPlaylistDropdown({ playlistId, setPlaylistId, userId, initCreatePlaylist, setUpdatePlaylist, updatePlaylist, deletePlaylist, isSelected, setIsEditMode }) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const useClick = () => setIsActive(!isActive);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);
    const [isShow, setIsShow] = useState(false);

    const [createPlaylist, setCreatePlaylist] = useState(initCreatePlaylist);
    const [playlistName, setPlaylistName] = useState("Playlist 생성");

    const handleChange = (e) => {
        setCreatePlaylist({
            ...createPlaylist,
            [e.target.name]: e.target.value.trim(),
            userId: userId,
        });
    };

    const handleSubmit = async () => {
        console.log(JSON.stringify(createPlaylist));
        let temp;
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist/create`, JSON.stringify(createPlaylist), {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(function (res) {
                console.log(res.data.playlistId);
                temp = res.data.playlistId;
                setPlaylistId(temp);
                setIsShow(true);
            });
        console.log(createPlaylist.playlistName);
        setPlaylistName(createPlaylist.playlistName);
    };

    return (
        <>
            <div className="justify-items-end menu-container2">
                <button onClick={useClick} className="menu-trigger" data-for="setHover" data-tip>
                    <img className="setIcon" src={setIcon} alt="User avatar" />
                </button>
                <ReactTooltip id="setHover" getContent={(dataTip) => "설정"} />
                <nav ref={dropdownRef} className={`menu2 ${isActive ? "active" : "inactive"}`}>
                    <ul>
                        <li>
                            <button
                                onClick={() => {
                                    openModal();
                                }}
                                style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}
                            >
                                플레이리스트 생성
                            </button>
                        </li>

                        {isSelected ? (
                            <>
                                <li>
                                    <button
                                        onClick={() => {
                                            setUpdatePlaylist(true);
                                            setIsEditMode(true);
                                        }}
                                        style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}
                                    >
                                        플레이리스트 수정
                                    </button>
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                </nav>
                <Modal
                    isOpen={isOpen}
                    onClose={() => {
                        openModal();
                    }}
                    onRequestClose={() => setIsOpen(false)}
                    style={{
                        overlay: {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgb(0, 0, 0, 0.55)",
                            zIndex: 999,
                        },
                        content: {
                            position: "absolute",
                            top: "23%",
                            left: "25%",
                            right: "25%",
                            bottom: "140px",
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
                                    <div className="sec-title text-center mb-10">
                                        <h2 className="title mt-3 mb-10">{playlistName}</h2>
                                    </div>
                                    <div className="styled-form">
                                        <div id="form-messages"></div>
                                        <form id="contact-form">
                                            {isShow ? (
                                                <div></div>
                                            ) : (
                                                <div className="row clearfix">
                                                    <div className="form-group col-lg-12 mb-25">
                                                        <div className="my-2">
                                                            Playlist 이름
                                                            <span className="ms-1" style={{ color: "red" }}>
                                                                *
                                                            </span>
                                                        </div>
                                                        <input type="text" id="title" name="playlistName" placeholder="제목을 입력하세요" onChange={handleChange} required />
                                                    </div>
                                                    <div className="form-group col-lg-12">
                                                        <div className="my-2">Playlist 설명</div>
                                                        <textarea
                                                            type="textarea"
                                                            id="description"
                                                            name="description"
                                                            onChange={handleChange}
                                                            placeholder="설명을 입력하세요"
                                                            style={{ height: "80px", borderRadius: "0px" }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {isShow ? (
                                                <div className="row d-flex justify-content-center ms-3 me-1 mt-3">
                                                    <button
                                                        type="submit"
                                                        className="canclebtn"
                                                        onClick={() => {
                                                            setIsShow(false);
                                                            setPlaylistName("Playlist 생성");
                                                        }}
                                                    >
                                                        <span className="txt">취소</span>
                                                    </button>
                                                    <Link
                                                        className="moveToSearch text-center pt-2 d-flex align-items-center justify-content-center"
                                                        to={{
                                                            pathname: "/learntube/learntube-studio/youtubeSearch",
                                                            state: {
                                                                playlistName: createPlaylist.playlistName,
                                                                playlistId: playlistId,
                                                                update: false,
                                                            },
                                                        }}
                                                    >
                                                        <span>playlist에 영상 추가하기</span>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                                    <button
                                                        type="submit"
                                                        className="canclebtn"
                                                        onClick={() => {
                                                            openModal();
                                                            setIsShow(false);
                                                            setPlaylistName("Playlist 생성");
                                                        }}
                                                        style={{ height: "40px", borderRadius: "5px" }}
                                                    >
                                                        <span className="txt">취소</span>
                                                    </button>
                                                    <button className="createbtn" onClick={handleSubmit} style={{ height: "40px", borderRadius: "5px" }}>
                                                        {/* <div className="createbtn text-center d-flex align-items-center justify-content-center" onClick={handleSubmit}> */}
                                                        <span className="txt">저장</span>
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}
