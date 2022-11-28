import React from "react";
import { Link, useHistory } from "react-router-dom";
import FooterBottom from "./FooterBottom";

import Logo from "../../../assets/img/logo/Learntube-logos_transparent.png";

const Footer = (props) => {
    const { footerClass, footerTopClass } = props;
    const history = useHistory();
    let id = window.sessionStorage.getItem("userId");
    const clickLearntubeStudio = () => {
        if (id) {
            history.replace({
                pathname: "/learntube-studio",
            });
        } else {
            alert("로그인이 필요합니다.");
        }
    };
    return (
        <footer className={footerClass ? footerClass : "rs-footer"}>
            <div className={`footer-top ${footerTopClass}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 footer-widget md-mb-30">
                            <div className="footer-logo mb-10">
                                <Link to="/" as="/">
                                    <img src={Logo ? Logo : Logo} alt="Logo" />
                                </Link>
                            </div>
                            <div className="textwidget pr-60 md-pr-14">
                                <p>YouTube에서 원하는 영상들만 골라 강의리스트를 완성하고, 강의실 제작자들이 체계적으로 짠 강의들을 골라 수강해보세요!</p>
                            </div>
                            {/* <ul className="footer_social">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul> */}
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 footer-widget md-mb-30">
                            <h5 className="widget-title">NAVIGATION</h5>
                            <ul className="site-map p-0 m-0">
                                <li>
                                    <Link to="/">Main</Link>
                                </li>
                                <li>
                                    <Link to="/course">Courses</Link>
                                </li>
                                <li>
                                    <a onClick={clickLearntubeStudio} style={{ cursor: "pointer" }}>
                                        LearnTube Studio
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 pl-50 md-pl-14 footer-widget md-mb-30">
                            <h5 className="widget-title">Address</h5>
                            <ul className="address-widget">
                                <li>
                                    <i className="flaticon-location"></i>
                                    <div className="desc mt-0 mb-0">경상북도 포항시 북구 흥해읍 한동로 558, 한동대학교 NTH 219호</div>
                                </li>
                                <li>
                                    <i className="flaticon-call"></i>
                                    <div className="desc">
                                        <a href="tel:(+82)010-3191-2648">(+82)010-3191-2648</a>
                                    </div>
                                </li>
                                <li>
                                    <i className="flaticon-email"></i>
                                    <div className="desc">
                                        <a href="mailto:moomin@handong.ac.kr">moomin@handong.ac.kr</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="col-lg-3 col-md-12 col-sm-12 footer-widget">
                            <h5 className="widget-title">Recent Classes</h5>
                            <div className="recent-post mb-20">
                                <div className="post-img">
                                    <img src={"https://i.ibb.co/0mngfYR/Java.png"} alt="blog image" />
                                </div>
                                <div className="post-item">
                                    <div className="post-desc"></div>
                                    <span className="post-date">
                                        <i className="fa fa-calendar-check-o"></i>
                                        May 15, 2022
                                    </span>
                                </div>
                            </div>
                            <div className="recent-post mb-20">
                                <div className="post-img">
                                    <img src={"https://i.ibb.co/7GqtTYt/image.png"} alt="blog image" />
                                </div>
                                <div className="post-item">
                                    <div className="post-desc"></div>
                                    <span className="post-date">
                                        <i className="fa fa-calendar-check-o"></i>
                                        April 25, 2022
                                    </span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <FooterBottom />
        </footer>
    );
};

export default Footer;
