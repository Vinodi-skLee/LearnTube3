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

  useEffect(() => {
    console.log("cart updated!!!!");
  }, [cartList]);

  let tempArray = [];
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

      <div className="rs-event orange-style pb-100">
        <div>
          <div style={{ marginLeft: "3%", marginRight: "3%" }}>
            <div className="d-flex align-items-center justify-content-start border-bottom">
              {/* <h3 className="mb-0">
                                <i className="fa fa-play-circle-o pe-1 pt-3 mb-3"></i>
                                {playlistName ? playlistName : "playlist 이름"}
                            </h3> */}
              <div>
                <Link
                  className="pt-2"
                  to={{ pathname: "/learntube/learntube-studio" }}
                  onClick={saveCart}
                >
                  <div className="d-flex">
                    <button className="save-btn text-center rounded">
                      {" "}
                      저장
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              {cartList.map(function (video, i) {
                let newObject = JSON.parse(video);
                //console.log(newObject.snippet.thumbnails.medium.url);
                return (
                  <div key={i} className="d-flex mt-10 mb-10 col-md-2">
                    <div>
                      {/* <div className="d-flex justify-content-center align-items-center w-100 h-100"> */}
                      <div className="justify-content-center d-flex align-items-center">
                        <img
                          className="search-img mb-10"
                          src={newObject.snippet.thumbnails.medium.url}
                          alt={newObject.snippet.title}
                        />
                      </div>
                      <div className="ml-20 mr-20 text-start w-100 align-items-center col-4">
                        <div className="d-flex playlist-title">
                          {newObject.snippet.title
                            ? newObject.snippet.title
                            : "영상제목"}
                        </div>
                        <div className="d-flex fw-light ms-0 ps-0">
                          {newObject.snippet.channelTitle
                            ? newObject.snippet.channelTitle
                            : "채널명"}{" "}
                          |{" "}
                          {newObject.snippet.publishTime
                            ? newObject.snippet.publishTime.slice(0, 10)
                            : "등록일"}
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="part-btn align-items-center text-center rounded"
                          onClick={(e) => {
                            onPartClick(newObject);
                          }}
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
        </div>
      </div>
      {/* <Footer footerClass="rs-footer home9-style main-home" footerLogo={footerLogo} /> */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
};

export default Cart;
