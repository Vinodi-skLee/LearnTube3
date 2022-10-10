import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import RSMobileMenu from "./RSMobileMenu";
import CanvasMenu from "./CanvasMenu";
import TopHeader from "./TopBar";
import { AiOutlineBell } from "react-icons/ai";
import { IoAlert, IoNotificationsOff } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import Modal from "react-modal";
import { Button, FormSelect } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

import normalLogo from "../../../assets/img/logo/lite-logo.png";
import darkLogo from "../../../assets/img/logo/dark-logo.png";

import productImg1 from "../../../assets/img/shop/1.jpg";
import productImg2 from "../../../assets/img/shop/2.jpg";
import Login from "../../../pages/login";
import { borderRight } from "@mui/system";
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

  const history = useHistory();

  const [menuOpen, setMenuOpen] = useState(false);
  // const [managesData, setManagesData] = useState(null);
  // const [waitList, setWaitList] = useState(null);
  const [waitUsers, setWaitUsers] = useState([]);
  const [waitClassRoom, setWaitClassRoom] = useState([]);
  const [isOpen, setIsOpen] = useState();
  const openModal = () => setIsOpen(!isOpen);

  const uid = window.sessionStorage.getItem("userId");

  let check = 0;

  console.log("userid=========", uid);

  // useEffect(() => {
  //   if (uid) {
  //     const fetchManagesClassRoom = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${uid}`
  //         );
  //         console.log("관리중인 강의실============>", response.data);
  //         setManagesData(response.data);
  //       } catch (err) {
  //         console.log("err >> ", err);
  //       }
  //     };
  //     fetchManagesClassRoom();
  //   }
  // }, [uid]);

  // useEffect(() => {
  //   if (managesData) {
  //     //cid = managesData[0].classId;
  //     console.log(managesData.length);
  //     const fetchWaitList = async () => {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`
  //       );
  //       console.log("대기인원===============>", res.data);
  //       setWaitList(res.data);
  //     };
  //     managesData.map(
  //       (data, i) => ((cid = managesData[i].classId), fetchWaitList())
  //     );
  //   }
  // }, [managesData]);

  useEffect(() => {
    if (uid) {
      const fetchAlarm = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-users?userId=${uid}`
          );
          setWaitUsers(response.data);
        } catch (err) {
          console.log("err >> ", err);
        }
      };
      fetchAlarm();
    }
  }, [uid]);

  useEffect(() => {
    const showWaitClassRoom = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${uid}`
        );
        setWaitClassRoom(response.data);
        console.log("waitclassroom ===========>", response.data);
      } catch (err) {
        console.log("err >> ", err);
      }
    };
    showWaitClassRoom();
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Sticky is displayed after scrolling for 100 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const searchModalAdd = () => {
    document.body.classList.add("modal-open");
  };

  const canvasMenuAdd = () => {
    document.body.classList.add("nav-expanded");
  };

  return (
    <React.Fragment>
      {/* 모달 */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          openModal();
        }}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            zIndex: "100",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(0, 0, 0, 0.55)",
          },
          content: {
            position: "absolute",
            top: "20%",
            left: "25%",
            right: "25%",
            bottom: "20%",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div className="">
          <div className="register-section ">
            <div className="container">
              <div className="py-3 px-5">
                <div className="sec-title text-center mb-10">
                  <h2 className="title mt-3 mb-10">수강대기 강의</h2>
                  <Table
                    bordered
                    hover
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>number</th>
                        <th>className</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitClassRoom.map((data, i) => (
                        <tr
                          onClick={() => {
                            history.replace({
                              pathname: "/learntube/course/course-single",
                              state: {
                                classId: waitClassRoom[i].classId,
                              },
                            });
                          }}
                        >
                          <td>
                            <p>{i}</p>
                          </td>
                          <td>
                            <p>{waitClassRoom[i].className}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="styled-form">
                  <div id="form-messages"></div>

                  <form id="contact-form">
                    <div className="row clearfix">
                      <div className="form-group col-lg-12 mb-25"></div>
                    </div>

                    <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                      <Button
                        onClick={() => {
                          openModal();
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 모달 end */}

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
                    {/* alert-icon */}
                    {/* <div onClick={openModal}>
                      <AiOutlineBell />
                    </div> */}
                    {waitUsers.length === 0 ? (
                      <IoNotificationsOff />
                    ) : (
                      <div onClick={openModal}>
                        <MdNotificationsActive />
                      </div>
                    )}
                    {waitUsers
                      ? console.log("waitUsers=========", waitUsers)
                      : null}
                    <Login />
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
                        <a
                          onClick={canvasMenuAdd}
                          id="nav-expander"
                          className="nav-expander"
                          href="#"
                        >
                          <span className="dot1"></span>
                          <span className="dot2"></span>
                          <span className="dot3"></span>
                        </a>
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
