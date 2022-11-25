import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Tilty from "react-tilty";
import AOS from "aos";

import wave from "../../assets/img/banner/banner-line.png";
import circle from "../../assets/img/banner/banner-circle.png";
import dots from "../../assets/img/banner/banner-dots.png";
import bgImg from "../../assets/img/bg/shape-bg2.png";
import logoImg from "../../assets/img/bg/OnlineCourse.png";
import Login from "../../pages/login";
const bgStyle = {
    backgroundImage: `url(${bgImg})`,
    "background-size": "cover",
    "background-position": "center",
    height: "60vh",
    display: "grid",
    "align-items": "center",
};

const BannerStyleFour = ({ onGoogleLogin }) => {
    const clientId = "485474785684-amktf48tlk2utjc83ttboi2dlftm1280.apps.googleusercontent.com";

    const onSuccess = async (response) => {
        // console.log(response);

        const {
            googleId,
            profileObj: { email, name },
        } = response;

        await onGoogleLogin({
            socialId: googleId,
            socialType: "google",
            email,
            nickname: name,
        });
    };

    const onFailure = (error) => {
        // console.log(error);
    };

    return (
        <React.Fragment>
            {/* <!-- banner section start --> */}
            <div id="rs-banner" className="rs-banner style4 mb-90" style={bgStyle}>
                <div className="container relative">
                    <div className="row relative">
                        <div className="row">
                            <div className="banner-btn z-index-1" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
                                {/* <Link className="readon2 banner-style" to="/learntube/login"> */}
                                {/* <button className="readon2 banner-style"> */}
                                {/* <Login /> */}
                                {/* Sign In */}
                                {/* </button> */}
                                {/* </Link> */}
                            </div>

                            <div className="banner-content-img ml-10" style={{ maxWidth: "400px", maxHeight: "400px" }}>
                                <div className="banner-dots-shape">
                                    <Tilty>
                                        <img src={dots} alt="" />
                                    </Tilty>
                                </div>
                                <img src={logoImg} alt="" data-aos="flip-left" data-aos-duration="3000" style={{ width: "400px", height: "400px" }} />
                            </div>

                            <div className="banner-circle-shape mb-200">
                                <Tilty>
                                    <img className="rotateme" src={circle} alt="" />
                                </Tilty>
                            </div>
                            <div className="banner-line-shape">
                                <Tilty perspective={100}>
                                    <img src={wave} alt="" data-aos="flip-left" data-aos-duration="3000" />
                                </Tilty>
                            </div>
                            <div className="col banner-content ml-20 mt-110">
                                <h1 className="banner-title" data-aos="fade-left" data-aos-duration="1000" style={{ color: "#273857" }}>
                                    LearnTube
                                </h1>
                                <h2 className="" data-aos="fade-left" data-aos-duration="1000" style={{ color: "#273857" }}>
                                    YouTube 영상을 활용한 학습 지원 서비스
                                </h2>
                                <div className="desc mb-40" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300" style={{ color: "#273857" }}>
                                    YouTube에서 원하는 영상을 검색하고, 선택하여 나만의 강의실을 만들어보세요. <br /> 여러 강의를 구경하고 수강신청하세요.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- banner section end --> */}
        </React.Fragment>
    );
};

export default BannerStyleFour;
