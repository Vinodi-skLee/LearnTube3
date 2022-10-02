import React, { useEffect, useState } from "react";
import RejectedPart from "./RejectedSection";
import ScrollToTop from "../../components/Common/ScrollTop";
function RejectedMain(props) {
  // console.log("test" + props.userId);
  return (
    <React.Fragment>
      {/* CoursePart Start */}
      <RejectedPart userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
}

export default RejectedMain;
