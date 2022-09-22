import React, { useCallback, memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import ModalVideo from 'react-modal-video';
import cartImg from '../../assets/img/icon/addVideo.png';
import outOfCart from '../../assets/img/icon/minus.png';
import { Button } from "react-bootstrap";
import 'rc-slider/assets/index.css'

const YoutubeBoard = memo(({ video, video: { snippet, contentDetails }, selectVideo, addVideoToCart, deleteVideoFromCart ,isAlreadyIncart, cart}) => {

    const onSelect = useCallback(() => {
        selectVideo(video);
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
        
        <div className={isMouseOn ? "search-block mouse-on" : "search-block mouse-out"}  onMouseDown={onSelect} onMouseOver={() => setIsMouseOn(1)} onMouseOut={() => setIsMouseOn(0)}>
                <div className="m-0 col-md-3 col-sm-12 d-flex justify-content-center">
                    <img className="img-fluid search-img"
                        src={snippet.thumbnails.medium.url}
                        alt={snippet.title}
                    />
                </div>
                <div className="col-md-8 col-sm-12 search-text" onMouseDown={selectVideo} >
                    <div className="h5 search-title" onMouseDown={onSelect}>
                        {snippet.title ? snippet.title : '영상제목'}
                    </div>
                    <div className="fw-light search-channel" onMouseDown={onSelect}>
                        <span>{snippet.channelTitle ? snippet.channelTitle : '채널명'} | {snippet.publishTime ? snippet.publishTime.slice(0, 10) : '등록일'}</span>
                    </div>
                    <div className="fw-light search-description" onMouseDown={onSelect}>
                        {snippet.description ? snippet.description : '영상설명'}
                    </div>

                </div>
                <div className='col-md-1 d-flex justify-content-center align-items-center'>
                    {isAdded || isAlreadyIncart
                    ? <Button onMouseDown={onDelete} style={{backgroundColor: '#6c757d', width: '60px', padding:'5px'}}>-</Button>
                    : <Button onMouseDown={onClick} style={{backgroundColor: '#6483d8', width: '60px', padding:'5px'}}>담기</Button>
                    }
                </div>
        </div>
        </>
    );
});

export default YoutubeBoard