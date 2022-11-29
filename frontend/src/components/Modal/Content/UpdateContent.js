import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button, FormSelect } from "react-bootstrap";
import axios from "axios";

const UpdateContent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);
    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [newPlaylistOpen, setNewPlaylistOpen] = useState(false);
    const userId = props.userId;

    const initUpdateContentData = {
        contentId: props.content.contentId,
        contentName: props.content.contentName,
        contentDescription: props.content.contentDescription,
        openDate: props.content.openDate,
        closeDate: props.content.closeDate,
        playlistId: props.content.playlistId,
    };

    const initPlaylistsData = [{ playlistId: "", playlistName: "" }];

    const [updateContentData, setUpdateContentData] = useState(initUpdateContentData);
    const [playlistsData, setPlaylists] = useState(initPlaylistsData);
    const [createPlaylist, setCreatePlaylist] = useState();

    const loadPlaylists = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/playlist/name?userId=${userId}`);
            // console.log(response.data);
            setPlaylists(response.data);
        } catch (err) {
            console.log("err >> ", err);
        }
    };

    const handleChange = (e) => {
        setUpdateContentData({
            ...updateContentData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlaylistChange = (e) => {
        setCreatePlaylist({
            ...createPlaylist,
            [e.target.name]: e.target.value.trim(),
            userId: props.userId,
        });
    };

    const handleSubmit = async () => {
        if(!updateContentData.contentName){
            window.alert("콘텐츠 제목을 입력해 주세요.");
            return;
        }
        else if(newPlaylistOpen && !createPlaylist){
            window.alert("플레이리스트 이름을 입력해 주세요.");
            return;
        }
        else{
            const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/content/update`, JSON.stringify(updateContentData), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => console.log(res));
            openModal();
            window.location.reload();
        }
        
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
                        backgroundColor: "rgb(0, 0, 0, 0.20)",
                    },
                    content: {
                        position: "absolute",
                        top: "20%",
                        left: "25%",
                        right: "25%",
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
                                <div className="sec-title text-center mb-10">
                                    <h3 className="title mt-3 mb-10">Content 수정</h3>
                                </div>
                                <div className="styled-form">
                                    <div id="form-messages"></div>
                                    <form id="contact-form">
                                        <div className="row clearfix">
                                            <div className="form-group col-lg-12 mb-25">
                                                <div className="my-2">
                                                    제목
                                                    <span className="ms-1" style={{ color: "red" }}>
                                                        *
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="contentName"
                                                    name="contentName"
                                                    placeholder="제목을 입력하세요"
                                                    value={updateContentData.contentName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <div className="my-2">
                                                    내용
                                                </div>
                                                <textarea
                                                    type="textarea"
                                                    id="contentDescription"
                                                    name="contentDescription"
                                                    placeholder="내용을 입력하세요"
                                                    value={updateContentData.contentDescription}
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
                                            <div className="form-group col-lg-12">
                                                <div className="my-2">
                                                    공개일
                                                </div>
                                                <input type="datetime-local" id="openDate" name="openDate" value={updateContentData.openDate} onChange={handleChange} />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <div className="my-2">
                                                    마감일
                                                </div>
                                                <input type="datetime-local" id="closeDate" name="closeDate" value={updateContentData.closeDate} onChange={handleChange} />
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <li
                                                        className="fa fa-check"
                                                        onClick={() => {
                                                            setPlaylistOpen(!playlistOpen);
                                                            setNewPlaylistOpen(false);
                                                            loadPlaylists();
                                                        }}
                                                        style={{
                                                            backgroundColor: "#6483d8",
                                                            border: "0px",
                                                            borderRadius: "10px",
                                                            color: "white",
                                                            width: "30px",
                                                            height: "30px",
                                                            margin: "10px",
                                                            padding: "8.4px",
                                                            cursor: "pointer",
                                                        }}
                                                    ></li>
                                                    Playlist 불러오기
                                                </div>
                                                <div
                                                    className="col-6"
                                                    onClick={() => {
                                                        setPlaylistOpen(false);
                                                        setNewPlaylistOpen(!newPlaylistOpen);
                                                    }}
                                                >
                                                    <li
                                                        className="fa fa-plus"
                                                        style={{
                                                            backgroundColor: "#6483d8",
                                                            border: "0px",
                                                            borderRadius: "10px",
                                                            color: "white",
                                                            width: "30px",
                                                            height: "30px",
                                                            margin: "10px",
                                                            padding: "8.4px",
                                                            cursor: "pointer",
                                                        }}
                                                    ></li>
                                                    Playlist 만들기
                                                </div>
                                            </div>
                                            {playlistOpen === true ? (
                                                <div>
                                                    <div class="dropdown show" style={{ marginBottom: "20px" }}>
                                                        <FormSelect aria-label="SelectBox" id="playlistId" name="playlistId" onChange={handleChange}>
                                                            <option value="------playlist를 선택해주세요-------" name="default">
                                                                ------playlist를 선택해주세요-------
                                                            </option>
                                                            {Array.isArray(playlistsData)
                                                                ? playlistsData.map((playlists, i) => (
                                                                      <option value={playlistsData[i].playlistId} name={playlistsData[i].playlistId}>
                                                                          {playlistsData[i].playlistName}
                                                                      </option>
                                                                  ))
                                                                : null}
                                                        </FormSelect>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {newPlaylistOpen === true ? (
                                                <div className="row clearfix">
                                                    <div className="form-group col-lg-12 mb-25">
                                                        <div className="my-2">
                                                            Playlist 이름
                                                            <span className="ms-1" style={{ color: "red" }}>
                                                                *
                                                            </span>
                                                        </div>
                                                        <input type="text" id="title" name="playlistName" placeholder="제목을 입력하세요" onChange={handlePlaylistChange} required />
                                                    </div>
                                                    <div className="form-group col-lg-12">
                                                        <div className="my-2">Playlist 설명</div>
                                                        <textarea
                                                            type="textarea"
                                                            id="description"
                                                            name="description"
                                                            onChange={handlePlaylistChange}
                                                            placeholder="설명을 입력하세요"
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
                                            ) : null}
                                        </div>
                                        <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                            <Button
                                                type="submit"
                                                className="canclebtn"
                                                style={{ padding: "10.5px" }}
                                                onClick={() => {
                                                    openModal();
                                                    setUpdateContentData(initUpdateContentData);
                                                    setCreatePlaylist(null);
                                                    setPlaylistOpen(false);
                                                    setNewPlaylistOpen(false);
                                                }}
                                            >
                                                취소
                                            </Button>
                                            <Button className="createbtn" type="button" onClick={handleSubmit} style={{ padding: "10.5px" }}>
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
            <span onClick={openModal}>
                <i
                    className="fa fa-edit"
                    id="editContent"
                    style={{
                        padding: "5px",
                        zIndex: "0",
                        cursor: "pointer",
                    }}
                ></i>
            </span>
        </>
    );
};

export default UpdateContent;
