import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import OffWrap from "../../components/Layout/Header/OffWrap";
import SearchModal from "../../components/Layout/Header/SearchModal";
import HoldMain from "./HoldMain";
import AcceptedMain from "./AcceptedMain";
import RejectedMain from "./RejectedMain";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Image
import Logo from "../../assets/img/logo/Learntube-logos_transparent.png";
import footerLogo from "../../assets/img/logo/lite-logo.png";

const CourseOne = (props) => {
  const userId = window.sessionStorage.getItem("userId");
  let tab1 = "대기중인 학생 리스트",
    tab2 = "수강 허락된 학생 리스트",
    tab3 = "수강 거절된 학생 리스트",
    tabStyle = "intro-tabs tabs-box";
  return (
    <React.Fragment>
      <OffWrap />
      <Header
        parentMenu=""
        headerNormalLogo={Logo}
        headerStickyLogo={Logo}
        CanvasLogo={Logo}
        mobileNormalLogo={Logo}
        CanvasClass="right_menu_togle hidden-md"
        headerClass="full-width-header header-style1 home8-style4"
      />
      <div class="container text-center dashboard-tabs">
        <div className="intro-info-tabs border-none">
          <Tabs>
            <TabList className={tabStyle}>
              <Tab>
                <button>{tab1}</button>
              </Tab>
              <Tab>
                <button>{tab2}</button>
              </Tab>
              <Tab>
                <button>{tab3}</button>
              </Tab>
            </TabList>

            <TabPanel>
              <HoldMain userId={userId} />
            </TabPanel>

            <TabPanel>
              <AcceptedMain userId={userId} />
            </TabPanel>

            <TabPanel>
              <RejectedMain userId={userId} />
            </TabPanel>
          </Tabs>
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
