import React, { useEffect, useState } from "react";
import CoursePart from "../dashboard/CourseSection";
import ScrollToTop from "../../components/Common/ScrollTop";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";
function CourseMain(props) {
  // console.log("test" + props.userId);
  return (
    <React.Fragment>
      <div className="d-flex">
        <h4 className="justify-content-start align-items-center">
          <BsFillPlayCircleFill /> 수강중인 강의실
        </h4>
      </div>
      {/* CoursePart Start */}
      <CoursePart userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
}

export default CourseMain;
