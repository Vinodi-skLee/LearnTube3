import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RejectedPart = (props) => {
  //const [takesData, setTakesData] = useState(null);

  //   useEffect(() => {
  //     if (props.userId) {
  //       const fetchTakesClassRoom = async () => {
  //         try {
  //           const response = await axios.get(
  //             `${process.env.REACT_APP_SERVER_URL}/api/classroom/takes?userId=${props.userId}`
  //           );
  //           // console.log(response.data);
  //           setTakesData(response.data);
  //         } catch (err) {
  //           console.log("err >> ", err);
  //         }
  //       };
  //       fetchTakesClassRoom();
  //     }
  //   }, [props.userId]);

  return (
    <div
      id="rs-popular-course"
      className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog white-bg pb-100 md-pt-70 md-pb-80 text-start"
    >
      <div className="container">
        <div className="row">
          <div className="pr-50 md-pr-14">
            <div style={{ margin: "15px" }}></div>
            {/* {takesData
              ? takesData.map((takeData, i) => (
                  <div className="course-part clearfix m-0">
                    <CourseDashBoard
                      courseClass="courses-item"
                      courseImg={takesData[i].image}
                      courseTitle={takesData[i].className}
                      notice={takesData[i].latestNotice}
                      progress={0}
                      userCount={takesData[i].numberOfTake}
                      openDate={takesData[i].classRoomRegDate.split("T")[0]}
                      creatorName={takesData[i].instructorName}
                      classId={takesData[i].classId}
                    />
                  </div>
                ))
              : null} */}
            <div className="pagination-area orange-color text-center mt-30 md-mt-0">
              <ul className="pagination-part">
                <li className="active">
                  <Link to="#">1</Link>
                </li>
                {/* <li>
                                    <Link to="#">2</Link>
                                </li> */}
                <li>
                  <Link to="#">
                    Next <i className="fa fa-long-arrow-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedPart;
