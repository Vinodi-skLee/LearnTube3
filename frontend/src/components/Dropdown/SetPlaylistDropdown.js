import React, { Component, useEffect, useState, useRef } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../../assets/css/dropdown.css";
import setIcon from "../../assets/img/icon/settingIcon.png";

export default function SetPlaylistDropdown({ playlistId, selectedPlaylist, checkPlaylistName, setUpdatePlaylist, updatePlaylist, deletePlaylist }) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const useClick = () => setIsActive(!isActive);

    return (
        <>
            <div className="menu-container2">
                <button onClick={useClick} className="menu-trigger">
                    <img className="setIcon" src={setIcon} alt="User avatar" />
                </button>
                <nav ref={dropdownRef} className={`menu2 ${isActive ? "active" : "inactive"}`}>
                    <ul>
                        <li>
                            <Link
                                to={{
                                    pathname: "/learntube/learntube-studio/youtubeSearch",
                                    state: {
                                        playlistName: selectedPlaylist,
                                        playlistId: playlistId,
                                        update: true,
                                    },
                                }}
                                style={{ padding: "0", margin: "0" }}
                            >
                                <button
                                    onClick={(e) => {
                                        checkPlaylistName(e, selectedPlaylist);
                                    }}
                                    style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}
                                >
                                    플레이리스트 추가
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setUpdatePlaylist(!updatePlaylist)} style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}>
                                {" "}
                                플레이리스트 수정
                            </button>
                        </li>
                        <li>
                            <button onClick={() => deletePlaylist()} style={{ border: "none", background: "none", padding: "13px", color: "#626262" }}>
                                플레이리스트 삭제
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
