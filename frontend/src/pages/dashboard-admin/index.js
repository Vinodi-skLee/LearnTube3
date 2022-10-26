import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import Newsletter from "../../components/Common/Newsletter";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CourseMainAdmin from "./CourseMainAdmin";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// import '../../assets/scss/_course_single.scss';

// Image
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";

const CourseOne = (props) => {
  const userId = window.sessionStorage.getItem("userId");
  let tab1 = "수강중인 강의실",
    tab2 = "관리중인 강의실",
    tab3 = "종료된 강의실",
    tabStyle = "intro-tabs tabs-box";
  return (
    <React.Fragment>
      <OffWrap />
      <Header
        parentMenu="dashboard"
        headerNormalLogo={Logo}
        headerStickyLogo={Logo}
        CanvasLogo={Logo}
        mobileNormalLogo={Logo}
        CanvasClass="right_menu_togle hidden-md"
        headerClass="full-width-header header-style1 home8-style4"
      />
      <div class="container text-center dashboard-tabs mt-30">
        <div className="intro-info-tabs border-none">
          <CourseMainAdmin userId={userId} />
        </div>
      </div>

      <Footer
        footerClass="rs-footer home9-style main-home"
        footerLogo={footerLogo}
      />
      <SearchModal />
    </React.Fragment>
  );
};

export default CourseOne;