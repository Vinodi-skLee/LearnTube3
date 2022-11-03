import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import RSMobileMenu from "./RSMobileMenu";
import CanvasMenu from "./CanvasMenu";
import TopHeader from "./TopBar";
import AlarmDetail from "./AlarmDetail";

import normalLogo from "../../../assets/img/logo/lite-logo.png";
import darkLogo from "../../../assets/img/logo/dark-logo.png";

import productImg1 from "../../../assets/img/shop/1.jpg";
import productImg2 from "../../../assets/img/shop/2.jpg";
import Login from "../../../pages/login";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";

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

  const canvasMenuAdd = () => {
    document.body.classList.add("nav-expanded");
  };

  const alarmExpand = () => {
    setAlarmVisible(!alarmVisible);
  };

  const [waitList, setWaitList] = useState();
  const [managedClassroom, setManagedClassroom] = useState();
  const [isLoading, setIsLoading] = useState(true);


    const fetchManagesClassRoom = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${userId}`);
            console.log(response.data);
            setManagedClassroom(response.data);
        } catch (err) {
            console.log("err >> ", err);
        }
    };

  const fetchWaitList = async (cid) => {
    try {
      const res1 = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`
        )
        console.log(res1.data);
        setWaitList(res1.data);
        setIsLoading(false);
      } catch (err) {
        console.log("err > ", err);
      }
      console.log(waitList);
    };

  function putclassId(cid) {
    setTimeout(() => {
      for(var i=0; i<waitList.length; i++){
        waitList[i]["classId"] = cid;
      }
      setWaitList(waitList);
      setNewAlarm(true);
    }, 1000)
  }

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
        fetchManagesClassRoom();
          if(managedClassroom){
              managedClassroom.map((classroom)=> {
                  console.log(classroom.classId);
                  fetchWaitList(classroom.classId).then(() =>{
                    putclassId(classroom.classId);
              });
              })
          }
        
    }
    }, []);

  // const alarmShrink = () => {
  //   setAlarmVisible(false);
  // }

  return (
    <React.Fragment>
      <div
        className={
          headerClass ? headerClass : "full-width-header home8-style4 main-home"
        }
      >
        <header id="rs-header" className="rs-header">
          {TopBar ? (
            <TopHeader
              topBarClass={TopBarClass}
              emailAddress={emailAddress}
              phoneNumber={phoneNumber}
              Location={Location}
            />
          ) : (
            ""
          )}

          <div
            className={
              isVisible
                ? "menu-area menu-sticky sticky"
                : "menu-area menu-sticky"
            }
            style={{ display: "flex", alignItems: "center", height: "60px" }}
          >
            <div className="container">
              <div className="row y-middle">
                <div className="col-lg-2">
                  <div className="logo-area hidden-md">
                    <Link to="/learntube/">
                      <img
                        className="normal-logo"
                        src={headerNormalLogo ? headerNormalLogo : normalLogo}
                        alt=""
                      />
                      <img
                        className="sticky-logo"
                        src={headerStickyLogo ? headerStickyLogo : darkLogo}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-7 text-start">
                  <div className="rs-menu-area" style={{ float: "left" }}>
                    <div className="main-menu">
                      <div className="mobile-menu md-display-block">
                        <Link to="/learntube/" className="mobile-normal-logo">
                          <img
                            className="normal-logo"
                            src={
                              mobileNormalLogo ? mobileNormalLogo : normalLogo
                            }
                            alt=""
                          />
                        </Link>
                        <Link to="/learntube/" className="mobile-sticky-logo">
                          <img
                            src={mobileNormalLogo ? mobileNormalLogo : darkLogo}
                            alt="logo"
                          />
                        </Link>
                        <Link
                          to="#"
                          className="rs-menu-toggle"
                          onClick={() => {
                            setMenuOpen(!menuOpen);
                          }}
                        >
                          <i className="fa fa-bars"></i>
                        </Link>
                      </div>
                      <nav className="rs-menu hidden-md text-start">
                        <ul className="nav-menu">
                          <MenuItems
                            parentMenu={parentMenu}
                            // secondParentMenu={secondParentMenu}
                            // activeMenu={activeMenu}
                          />{" "}
                        </ul>{" "}
                        {/* <span className="ml-190">
                          <Login />{" "}
                        </span> */}
                      </nav>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>

                <div className="col-lg-3 relative text-end hidden-md">
                  <div className="expand-btn-inner search-icon">
                    {/* 원래 로그인 헤더 위치 */}
                    {userId ? null : <Login />}
                    <ul className="expand-items">
                      {/* <li className="sidebarmenu-search">
                        <Link
                          to="#"
                          onClick={searchModalAdd}
                          className="rs-search"
                          href="#"
                        >
                          {" "}
                          <i className="flaticon-search"></i>
                        </Link>
                      </li> */}
                      <li>
                        {/* <a
                          onClick={canvasMenuAdd}
                          id="nav-expander"
                          className="nav-expander"
                          href="#"
                        > */}
                        {userId && newAlarm ? (
                          <FaBell
                            size="24"
                            style={{ color: "white" }}
                            className="mr-10"
                            onClick={alarmExpand}
                          />
                        )
                        :
                        (
                          <FaBell
                            size="24"
                            className="mr-10 notification"
                            onClick={alarmExpand}
                          />
                        )
                      }
                        {userId ? (
                          <BsFillPersonFill
                            onMouseOver={canvasMenuAdd}
                            size="24"
                            style={{ color: "white" }}
                          />
                        ) : null}

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

          <RSMobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            parentMenu={parentMenu}
            secondParentMenu={secondParentMenu}
          />
          <div
            onClick={() => setMenuOpen(false)}
            className={menuOpen ? "body-overlay show" : "body-overlay"}
          ></div>
        </header>
        {
          alarmVisible ?
          (
            <div style={{display:"block", position: "absolute", right: "19%", width: "350px", background: "white", border: "1px solid gray", borderBottom: "none", zIndex: "999"}}>
              <ul
                style={{
                  textAlign: "left",
                  // color: "black !important",
                  fontSize: "1.1rem",
                }}
                className={waitList ? null : "mt-10 pb-10 border-bottom border-dark"}
              >
                  {waitList ?
                    waitList.map((waiting, i) => (
                        <li style={{borderBottom: "1px solid black", padding: "5px 0px 5px 15px"}} onClick={() => console.log(waiting.classId)}>
                          <Link to={{
                            pathname: `/learntube/course/manage`,
                            state: { 
                                classId: waiting.classId,
                            }
                          }}>
                            {waiting.username + " 님께서 수강신청하셨습니다."}</Link></li>
                    ))
                    :
                    (<span style={{padding: "5px 0px 5px 15px"}}>새로운 알림이 없습니다</span>)
                  }
              </ul>
            </div>
          )
          :
          null
        }
        <CanvasMenu
          canvasClass={
            CanvasClass
              ? CanvasClass
              : "right_menu_togle orange_color hidden-md"
          }
          canvasLogo={CanvasLogo ? CanvasLogo : darkLogo}
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
