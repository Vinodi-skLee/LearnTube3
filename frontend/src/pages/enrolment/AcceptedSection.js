import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";

const AcceptedPart = (props) => {
  const location = useLocation();
  const [acceptedList, setAcceptedList] = useState([]);
  let cid = location.state.classId;
  console.log("cid", cid);

  useEffect(() => {
    if (props.userId) {
      const fetchAcceptedList = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/classroom/accepted-list?classId=${cid}`
          );
          console.log(result.data);
          setAcceptedList(result.data);
        } catch (err) {
          console.log("err >> ", err);
        }
      };
      fetchAcceptedList();
    }
  }, [props.userId]);
  // acceptedList 가 데이터 들고온 거임
  return (
    <div
      id="rs-popular-course"
      className="rs-popular-courses list-view style1 course-view-style orange-style rs-inner-blog white-bg pb-100 md-pt-70 md-pb-80 text-start"
    >
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
                  <th>user name</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {acceptedList
                  ? // 여기에 리스트 꾸며줘
                    acceptedList.map((accepting, i) => (
                      <tr>
                        <td>{acceptedList[i].username}</td>
                        <td>{acceptedList[i].email}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>

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

export default AcceptedPart;
