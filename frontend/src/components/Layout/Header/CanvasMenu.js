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
import CourseSection from "../../../pages/dashboard/CourseSection";
import CourseMainAdmin from "../../../pages/dashboard/CourseMainAdmin";
import CourseMainClosed from "../../../pages/dashboard/CourseMainClosed";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AiOutlinePlayCircle } from "react-icons/ai";
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

  const clickDashBoard = () => {
    if (id) {
      history.replace({
        pathname: "/learntube/dashboard",
      });
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  return (
    <React.Fragment>
      <nav className={canvasClass} onMouseLeave={canvasMenuRemove}>
        <Login />
        <ul
          style={{
            backgroundColor: "#f8f9fa",
            textAlign: "left",
            color: "black",
          }}
        >
          <li>
            <Link onClick={clickDashBoard}>
              <AiOutlinePlayCircle />
              {tab1}
              {/* <CourseSection userId={userId} /> */}
            </Link>
          </li>
          <li>
            <Link onClick={clickDashBoard}>{tab2}</Link>
          </li>
          <li>
            <Link onClick={clickDashBoard}>{tab3}</Link>
          </li>
        </ul>
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
