import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import RSMobileMenu from "./RSMobileMenu";
import CanvasMenu from "./CanvasMenu";
import TopHeader from "./TopBar";

import normalLogo from "../../../assets/img/logo/lite-logo.png";
import darkLogo from "../../../assets/img/logo/dark-logo.png";

import productImg1 from "../../../assets/img/shop/1.jpg";
import productImg2 from "../../../assets/img/shop/2.jpg";
import Login from "../../../pages/login";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const Header = (props) => {
    const {
        headerClass,
        parentMenu,
        secondParentMenu,
        activeMenu,
        headerNormalLogo,
        headerStickyLogo,
        mobileNormalLogo,
        mobileStickyLogo,
        TopBar,
        TopBarClass,
        emailAddress,
        phoneNumber,
        Location,
        CanvasLogo,
        CanvasClass,
    } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const userId = window.sessionStorage.getItem("userId");
    const [alarmVisible, setAlarmVisible] = useState(false);
    const [newAlarm, setNewAlarm] = useState(false);

    // useEffect(() => {
    //   // Sticky is displayed after scrolling for 100 pixels
    //   const toggleVisibility = () => {
    //     if (window.pageYOffset > 100) {
    //       setIsVisible(true);
    //     } else {
    //       setIsVisible(false);
    //     }
    //   };

    //   window.addEventListener("scroll", toggleVisibility);

    //   return () => window.removeEventListener("scroll", toggleVisibility);
    // }, []);

    const searchModalAdd = () => {
        document.body.classList.add("modal-open");
    };

    const logout = () => {
        window.sessionStorage.clear();
        window.sessionStorage.removeItem("userId");
        window.location.assign("/");
    };

    const canvasMenuAdd = () => {
        document.body.classList.add("nav-expanded");
    };

    const canvasMenuRemove = () => {
        document.body.classList.remove("nav-expanded");
    };

    const addAlarmDropdown = () => {
        document.body.classList.add("alarm-dropdown");
    };
    const removeAlarmDropdown = () => {
        document.body.classList.remove("alarm-dropdown");
    };
    const alarmExpand = () => {
        setAlarmVisible(!alarmVisible);
    };

    const [waitList, setWaitList] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [managedClassroom, setManagedClassroom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [index, setIndex] = useState(0);
    let idx = 0;

    const fetchManagesClassRoom = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${userId}`);
            // await setManagedClassroom(response.data);
            // console.log(response.data);
            for (const prop in response.data) {
                managedClassroom[prop] = response.data[prop];
            }
            // console.log(managedClassroom);
        } catch (err) {
            // console.log("err >> ", err);
        }
    };

    const fetchWaitList = async (cid) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`);
            for (const prop in response.data) {
                waitList[idx] = response.data[prop];
                waitList[idx]["classId"] = cid;
                setNewAlarm(true);
                setIsWaiting(true);
                idx++;
            }
            setIndex(idx);
            //window.sessionStorage.setItem("waitlist", JSON.stringify(waitList));
        } catch (err) {
            // console.log("err > ", err);
        }
    };

    // function putclassId(cid) {
    //     for (var i = 0; i < waitList.length; i++) {
    //         waitList[i]["classId"] = cid;
    //     }
    //     setNewAlarm(true);
    // }

    useEffect(() => {
        if (userId) {
            fetchManagesClassRoom();
            // console.log(managedClassroom);
            setTimeout(() => {
                if (managedClassroom) {
                    managedClassroom.map((classroom) => {
                        // console.log(classroom);
                        fetchWaitList(classroom.classId).then(() => {
                            // console.log(waitList);
                        });
                    });
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                }
            }, 300);
        }
    }, [userId, waitList]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (userId) {
    //             fetchManagesClassRoom();
    //             //  console.log(managedClassroom);
    //             if (managedClassroom) {
    //                 managedClassroom.map((classroom) => {
    //                     //  console.log(classroom);
    //                     fetchWaitList(classroom.classId).then(() => {
    //                         //  console.log(waitList);
    //                         setIsLoading(false);
    //                         putclassId(classroom.classId);
    //                     });
    //                 });
    //             }
    //         }
    //     }, 100000);
    //     return () => clearInterval(interval);
    // }, [waitList]);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //      if (userId) {
    //       fetchManagesClassRoom();
    //       console.log(managedClassroom);
    //         if(managedClassroom){
    //             managedClassroom.map((classroom)=> {
    //                 console.log(classroom);
    //                 fetchWaitList(classroom.classId).then(() =>{
    //                   console.log(waitList);
    //                   setIsLoading(false);
    //                   putclassId(classroom.classId);
    //             });
    //             })
    //         }
    //       }
    //    }, 5000);
    //    return () => clearInterval(interval);
    // }, []);

    // const alarmShrink = () => {
    //   setAlarmVisible(false);
    // }

    return (
        <React.Fragment>
            <div className={headerClass ? headerClass : "full-width-header home8-style4 main-home"}>
                <header id="rs-header" className="rs-header">
                    {TopBar ? <TopHeader topBarClass={TopBarClass} emailAddress={emailAddress} phoneNumber={phoneNumber} Location={Location} /> : ""}

                    <div className={isVisible ? "menu-area menu-sticky sticky" : "menu-area menu-sticky"} style={{ display: "flex", alignItems: "center", height: "60px" }}>
                        <div className="container">
                            <div className="row y-middle">
                                <div className="col-lg-2">
                                    <div className="logo-area hidden-md">
                                        <Link to="/">
                                            <img className="normal-logo" src={headerNormalLogo ? headerNormalLogo : normalLogo} alt="" />
                                            <img className="sticky-logo" src={headerStickyLogo ? headerStickyLogo : darkLogo} alt="" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-7 text-start">
                                    <div className="rs-menu-area">
                                        <div className="main-menu">
                                            <div className="mobile-menu md-display-block">
                                                <Link to="/" className="mobile-normal-logo">
                                                    <img className="normal-logo" src={mobileNormalLogo ? mobileNormalLogo : normalLogo} alt="" />
                                                </Link>
                                                <Link to="/" className="mobile-sticky-logo">
                                                    <img src={mobileNormalLogo ? mobileNormalLogo : darkLogo} alt="logo" />
                                                </Link>
                                                <div>
                                                    <Link
                                                        to="#"
                                                        className="rs-menu-toggle"
                                                        onClick={() => {
                                                            setMenuOpen(!menuOpen);
                                                        }}
                                                    >
                                                        <i className="fa fa-bars"></i>
                                                    </Link>
                                                    <ul className="expand-items" style={{ float: "right" }}>
                                                        <li>
                                                            {userId ? (
                                                                <button
                                                                    id="logoutBtn"
                                                                    onClick={logout}
                                                                    className="loginbtn btn display-4 mr-30 mb-10 mt-10"
                                                                    style={{
                                                                        backgroundColor: "#eeeeee",
                                                                        color: "#273857",
                                                                    }}
                                                                >
                                                                    로그아웃
                                                                </button>
                                                            ) : (
                                                                <Login />
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <nav className="rs-menu hidden-md text-start">
                                                <ul className="nav-menu">
                                                    <MenuItems parentMenu={parentMenu} />{" "}
                                                </ul>{" "}
                                            </nav>{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>

                                <div className="col-lg-3 relative text-end hidden-md">
                                    <div className="expand-btn-inner search-icon">
                                        {userId ? null : <Login />}
                                        <ul className="expand-items">
                                            <li>
                                                <div className="d-flex">
                                                    <div>
                                                        {userId ? (
                                                            newAlarm ? (
                                                                <>
                                                                    <div className="new-alarm">{index}</div>
                                                                    <FaBell
                                                                        className="alarmbtn mr-10"
                                                                        size="20"
                                                                        // onMouseOver={{ addAlarmDropdown }} onMouseLeave={{ removeAlarmDropdown }}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <FaBell
                                                                    className="alarmbtn mr-10"
                                                                    size="20"
                                                                    // onMouseOver={{ addAlarmDropdown }} onMouseLeave={{ removeAlarmDropdown }}
                                                                />
                                                            )
                                                        ) : null}

                                                        {isLoading ? (
                                                            <div className="alarm-dropdown">
                                                                <div class="text-center" style={{ marginTop: "10%", height: "5rem" }}>
                                                                    <Spinner animation="grow" variant="secondary" style={{ width: "2rem", height: "2rem" }} />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="alarm-dropdown"
                                                                // className="alarm"
                                                            >
                                                                {isWaiting ? (
                                                                    waitList.map((waiting, i) => (
                                                                        <div
                                                                            className="alarm-border"
                                                                            style={{
                                                                                textAlign: "left",
                                                                                padding: "7px 20px",
                                                                            }}
                                                                            onClick={() => setNewAlarm(false)}
                                                                        >
                                                                            <Link
                                                                                to={{
                                                                                    pathname: `/course/manage`,
                                                                                    state: {
                                                                                        classId: waiting.classId,
                                                                                    },
                                                                                }}
                                                                                style={{
                                                                                    color: "black",
                                                                                }}
                                                                            >
                                                                                {waiting.username + " 님께서 수강신청하셨습니다."}
                                                                            </Link>
                                                                            {/* {console.log(waitList)} */}
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            textAlign: "left",
                                                                            padding: "10px 15px",
                                                                            color: "gray",
                                                                        }}
                                                                    >
                                                                        새로운 알림이 없습니다.
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {userId ? (
                                                            <BsFillPersonFill
                                                                onMouseOver={canvasMenuAdd}
                                                                // onMouseLeave={canvasMenuRemove}
                                                                size="24"
                                                                style={{ color: "white", cursor: "pointer" }}
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* <span className="dot1"></span>
                          <span className="dot2"></span>
                          <span className="dot3"></span> */}
                                                {/* </a> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RSMobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} parentMenu={parentMenu} secondParentMenu={secondParentMenu} />
                    <div onClick={() => setMenuOpen(false)} className={menuOpen ? "body-overlay show" : "body-overlay"}></div>
                </header>
                {/* {alarmVisible ? (
                    <div style={{ display: "block", position: "absolute", right: "19%", width: "350px", background: "white", border: "1px solid gray", borderBottom: "none", zIndex: "999" }}>
                        <ul
                            style={{
                                textAlign: "left",
                                // color: "black !important",
                                fontSize: "1.1rem",
                            }}
                            className={waitList ? null : "mt-10 pb-10 border-bottom border-dark"}
                        >
                            {isLoading ? (
                                <div style={{ width: "350px", borderBottom: "1px solid black", padding: "10px 0px" }}>
                                    <span style={{ marginLeft: "10px" }}>로딩중 ...</span>
                                </div>
                            ) : waitList ? (
                                waitList.map((waiting, i) => (
                                    <li className={alarmVisible ? "d-block" : "d-none"}style={{ borderBottom: "1px solid black", padding: "5px 0px 5px 15px" }} onClick={() => console.log(waiting.classId)}>
                                        <Link
                                            to={{
                                                pathname: `/course/manage`,
                                                state: {
                                                    classId: waiting.classId,
                                                },
                                            }}
                                        >
                                            {waiting.username + " 님께서 수강신청하셨습니다."}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <div style={{ width: "350px", borderBottom: "1px solid black", padding: "10px 0px" }}>
                                    <span style={{ marginLeft: "10px" }}>새로운 알림이 없습니다.</span>
                                </div>
                            )}
                        </ul>
                    </div>
                ) : null} */}
                <CanvasMenu canvasClass={CanvasClass ? CanvasClass : "right_menu_togle orange_color hidden-md"} canvasLogo={CanvasLogo ? CanvasLogo : darkLogo} />
            </div>
        </React.Fragment>
    );
};

export default Header;
