import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import YoutubeBoard from "../../components/Events/YoutubeBoard";
import "rc-slider/assets/index.css";

const YoutubeVideoListWidget = ({ videos, selectVideo, nextPageToken, prevPageToken, getToken, addVideoToCart, deleteVideoFromCart, cart, selectPart }) => {
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [newCart, setNewCart] = useState({});

    const clickPageToken = (value) => {
        getToken(value);
    };
    useEffect(
        function () {
            setSearchedVideos(videos);
            // console.log(videos);
            // console.log(searchedVideos);
        },
        [videos]
    );

    useEffect(
        function () {
            console.log(cart);
            setNewCart(cart);
        },
        [cart]
    );

    return searchedVideos ? (
        <div className="search-box mt-20">
            <div id="rs-popular-course" className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog md-pt-70 text-start">
                <div>
                    <div className="course-part justify-content-between p-3 clearfix row" style={{ margin: "0px 25px" }}>
                        {searchedVideos.map(function (video) {
                            //console.log(video.id);
                            let isAlreadyIncart = newCart.hasOwnProperty(video.id);
                            //if(newCart.hasOwnProperty(video.id)) console.log(video.snippet.title+" "+isAlreadyIncart);

                            //console.log(video.snippet.title+" "+isAlreadyIncart);
                            return (
                                <YoutubeBoard
                                    key={video.id.videoId}
                                    video={video}
                                    selectVideo={selectVideo}
                                    videoNew={video}
                                    addVideoToCart={addVideoToCart}
                                    deleteVideoFromCart={deleteVideoFromCart}
                                    isAlreadyIncart={isAlreadyIncart}
                                    cart={newCart}
                                    selectPart={selectPart}
                                    //duration={video.contentDetails.duration}
                                    //viewCount ={video.statistics.viewCount}
                                />
                            );
                        })}
                    </div>
                </div>
                {/* <div className="pagination-area orange-color text-center mt-30 md-mt-0">
                    <ul className="pagination-part">
                        {prevPageToken ? <li onClick={(e) => clickPageToken(prevPageToken)} ><Link to="#"><i className="fa fa-long-arrow-left"></i>&nbsp;&nbsp;Prev</Link></li> : null}
                        {nextPageToken ? <li onClick={(e) => clickPageToken(nextPageToken)} ><Link to="#">Next <i className="fa fa-long-arrow-right"></i></Link></li> : null}

                    </ul>
                </div> */}
            </div>
        </div>
    ) : (
        <div className="search-box">검색중…</div>
    );
};

export default YoutubeVideoListWidget;
