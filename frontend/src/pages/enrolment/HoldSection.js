import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import CourseDashBoard from "../../components/Courses/CourseDashBoard";


const HoldPart = (props) => {
  //const [takesData, setTakesData] = useState(null);
  const location = useLocation();
  const [waitList, setWaitList] = useState();
  const [sidList, setSidList] = useState([]);
  const [rejectList, setRejectList] = useState([]);
  let cid = location.state.classId;
  const [hasReject, setHasReject] = useState(false);
  
  
  const acceptAll = async () => {
    let body = {
      classId: cid,
    };
    const response = await axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/classroom/accept-all`,
      JSON.stringify(body),
      {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));
      alert("모두 수락 완료!");
      window.location.reload();
  };

  const rejectAll = async () => {
    let body = {
      classId: cid,
    };
    const response = await axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/classroom/reject-all`,
      JSON.stringify(body),
      {
          headers: {
            "Content-Type": "application/json",
          },
        }
        )
        .then((res) => console.log(res));
        alert("모두 거절 완료!");
        window.location.reload();
      };
      
      const pressOkay = async () => {
        if(sidList.length!=0) {
      await Promise.all(
        sidList.map(async (sid) => {
          let body = {
            takeId: sid
          };
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/classroom/accept`,
            JSON.stringify(body),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
            )
          })
          )
        }
        if(rejectList.length!=0) {
          await Promise.all(
        rejectList.map(async (sid) => {
          let body = {
            takeId: sid
          };
          const response = axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/classroom/reject`,
            JSON.stringify(body),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
            )
          })
          )
        }
        window.location.reload();
      }
      
      const useConfirm = (message="", onConfirm, onCancel) => {
        if(!onConfirm || typeof onConfirm !== "function") {
          return;
        }
        if(onCancel && typeof onCancel !== "function") {
          return;
        }
        const confirmAction = () => {
          if(window.confirm(message))
            onConfirm();
          else
            onCancel();
          return 
        };
        return confirmAction;
      };

    
      const cancelOkay = () => {
        alert("취소되었습니다");
      }
      const confirmDelete = useConfirm("거절하시겠습니까?", pressOkay, cancelOkay);
      const confirmDeleteAll = useConfirm("모두 거절하시겠습니까?", rejectAll,cancelOkay);
    
      useEffect(() => {
        if (props.userId) {
          const fetchWaitList = async () => {
            try {
              const res1 = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/classroom/wait-list?classId=${cid}`
                );
                console.log(res1.data);
                setWaitList(res1.data);
              } catch (err) {
                console.log("err >> ", err);
              }
            };
            fetchWaitList();
          }
        }, [props.userId]);
        
    const acceptCheckboxHandler = (e) => {
      
      if(sidList.includes(e.target.value)) {
      e.preventDefault();
    }
    else {
      if(rejectList.includes(e.target.value)) {
        const idx = rejectList.indexOf(e.target.value);
        if(idx>-1)
        rejectList.splice(idx,1);
      }
      if(!rejectList.length)
      setHasReject(false);
      else
        setHasReject(true);
      sidList.push(e.target.value);
    }
    console.log("sidList: ", sidList);
    console.log("rejectList", rejectList);
  }
  const rejectCheckboxHandler = (e) => {
    if(rejectList.includes(e.target.value)) {
      e.preventDefault();
    }
    else {
      if(sidList.includes(e.target.value)) {
        const idx = sidList.indexOf(e.target.value);
        if(idx > -1)
        sidList.splice(idx,1);
      }
      rejectList.push(e.target.value);
      if(!rejectList.length)
      setHasReject(false);
      else
        setHasReject(true);
    }
    console.log("rejectList: ", rejectList);
    console.log("sidList: ", sidList);
  }

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
                  <th>accept</th>
                  <th>reject</th>
                </tr>
              </thead>
              <tbody>
                {waitList
                  ? // 여기에 리스트 꾸며줘
                    waitList.map((waiting, i) => (
                      <tr>
                        <td>{waitList[i].username}</td>
                        <td>{waitList[i].email}</td>
                        <td>
                          <input type="radio" name={waitList[i].userId} onClick={acceptCheckboxHandler} value={waitList[i].takeId}/>
                        </td>
                        <td>
                          <input type="radio" name={waitList[i].userId} onClick={rejectCheckboxHandler} value={waitList[i].takeId}/>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
            <div>
              <Button onClick={acceptAll} style={{ marginRight: "10px" }}>
                모두 허락
              </Button>
              <Button variant="secondary" onClick={confirmDeleteAll} active>
                모두 거절
              </Button>
              {!hasReject ? <Button
                style={{
                  float: "right",
                }}
                onClick={pressOkay}
              >
                확인
              </Button> : <Button
                style={{
                  float: "right",
                }}
                onClick={confirmDelete}
              >
                확인
              </Button> }
            </div>
            <div className="pagination-area orange-color text-center mt-30 md-mt-0">
              {/* <ul className="pagination-part">
                <li className="active">
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">2</Link>
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
    </div>
  );
};

export default HoldPart;
