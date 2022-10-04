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

const Cart = ({ cart, playlistTitle, playlistId, selectPart }) => {
  const location = useLocation();
  const videos = cart;
  const [videoList, setVideoList] = useState(cart);
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
    playlistId: 1,
    youtubeId: "",
    title: "",
    newTitle: "",
    start_s: "",
    end_s: "",
    seq: 0,
  };

  let tempArray = [];
  
  useEffect(() => {
    
    console.log("cart updated!!!!");
    for (const prop in cart) {
      let tempJson = JSON.stringify(cart[prop]);
      tempArray.push(tempJson);
      console.log(tempArray);
      setCartList(tempArray);
      setPlaylistName(playlistTitle);
    }
  }, [cart]);

  useEffect(function () {
    setVideoList(videos);
    //console.log(videoList);
    console.log(location);
    //console.log(location.state.playlistId);
    for (const prop in videoList) {
      let tempJson = JSON.stringify(videoList[prop]);
      tempArray.push(tempJson);
      setCartList(tempArray);
      setPlaylistName(playlistTitle);
    }
    setIsDeleted(false);
  }, []);
  //console.log(cartList)

  //한번 로드 후 삭제로 인해 바뀔때 사용하는 useEffect
  useEffect(
    function () {
      console.log(isDeleted);
      setIsDeleted(false);
    },
    [isDeleted]
  );

  function deleteVideo(video, num) {
    setIsDeleted(true);
    console.log(video.id);
    let temp = cartList;
    temp.splice(num, 1);
    setCartList(temp);
    console.log(cartList);
    console.log(isDeleted);
  }

  const onPartClick = useCallback((video) => {
    selectPart(video);
  });

  const onCartClick = () => {
    setIsOpen(!isOpen);
  }

  const saveCart = async () => {
    console.log(cartList);
    for (let temp in cartList) {
      let obj = JSON.parse(cartList[temp]);
      console.log(obj);
      let createRequest = {
        playlistId: playlistId,
        youtubeId: obj.id,
        title: obj.snippet.title,
        newTitle: obj.snippet.newTitle,
        start_s: obj.start_s,
        end_s: obj.end_s,
        seq: temp,
        duration: obj.duration,
      };
      const response = await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/playlist_video/create`,
          createRequest,
          {
            method: "POST",
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
    }
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
      <div className="rs-event orange-style d-flex flex-column" style={{position: "fixed", bottom: "0", width: "100%"}}>
        {
          isOpen
          ?
          <>
          <div className="bg-transparent">
            <button className="bg-white" onClick={onCartClick} style={{width: "40px", border: "1px solid lightgray", borderBottom: "none", boxShadow: "0px 0px 5px black"}}>▼</button>
          </div>
          <div className="bg-white">
          <div>
                  <div className="d-flex justify-content-between align-items-center ml-30 mr-30">
                    <div>
                    <i className="fa fa-play-circle-o"></i>
                      {" "}{playlistName}
                    </div>
                  <Link
                  to={{ pathname: "/learntube/learntube-studio" }}
                  onClick={saveCart}
                >
                    <button className="save-btn text-center rounded">
                      저장
                    </button>
                </Link>
                </div>
              </div>
          <div className="d-flex" style={{overflowX: "scroll", overflowY: "clip", margin: "0px 30px"}}>
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
            <div className="row" style={{flexWrap: "nowrap"}}>
              {cartList.map(function (video, i) {
                let newObject = JSON.parse(video);
                //console.log(newObject.snippet.thumbnails.medium.url);
                return (
                  <div key={i} className="d-flex mt-10 mb-10 col-md-2 justify-content-start align-items-center" style={{width: "200px"}}>
                    <div style={{width: "100%", height: "100%"}}>
                      {/* <div className="d-flex justify-content-center align-items-center w-100 h-100"> */}
                      <div className="d-flex flex-wrap justify-content-start align-items-center">
                        <img
                          className="search-img mb-5"
                          src={newObject.snippet.thumbnails.medium.url}
                          alt={newObject.snippet.title}
                          style={{width: "100%", height: "100%", border: "1px solid lightgray"}}
                        />
                        </div>
                        <div style={{fontSize: "12pt", lineHeight: "1.4", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", wordBreak: "break-word"}}>
                          {newObject.snippet.title
                            ? newObject.snippet.title
                            : "영상제목"}
                        </div>
                        <div style={{fontSize: "6pt", lineHeight: "1.4", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", wordBreak: "break-word"}}>
                          {newObject.snippet.channelTitle
                            ? newObject.snippet.channelTitle
                            : "채널명"}
                        </div>
                        <div>
                            <button
                            className="part-btn rounded mt-5"
                            onClick={(e) => {
                                onPartClick(newObject);
                            }}
                            style={{display: "inline-flex", alignItems: "center", fontSize: "8pt", height: "30px"}}
                            >
                            구간 설정
                            </button>
                        </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
            {/* <div className="next-btn">
                <button className="bg-transparent border-0 h-100 w-100">&gt;</button>
            </div> */}
          </div>
        </div>
        </>
        :
        <div className="bg-transparent">
        <button className="bg-white" onClick={onCartClick} style={{width: "40px", border: "1px solid lightgray", borderBottom: "1px solid lightgray", boxShadow: "0px 0px 5px black"}}>▲</button>
      </div>
        }
      </div>
      {/* <Footer footerClass="rs-footer home9-style main-home" footerLogo={footerLogo} /> */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
};

export default Cart;
