import React, { useEffect, useState } from "react";
import AcceptedPart from "./AcceptedSection";
import ScrollToTop from "../../components/Common/ScrollTop";
function AcceptedMain(props) {
  // console.log("test" + props.userId);
  return (
    <React.Fragment>
      {/* CoursePart Start */}
      <AcceptedPart userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
}

export default AcceptedMain;
