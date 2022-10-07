import React from "react";
import HoldPart from "./HoldSection";
import ScrollToTop from "../../components/Common/ScrollTop";
function HoldMain(props) {
  // console.log("test" + props.userId);
  return (
    <React.Fragment>
      {/* CoursePart Start */}
      <HoldPart userId={props.userId} />
      {/* CoursePart End */}

      {/* scrolltop-start */}
      <ScrollToTop scrollClassName="scrollup orange-color" />
      {/* scrolltop-end */}
    </React.Fragment>
  );
}

export default HoldMain;
