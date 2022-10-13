import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import Tilty from "react-tilty";
import SectionTitle from "../../components/Common/SectionTitle";

import animateBall from "../../assets/img/about/image-center-circle.png";
import mainImage from "../../assets/img/about/about3.png";
import bgImg from "../../assets/img/bg/banner1.jpg";
const bgStyle = {
    backgroundImage: `url(${bgImg})`,
    "background-size": "cover",
    "background-position": "center",
    height: "60vh",
    display: "grid",
    "align-items": "center",
};

function About() {
    useEffect(() => {
        AOS.init();
    });

    return (
        <div id="rs-banner" className="rs-banner style4 mb-90" style={bgStyle}>
            <Tilty perspective={1200} reverse={true}>
                {/* <img src={"https://i.ibb.co/86Kq65Q/002.png"} alt="Main Image" /> */}
                <img className="shape top-center rotateme" src={animateBall} alt="Rotating Ball" />
            </Tilty>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12 pl-60 order-last md-pl-14 md-mb-60">
                        <div className="img-part"></div>
                    </div>
                    {/* <div className="col-lg-5"> */}
                    {/* Section Title Start */}
                    {/* <SectionTitle
                            sectionClass="sec-title mb-26"
                            subtitleClass="sub-title primary"
                            subtitle=""
                            titleClass="title"
                            title={<>Learn <br></br>and Share<br></br> with YouTube</>}
                            descClass="desc pr-36"
                            description="LearnTube를 통해 강의실을 학습하고, 제작하세요"
                            animateName="fade-up"
                            animateDuration="1200"
                        /> */}
                    {/* Section Title End */}
                    {/* <div className="btn-part" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
                            <Link className="readon2" to="/learntube/about">
                                Read More
                            </Link>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default About;
