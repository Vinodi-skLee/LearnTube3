import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
//import CourseDashBoard from "../../components/Courses/CourseDashBoard";

const HoldPart = (props) => {
  //const [takesData, setTakesData] = useState(null);
  const location = useLocation();
  const [waitList, setWaitList] = useState();
  let cid = location.state.classId;

  const acceptAll = async() => {
    let body = {
      classId: cid
    };
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/accept-all`,
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
    alert("모두 수락 완료!");
    window.location.reload();
  }

  const rejectAll = async() => {
    let body = {
      classId: cid
    };
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/classroom/reject-all`,
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
    alert("모두 거절 완료!");
    window.location.reload();
  }

  useEffect(() => {
    if(props.userId) {
      const fetchWaitList = async() => {
        try {
          const res1 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`);
          console.log(res1.data);
          setWaitList(res1.data);
        } catch (err) {
          console.log("err >> ", err);
        }
      };
      fetchWaitList();
    }
  },[props.userId]);
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
            {waitList 
            // 여기에 리스트 꾸며줘
            ? waitList.map((waiting,i) => (
              <div>{waitList[i].username}</div>
            )):null }
            <Button onClick={acceptAll}>모두 허락</Button>
            <Button variant="secondary" onClick={rejectAll} active>모두 거절</Button>
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

export default HoldPart;
