import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useHistory } from "react-router-dom";

import galleryLogo1 from "../../../assets/img/gallery/1.jpg";
import galleryLogo2 from "../../../assets/img/gallery/2.jpg";
import galleryLogo3 from "../../../assets/img/gallery/3.jpg";
import galleryLogo4 from "../../../assets/img/gallery/4.jpg";
import galleryLogo5 from "../../../assets/img/gallery/5.jpg";
import galleryLogo6 from "../../../assets/img/gallery/6.jpg";
import mapImg from "../../../assets/img/map.jpg";
import Login from "../../../pages/login";
import CourseMain from "../../../pages/dashboard-main/CourseMain";
import CourseMainAdmin from "../../../pages/dashboard/CourseMainAdmin";
import CourseMainClosed from "../../../pages/dashboard/CourseMainClosed";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  AiOutlinePlayCircle,
  AiOutlineSetting,
  AiOutlineAlert,
  AiOutlineInbox,
} from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
const photos = [
  {
    src: galleryLogo1,
    width: 1,
    height: 1,
  },
  {
    src: galleryLogo2,
    width: 1,
    height: 1,
  },
  {
    src: galleryLogo3,
    width: 1,
    height: 1,
  },
  {
    src: galleryLogo4,
    width: 1,
    height: 1,
  },
  {
    src: galleryLogo5,
    width: 1,
    height: 1,
  },
  {
    src: galleryLogo6,
    width: 1,
    height: 1,
  },
];
const userId = window.sessionStorage.getItem("userId");
let tab1 = "수강중인 강의실",
  tab2 = "관리중인 강의실",
  tab3 = "종료된 강의실",
  tab4 = "강의실 학생 관리",
  tabStyle = "intro-tabs tabs-box";
const CanvasMenu = (props) => {
  const { canvasClass, canvasLogo } = props;

  const canvasMenuRemove = () => {
    document.body.classList.remove("nav-expanded");
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  let id = window.sessionStorage.getItem("userId");
  const history = useHistory();

  return (
    <React.Fragment>
      <nav className={canvasClass} onMouseLeave={canvasMenuRemove}>
        <div className="d-flex mt-10 mb-10 black-color ps-4 align-items-center">
          {window.sessionStorage.getItem("name") ? (
            <div>
              {window.sessionStorage.getItem("name") + "님"} <HiHome />
            </div>
          ) : (
            window.sessionStorage.getItem("name")
          )}
        </div>
        <ul
          style={{
            backgroundColor: "#f8f9fa",
            textAlign: "left",
            // color: "black !important",
            fontSize: "1.1rem",
          }}
          className="ps-3 mt-10 mb-10 "
        >
          <li className="p-2 ">
            <Link to="/learntube/course-main" className="mypageBtn">
              <AiOutlinePlayCircle />
              &ensp;
              {tab1}
            </Link>
          </li>
          <li className="p-2 ">
            <Link to="/learntube/course-admin" className="mypageBtn">
              <AiOutlineInbox />
              &ensp;
              {tab2}
            </Link>
          </li>
          <li className="p-2 ">
            <Link to="/learntube/course-closed" className="mypageBtn">
              <BiTrash />
              &ensp;
              {tab3}
            </Link>
          </li>
          {/* 
          <li className="p-2">
            <AiOutlineSetting />
            {tab4}
          </li> */}
        </ul>
        <div className="ps-3 p-0 logoutbtn">
          <Login />
        </div>

        {/* <TabPanel>
            <CourseMain userId={userId} />
          </TabPanel>
          <TabPanel>
            <CourseMainAdmin userId={userId} />
          </TabPanel>
          <TabPanel>
            <CourseMainClosed userId={userId} />
          </TabPanel> */}
        {/* <div className="close-btn">
          <div onClick={canvasMenuRemove} id="nav-close">
            <div className="line">
              <span className="line1"></span>
              <span className="line2"></span>
            </div>
          </div>
        </div> */}
        {/* <div className="canvas-logo">
          <Link to="/learntube/">
            <img src={canvasLogo} alt="logo" />
          </Link>
        </div>
        <div className="offcanvas-text">
          <p>
            We denounce with righteous indige nationality and dislike men who
            are so beguiled and demo by the charms of pleasure of the moment
            data com so blinded by desire.
          </p>
        </div>
        <div className="offcanvas-gallery">
          <Gallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
        <div className="map-img">
          <img src={mapImg} alt="" />
        </div>
        <div className="canvas-contact">
          <ul className="social">
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
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </React.Fragment>
  );
};

export default CanvasMenu;
