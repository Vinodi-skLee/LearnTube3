import React from "react";
import CoursePartClosed from "./CourseSectionClosed";
import ScrollToTop from "../../components/Common/ScrollTop";
import { BiTrash } from "react-icons/bi";
const CourseMainClosed = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <h4 className="justify-content-start align-items-center">
          <BiTrash /> 종료된 강의실
        </h4>
      </div>
      {/* CoursePart Start */}
      <CoursePartClosed userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
};

export default CourseMainClosed;
