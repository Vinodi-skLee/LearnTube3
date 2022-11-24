import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const AcceptedPart = (props) => {
  const location = useLocation();
  const [acceptedList, setAcceptedList] = useState([]);
  // let cid = location.state.classId;
  // console.log("cid", cid);
  const userId = window.sessionStorage.getItem("userId");
  const [managedClassroom, setManagedClassroom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let index = 0;

  const fetchManagesClassRoom = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/classroom/manages?userId=${userId}`
      );
      // await setManagedClassroom(response.data);
      // console.log(response.data);
      for (const prop in response.data) {
        // console.log(prop);
        managedClassroom[prop] = response.data[prop];
      }
      console.log(managedClassroom);
    } catch (err) {
      // console.log("err >> ", err);
    }
  };

  const fetchAcceptedList = async (cid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/classroom/accepted-list?classId=${cid}`
      );
      // console.log(response.data);
      for (const prop in response.data) {
        acceptedList[index] = response.data[prop];
        acceptedList[index]["classId"] = cid;
        index++;
      }
    } catch (err) {
      // console.log("err >> ", err);
    }
  };

  // function putclassId(cid) {
  //   for (var i = index; i < acceptedList.length; i++) {
  //       acceptedList[i]["classId"] = cid;
  //   }
  // }

  useEffect(() => {
    if (userId) {
      fetchManagesClassRoom();
      console.log(managedClassroom);
      setTimeout(() => {
        if (managedClassroom) {
          managedClassroom.map((classroom) => {
            console.log(classroom);
            fetchAcceptedList(classroom.classId).then(() => {
              console.log(classroom.classId);
              // putclassId(classroom.classId);
            });
          });
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      }, 300);
    }
  }, [userId]);
  // acceptedList 가 데이터 들고온 거임
  return (
    <div
      id="rs-popular-course"
      className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog white-bg pb-100 md-pt-70 md-pb-80 text-start"
    >
      {isLoading ? (
        <div class="text-center" style={{ marginTop: "10%", height: "30rem" }}>
          <Spinner
            animation="grow"
            variant="secondary"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="pr-50 md-pr-14">
              <div style={{ margin: "15px" }}></div>

              <Table
                bordered
                hover
                style={{
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>강의실</th>
                    <th>이름</th>
                    <th>이메일</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedList
                    ? // 여기에 리스트 꾸며줘
                      acceptedList.map((accepted) => (
                        <tr>
                          {managedClassroom.map((classroom) => {
                            console.log(accepted);
                            if (accepted.classId === classroom.classId)
                              return <td>{classroom.className}</td>;
                          })}
                          <td>{accepted.username}</td>
                          <td>{accepted.email}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>

              <div className="pagination-area orange-color text-center mt-30 md-mt-0">
                {/* <ul className="pagination-part">
                <li className="active">
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">
                    Next <i className="fa fa-long-arrow-right"></i>
                  </Link>
                </li>
              </ul> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedPart;
