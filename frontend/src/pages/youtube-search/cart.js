import React, { useState, useCallback, useEffect, memo } from "react";
import { Link, useHistory } from "react-router-dom";
import ScrollToTop from "../../components/Common/ScrollTop";
import axios from "axios";

import "rc-slider/assets/index.css";
import { BiBracket } from "react-icons/bi";

const Cart = ({ cart, playlistTitle, playlistId, setPart, index, setIndex, existingVideo, deleteVideoFromCart, isInPlaylist, setIsInPlaylist, lastSeq }) => {
    const [cartList, setCartList] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const history = useHistory();

    let tempArray = [];

    useEffect(() => {
        for (const prop in cart) {
            // console.log(cart[prop].seq);
            let tempJson = JSON.stringify(cart[prop]);
            tempArray.push(tempJson);
            setCartList(tempArray);
        }
        // console.log("cart updated!!!!");
    }, [cart]);

    useEffect(function () {
        setPlaylistName(playlistTitle);
        setIsDeleted(false);
    }, []);

    //한번 로드 후 삭제로 인해 바뀔때 사용하는 useEffect
    useEffect(
        function () {
            // console.log(isDeleted);
            setIsDeleted(false);
        },
        [isDeleted]
    );

    const onPartClick = useCallback((video) => {
        setPart(video);
    });

    const onCartClick = () => {
        setIsOpen(!isOpen);
    };
    const [deleteCount, setDeleteCount] = useState(isInPlaylist);
    const onDeleteClick = useCallback((seq) => {
        setDeleteCount(deleteCount - 1);
        deleteVideoFromCart(seq);
    });

    const timePoint = (time) => {
        var h = "";
        var m = "";
        var s = "";
        if (parseInt(time / 3600) > 0) {
            h = parseInt(time / 3600);
            time = parseInt(time % 3600);
        }
        if (parseInt(time / 60) > 0) {
            m = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
            time = parseInt(time % 60);
        } else {
            m = "00";
        }
        if (parseInt(time) > 0) {
            s = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
        } else {
            s = "00";
        }
        if (h !== "") return h + ":" + m + ":" + s;
        else return m + ":" + s;
    };

    const saveCart = async () => {
        console.log("cartList === " + cartList);
        for (let temp in cartList) {
            let obj = JSON.parse(cartList[temp]);
            console.log("cartList === " + obj.id);
            if (obj.id === -1) {
                let createRequest = {
                    playlistId: obj.playlistId,
                    youtubeId: obj.youtubeId,
                    title: obj.title,
                    newTitle: obj.newTitle,
                    start_s: obj.start_s,
                    end_s: obj.end_s,
                    seq: temp,
                    duration: obj.duration,
                    tag: obj.tag,
                };
                const response = await axios
                    .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/create`, createRequest, {
                        method: "POST",
                        headers: {
                            // Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => console.log(res));
                ++temp;
            } else if (obj.deleted === 1) {
                let deleteRequest = {
                    playlistId: obj.playlistId,
                    videoId: obj.id,
                };
                const response1 = await axios
                    .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/delete`, deleteRequest, {
                        headers: {
                            "Content-Type": `application/json`,
                        },
                    })
                    .then((res) => console.log(res));
                setIsInPlaylist(isInPlaylist - 1);
                setIndex(index - 1);
                ++temp;
            } else {
                let updateRequest = {
                    playlistId: obj.playlistId,
                    videoId: obj.id,
                    youtubeId: obj.youtubeId,
                    title: obj.title,
                    newTitle: obj.newTitle,
                    start_s: obj.start_s,
                    end_s: obj.end_s,
                    duration: obj.duration,
                    seq: temp,
                    tag: obj.tag,
                };
                const response2 = await axios
                    .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`, updateRequest, {
                        method: "POST",
                        headers: {
                            // Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => console.log(res));
                ++temp;
            }
        }
        window.location.replace("/learntube-studio");
    };

    return (
        <React.Fragment>
            <div className="rs-event orange-style d-flex flex-column" style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "100" }}>
                {isOpen ? (
                    <>
                        <div className="bg-transparent" style={{ zIndex: "800" }}>
                            <button onClick={onCartClick} style={{ background: "#273857", color: "white", width: "50px", border: "none", boxShadow: "0px 0px 5px #273857" }}>
                                ▼
                            </button>
                        </div>
                        <div style={{ background: "#273857", boxShadow: "0px 0px 5px #273857" }}>
                            <div>
                                <div className="d-flex justify-content-between align-items-center ml-30 mr-30">
                                    <div style={{ color: "white" }}>
                                        <i className="fa fa-play-circle-o" style={{ color: "white" }}></i> <span style={{ color: "white" }}>{playlistName}</span>
                                    </div>
                                    <div>
                                        <Link to={{ pathname: "/learntube-studio" }}>
                                            <button className="cart-save-btn text-center rounded mr-5" onClick={saveCart}>
                                                저장
                                            </button>
                                        </Link>
                                        <button className="cart-save-btn text-center rounded" onClick={() => window.history.back()}>
                                            취소
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex" style={{ overflowX: "scroll", overflowY: "clip", margin: "0px 30px" }}>
                                <div className="w-100 h-100">
                                    <div className="d-flex align-items-center justify-content-start pl-5" style={{ borderBottom: "1.5px solid gray" }}></div>
                                    <div className="row" style={{ flexWrap: "nowrap" }}>
                                        {cartList.map(function (data, i) {
                                            let video = JSON.parse(data);
                                            if (video.deleted !== 1) {
                                                return (
                                                    <>
                                                        <div
                                                            key={`video-${video.seq}`}
                                                            className="d-flex mt-10 mb-10 col-md-2 justify-content-start"
                                                            style={video.seq == lastSeq - 1 ? { width: "180px", height: "200px", borderRight: "3px solid gray" } : { width: "180px", height: "200px" }}
                                                        >
                                                            <div style={{ position: "relative", width: "100%" }}>
                                                                <div className="d-flex flex-wrap justify-content-start align-items-center">
                                                                    <div className="d-flex justify-content-end w-100" style={{ position: "absolute", top: "0", zIndex: "5", marginTop: "4px" }}>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                onPartClick(video);
                                                                            }}
                                                                            style={{
                                                                                position: "relative",
                                                                                background: "white",
                                                                                width: "25px",
                                                                                height: "25px",
                                                                                padding: "0",
                                                                                marginRight: "4px",
                                                                                border: "none",
                                                                                borderRadius: "50%",
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-edit"></i>
                                                                        </button>
                                                                        {i < deleteCount ? (
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    onDeleteClick(video.seq);
                                                                                }}
                                                                                style={{
                                                                                    position: "relative",
                                                                                    background: "white",
                                                                                    width: "25px",
                                                                                    height: "25px",
                                                                                    padding: "0",
                                                                                    border: "none",
                                                                                    borderRadius: "50%",
                                                                                    paddingLeft: "0px",
                                                                                    paddingRight: "0px",
                                                                                    marginRight: "4px",
                                                                                }}
                                                                            >
                                                                                <i class="fa fa-trash"></i>
                                                                            </button>
                                                                        ) : null}
                                                                    </div>
                                                                    <img
                                                                        className="img-fluid"
                                                                        style={{ width: "100%", height: "90px" }}
                                                                        src={"https://i.ytimg.com/vi/".concat(video.youtubeId, "/hqdefault.jpg")}
                                                                        alt="영상제목"
                                                                    />
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        display: "inline-flex",
                                                                        flexWrap: "wrap",
                                                                        fontSize: "9pt",
                                                                        justifyContent: "flex-start",
                                                                        lineHeight: "1.4",
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontSize: "10pt",
                                                                            textOverflow: "ellipsis",
                                                                            overflow: "hidden",
                                                                            whiteSpace: "nowrap",
                                                                            wordBreak: "break-word",
                                                                            width: "100%",
                                                                            textAlign: "start",
                                                                            color: "white",
                                                                            fontWeight: "bold",
                                                                            padding: "3px",
                                                                            marginBottom: "3px",
                                                                            borderBottom: "1px solid gray",
                                                                        }}
                                                                    >
                                                                        {video.newTitle ? video.newTitle : video.title}
                                                                    </span>
                                                                    <div
                                                                        style={
                                                                            video.tag === "bothModified"
                                                                                ? { color: "#ff7d4b", fontSize: "8pt", width: "100%", textAlign: "start" }
                                                                                : { color: "lightgray", fontSize: "8pt", width: "100%", textAlign: "start" }
                                                                        }
                                                                    >
                                                                        <div>
                                                                            <span style={{ color: "lightgray" }}>
                                                                                시작 시간 <i class="fa fa-caret-right" />{" "}
                                                                            </span>
                                                                            <span style={video.tag === "startModified" ? { letterSpacing: ".1rem", color: "#ff7d4b" } : { letterSpacing: ".1rem" }}>
                                                                                {timePoint(video.start_s)}
                                                                            </span>
                                                                        </div>
                                                                        <div>
                                                                            <span style={{ color: "lightgray" }}>
                                                                                종료 시간 <i class="fa fa-caret-right" />{" "}
                                                                            </span>
                                                                            <span style={video.tag === "endModified" ? { letterSpacing: ".1rem", color: "#ff7d4b" } : { letterSpacing: ".1rem" }}>
                                                                                {timePoint(video.end_s)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {video.tag !== null ? (
                                                                        <div style={{ background: "#ff7d4b", padding: "1px 4px", marginTop: "2px", color: "white", borderRadius: "2px" }}>
                                                                            <span>구간 편집한 영상</span>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-transparent">
                        <button onClick={onCartClick} style={{ background: "#273857", color: "white", width: "50px", border: "none", boxShadow: "0px 0px 5px black" }}>
                            ▲
                        </button>
                    </div>
                )}
            </div>
            <ScrollToTop scrollClassName="scrollup orange-color" />
        </React.Fragment>
    );
};

export default Cart;
