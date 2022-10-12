import React, { useEffect, memo } from "react";
import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import ScrollToTop from "../../components/Common/ScrollTop";
import CartVideo from "./cart";
import axios from "axios";

import "rc-slider/assets/index.css";

// Image
import favIcon from "../../assets/img/fav-orange.png";
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";
import save from "../../assets/img/icon/save.png";

const Cart = ({ cart, playlistTitle, playlistId, setPart, existingVideo, deleteVideoFromCart }) => {
    const location = useLocation();
    const videos = cart;
    const [videoList, setVideoList] = useState(cart);
    const [existingList, setExistingList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const [youtubeId, setYoutubeId] = useState("");
    const [title, setTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [start_s, setStart_s] = useState(0.0);
    const [end_s, setEnd_s] = useState(0.0);
    const [seq, setSeq] = useState(0);
    const [duration, setDuration] = useState(0.0);

    const initVideolist = {
        duration: 0,
        end_s: 0,
        id: 0,
        maxLength: 0,
        newTitle: "",
        playlistId: 0,
        seq: 0,
        start_s: 0,
        tag: null,
        title: "",
        youtubeId: "",
    };

    let tempArray = [];
    let existingArray = [];

    useEffect(() => {
        console.log("cart updated!!!!");
        for (const prop in cart) {
            console.log(cart[prop]);
            let tempJson = JSON.stringify(cart[prop]);
            tempArray.push(tempJson);
            setCartList(tempArray);
        }
    }, [cart]);

    useEffect(function () {
        setPlaylistName(playlistTitle);
        setIsDeleted(false);
    }, []);

    //한번 로드 후 삭제로 인해 바뀔때 사용하는 useEffect
    useEffect(
        function () {
            console.log(isDeleted);
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

    const onDeleteClick = useCallback((seq) => {
        deleteVideoFromCart(seq);
    });

    const timePoint = (time) => {
        var h = "";
        var m = "";
        var s = "";
        if( parseInt(time / 3600) > 0){
            h = parseInt(time / 3600) + ":";
            time = parseInt(time % 3600);
        }
        if(parseInt(time / 60) > 0){
            m = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
            time = parseInt(time % 60);
        }
        else{
            m = "00"
        }
        if(parseInt(time) > 0){
            s = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
        }
        else{
            s = "00"
        }
        if(h !== "")
            return h + ":" + m + ":" + s;
        else
            return m + ":" + s;
    }

    const saveCart = async () => {
        console.log(cartList);
        cartList.map(async (data, temp) => {
            let obj = JSON.parse(data);
            console.log(obj);
            if(obj.id === -1){
                let createRequest = {
                    playlistId: obj.playlistId,
                    youtubeId: obj.youtubeId,
                    title: obj.title,
                    newTitle: obj.newTitle,
                    start_s: obj.start_s,
                    end_s: obj.end_s,
                    seq: temp,
                    duration: obj.duration,
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
            }
            else if(obj.deleted == 1){
                let deleteRequest = {
                    playlistId: obj.playlistId,
                    videoId: obj.id,
                }
                const response = await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/delete`, deleteRequest, {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                })
                .then((res) => console.log(res));
            }
            else{
                    let updateRequest = {
                        videoId: obj.id,
                        youtubeId: obj.youtubeId,
                        title: obj.title,
                        newTitle: obj.newTitle,
                        start_s: obj.start_s,
                        end_s: obj.end_s,
                        duration: obj.duration,
                        seq: temp,
                    }
                    const response = await axios
                    .post(`${process.env.REACT_APP_SERVER_URL}/api/playlist_video/update`, updateRequest, {
                        method: "POST",
                        headers: {
                            // Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => console.log(res));
            }
            
            
        })
        window.alert("저장되었습니다!");
    };

    return (
        <React.Fragment>
            {/* <Helmet>
                <link rel="icon" href={favIcon} />
            </Helmet>
            <OffWrap />
            <Header
                parentMenu="learntube"
                secondParentMenu="event"
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
                CanvasLogo={Logo}
                mobileNormalLogo={Logo}
                CanvasClass="right_menu_togle hidden-md"
                headerClass="full-width-header header-style1 home8-style4"
            /> */}
            <div className="rs-event orange-style d-flex flex-column" style={{ position: "fixed", bottom: "0", width: "100%" }}>
                {isOpen ? (
                    <>
                        <div className="bg-transparent">
                            <button onClick={onCartClick} style={{ background: "#273857", color: "white", width: "40px", border: "none", boxShadow: "0px 0px 5px black" }}>
                                ▼
                            </button>
                        </div>
                        <div style={{background: "#bfdcff"}}>
                            <div>
                                <div className="d-flex justify-content-between align-items-center ml-30 mr-30">
                                    <div>
                                        <i className="fa fa-play-circle-o"></i> {playlistName}
                                    </div>
                                    <Link to={{ pathname: "/learntube/learntube-studio" }}>
                                        <button className="cart-save-btn text-center rounded" onClick={saveCart}>저장</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex" style={{ overflowX: "scroll", overflowY: "clip", margin: "0px 30px" }}>
                                {/* <div className="prev-btn">
                <button className="bg-transparent border-0 h-100 w-100">&lt;</button>
            </div> */}
                                <div className="w-100 h-100">
                                    <div className="d-flex align-items-center justify-content-start border-bottom pl-5">
                                        {/* <h3 className="mb-0">
                                <i className="fa fa-play-circle-o pe-1 pt-3 mb-3"></i>
                                {playlistName ? playlistName : "playlist 이름"}
                            </h3> */}
                                    </div>
                                    <div className="row" style={{ flexWrap: "nowrap" }}>
                                        {cartList.map(function (data, i) {
                                            let video = JSON.parse(data);
                                            if(video.deleted !== 1){
                                                return (
                                                    <>
                                                        <div key={`video-${i}`} className="d-flex mt-10 mb-10 col-md-2 justify-content-start" style={{width: "170px", height: "200px"}}>
                                                            <div style={{ position: "relative", width: "100%"}}>
                                                                {/* <div className="d-flex justify-content-center align-items-center w-100 h-100"> */}
                                                                <div className="d-flex flex-wrap justify-content-start align-items-center">
                                                                    {/* <div>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                onDeleteClick(video.id);
                                                                            }}
                                                                            style={{
                                                                                position: "relative",
                                                                                background: "#6490d8",
                                                                                width: "25px",
                                                                                height: "25px",
                                                                                border: "none",
                                                                                color: "white",
                                                                                boxShadow: "0px 0px 3px white",
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-edit"></i>
                                                                        </button>
                                                                    </div> */}
                                                                    <div className="d-flex justify-content-end w-100" style={{position: "absolute", top: "0", zIndex: "5", marginTop: "4px"}}>
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
                                                                                        boxShadow: "0px 0px 2px 2px gray",
                                                                                    }}
                                                                                >
                                                                                <i class="fa fa-edit"></i>
                                                                        </button>
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
                                                                                    boxShadow: "0px 0px 2px 2px gray",
                                                                                    paddingLeft: "0px",
                                                                                    paddingRight: "0px",
                                                                                    marginRight: "4px",
                                                                                }}
                                                                            >
                                                                            <i class="fa fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                    <img
                                                                        className="img-fluid"
                                                                        style={{width: "100%", height:"90px" }}
                                                                        src={"https://i.ytimg.com/vi/".concat(video.youtubeId, "/hqdefault.jpg")}
                                                                        alt="영상제목"
                                                                    />
                                                                </div>
                                                                <div style={{display: "inline-flex", flexWrap: "wrap", fontSize: "9pt", justifyContent: "flex-start", lineHeight: "1.4", width: "100%"}}>
                                                                    <span
                                                                        style={{
                                                                            fontSize: "9pt",
                                                                            textOverflow: "ellipsis",
                                                                            overflow: "hidden",
                                                                            whiteSpace: "nowrap",
                                                                            wordBreak: "break-word",
                                                                            width: "100%",
                                                                            textAlign: "start",
                                                                            background: "white",
                                                                            color: "black",
                                                                            fontWeight: "bold",
                                                                            padding: "4px",
                                                                            marginBottom: "3px"
                                                                        }}
                                                                    >
                                                                        {video.newTitle ? video.newTitle : video.title}
                                                                    </span>
                                                                    <div style={{color: "white", fontSize: "8pt", width: "100%", textAlign: "start"}}>
                                                                        <div>
                                                                            <span>시작 시간 <i class="fa fa-caret-right" /> <span style={{letterSpacing: ".1rem"}}>{timePoint(video.start_s)}</span></span>
                                                                        </div>
                                                                        <div>
                                                                            <span>종료 시간 <i class="fa fa-caret-right" /> <span style={{letterSpacing: ".1rem"}}>{timePoint(video.end_s)}</span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div>
                                                                    <button
                                                                        className="part-btn rounded mt-5"
                                                                        onClick={(e) => {
                                                                            onPartClick(video);
                                                                        }}
                                                                        style={{ display: "inline-flex", alignItems: "center", fontSize: "8pt", height: "30px" }}
                                                                    >
                                                                        구간 설정
                                                                    </button>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                                {/* <div className="next-btn">
                <button className="bg-transparent border-0 h-100 w-100">&gt;</button>
            </div> */}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-transparent">
                        <button
                            onClick={onCartClick}
                            style={{ background: "#273857", color: "white", width: "40px", border: "none", boxShadow: "0px 0px 5px black" }}
                        >
                            ▲
                        </button>
                    </div>
                )}
            </div>
            {/* <Footer footerClass="rs-footer home9-style main-home" footerLogo={footerLogo} /> */}

            {/* scrolltop-start */}
            <ScrollToTop scrollClassName="scrollup orange-color" />
            {/* scrolltop-end */}
        </React.Fragment>
    );
};

export default Cart;
