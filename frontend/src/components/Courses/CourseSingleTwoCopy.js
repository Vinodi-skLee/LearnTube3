import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import logo from "../../assets/img/logo/img-background.png";

const CourseSingleTwoCopy = (props) => {
  const {
    courseId,
    courseClass,
    courseImg,
    courseTitle,
    userCount,
    openDate,
    creatorName,
  } = props;

  const getDateDiff = (date) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (1 + today.getMonth())).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let secondDate = year + month + day;
    let firstDate = date.split("-").join("");
    var firstDateObj = new Date(
      firstDate.substring(0, 4),
      firstDate.substring(4, 6) - 1,
      firstDate.substring(6, 8)
    );
    var secondDateObj = new Date(
      secondDate.substring(0, 4),
      secondDate.substring(4, 6) - 1,
      secondDate.substring(6, 8)
    );
    var betweenTime = Math.abs(
      secondDateObj.getTime() - firstDateObj.getTime()
    );

    let result = Math.floor(betweenTime / (1000 * 60 * 60 * 24));
    // console.log(result);
    if (result > 30) return "";
    else return "New";
  };

  return (
    <div className={courseClass ? courseClass : "courses-item"}>
      <div className="img-part content-part">
        {courseImg ? (
          <img
            style={{ width: "400px", height: "200px" }}
            src={courseImg}
            alt={courseTitle}
          />
        ) : (
          <div
            className="background-wrap"
            style={{
              display: "flex",
              backgroundSize: "cover",
              backgroundImage: `url(${logo})`,
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "400px",
                height: "200px",
                lineHeight: "200px",
                textAlign: "center",
                color: "#404040",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Nunito, sans-serif;",
              }}
            >
              {courseTitle}
            </span>
          </div>
        )}
        {getDateDiff(openDate) === "New" ? (
          <ul className="meta-part new-part">
            <li>
              <span className="price" style={{ background: "#ff614d" }}>
                New
              </span>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="content-part">
        <h4 className="title title-mk" data-for={courseTitle} data-tip>
          {courseTitle ? courseTitle : "강의의 제목이 설정되지 않았습니다."}
          {/* <Link
                        to={{
                            pathname: "/learntube/course/course-single",
                            state: { classId: courseId },
                        }}
                    >
                        {courseTitle ? courseTitle : "강의의 제목이 설정되지 않았습니다."}
                    </Link> */}
        </h4>
        <ReactTooltip id={courseTitle}>{courseTitle}</ReactTooltip>
        <div className="bottom-part">
          <div className="info-meta">
            <p className="creatorName">{creatorName ? creatorName : "-"}</p>
            <ul>
              <li className="user">
                <i className="fa fa-user"></i> {userCount}
              </li>
              <li className="ratings">
                <span>{openDate ? "생성일 : " + openDate : "-"}</span>
              </li>
            </ul>
          </div>
          <div className="btn-part">
            <Link to="/learntube/course/course-single">
              {props.btnText}
              <i className="flaticon-right-arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingleTwoCopy;
