import React from "react";
import CoursePartAdmin from "./CourseSectionAdmin";
import ScrollToTop from "../../components/Common/ScrollTop";
import {
  AiOutlinePlayCircle,
  AiOutlineSetting,
  AiOutlineAlert,
  AiOutlineInbox,
} from "react-icons/ai";
const CourseMainAdmin = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <h4 className="justify-content-start align-items-center">
          <AiOutlineInbox /> 관리중인 강의실
        </h4>
      </div>
      {/* CoursePart Start */}
      <CoursePartAdmin userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
};

export default CourseMainAdmin;
