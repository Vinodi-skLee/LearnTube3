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

const YoutubeBoard = memo(({ video, video: { snippet, contentDetails }, selectVideo, addVideoToCart, deleteVideoFromCart, isAlreadyIncart, cart, selectPart }) => {
    const onSelect = useCallback(() => {
        selectPart(video);
    }, [video]);

    const onClick = useCallback(() => {
        addVideoToCart(video);
    }, [video]);

    const onDelete = useCallback(() => {
        deleteVideoFromCart(video.id);
    }, [video]);

    //const [isSelected, setIsSelected] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isMouseOn, setIsMouseOn] = useState(0);

    const [searchedVideos, setSearchedVideos] = useState([]);
    useEffect(function () {
        setSearchedVideos(video);
    });

    const [isInterestVideo, setIsInterestVideo] = useState(false);

    const heartBtnHandler = () => {
        setIsInterestVideo(!isInterestVideo);
    };

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
                className={"search-block mouse-on"}
                style={isMouseOn ? { background: "lightgray" } : { background: "transparent" }}
                onMouseOver={() => setIsMouseOn(1)}
                onMouseOut={() => setIsMouseOn(0)}
            >
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
                        {snippet.title ? snippet.title : "영상제목"}
                    </div>
                    <div className="fw-light search-channel" onMouseDown={onSelect}>
                        <span>
                            {snippet.channelTitle ? snippet.channelTitle : "채널명"} | {snippet.publishTime ? snippet.publishTime.slice(0, 10) : "등록일"}
                        </span>
                    </div>
                    <div className="search-description" onMouseDown={onSelect}>
                        {snippet.description ? snippet.description : "영상설명"}
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
                        <Button onMouseDown={onClick} className="cart-in">
                            담기
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
});

export default YoutubeBoard;
