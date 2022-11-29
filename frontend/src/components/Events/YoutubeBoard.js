import React, { useCallback, memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import YouTube from "react-youtube";
import Modal from "react-modal";
import ModalVideo from "react-modal-video";
import cartImg from "../../assets/img/icon/addVideo.png";
import outOfCart from "../../assets/img/icon/minus.png";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "rc-slider/assets/index.css";

const YoutubeBoard = memo(({ video, video: { snippet, contentDetails }, selectVideo, index, addVideoToCart, deleteVideoFromCart, isAlreadyIncart, cart, newCart, selectPart }) => {
    let indexx = index.slice(0, -1);
    const [isAdded, setIsAdded] = useState(false);
    const [isMouseOn, setIsMouseOn] = useState(0);
    const [alreadyCart, setAlreadyCart] = useState(false);
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [isInterestVideo, setIsInterestVideo] = useState(false);

    const onSelect = () => {
        selectPart(video);
    };

    const onClickAdd = () => {
        setIsAdded(true);
        console.log(isAdded);
        addVideoToCart(video);
        // console.log("newCart : " + newCart[video.id]);
    };

    const onDelete = () => {
        setIsAdded(false);
        deleteVideoFromCart(cart[indexx].seq);
    };

    //const [isSelected, setIsSelected] = useState(false);

    useEffect(function () {
        setSearchedVideos(video);
    });

    const heartBtnHandler = () => {
        setIsInterestVideo(!isInterestVideo);
    };

    function decodeHTMLEntities(str) {
        if (str !== undefined && str !== null && str !== "") {
            str = String(str);

            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')&>/gim, "");
            var element = document.createElement("div");
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = "";
        }
        return str;
    }

    // const addCart = useCallback(() =>{
    //     console.log("add to cart");
    //         addVideoToCart(video);
    //         setIsAdded(true);
    // },[]);

    // const deleteCart = useCallback(()=>{
    //     setIsAdded(false);
    //     deleteVideoFromCart(video.id);
    // },[]);

    // useEffect(function(){
    //     isAlreadyIncart = cart.hasOwnProperty(video.id);
    //     console.log("in Board cart");
    // },[cart]);

    return (
        <>
            {/* <CardGroup>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup> */}

            <div
                className="search-block mouse-on"
                style={isAdded || isAlreadyIncart || isMouseOn ? { background: "#d3daf2" } : { background: "transparent" }}
                onMouseOver={() => setIsMouseOn(1)}
                onMouseOut={() => setIsMouseOn(0)}
            >
                <div>
                    <div onMouseDown={onSelect}>
                        {/* <div className="m-0 col-md-3 col-sm-12 d-flex justify-content-center"> */}
                        <img className="img-fluid search-img" src={snippet.thumbnails.medium.url} alt={snippet.title} />
                    </div>
                    <div
                        className="col-sm-12 search-text"
                        // className="col-md-8 col-sm-12 search-text"
                        onMouseDown={selectVideo}
                    >
                        <div className="search-title" onMouseDown={onSelect}>
                            {decodeHTMLEntities(snippet.title) ? decodeHTMLEntities(snippet.title) : "영상제목"}
                        </div>
                        <div className="fw-light search-channel" onMouseDown={onSelect}>
                            <span>
                                {decodeHTMLEntities(snippet.channelTitle) ? decodeHTMLEntities(snippet.channelTitle) : "채널명"} | {snippet.publishTime ? snippet.publishTime.slice(0, 10) : "등록일"}
                            </span>
                        </div>
                        <div className="search-description" onMouseDown={onSelect}>
                            {decodeHTMLEntities(snippet.description) ? decodeHTMLEntities(snippet.description) : "영상설명"}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {isInterestVideo ? (
                            <i className="fa fa-heart" onClick={heartBtnHandler} style={{ color: "red" }}></i>
                        ) : (
                            <i className="fa fa-heart" onClick={heartBtnHandler} style={{ color: "gray" }}></i>
                        )}
                        {isAdded || isAlreadyIncart ? (
                            <Button onMouseDown={onDelete} className="cart-out">
                                -
                            </Button>
                        ) : (
                            <Button onClick={onClickAdd} className="cart-in">
                                담기
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

export default YoutubeBoard;
