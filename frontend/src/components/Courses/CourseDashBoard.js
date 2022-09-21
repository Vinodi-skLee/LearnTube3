import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import logo from "../../assets/img/logo/img-background.png";

const CourseDashBoard = (props) => {
    const { courseClass, courseImg, courseTitle, progress, userCount, notice, creatorName, openDate, classId } = props;
    // const [noImg, setNoImg] = useState(false);

    const getDateDiff = (date) => {
        let today = new Date();
        let year = today.getFullYear();
        let month = ("0" + (1 + today.getMonth())).slice(-2);
        let day = ("0" + today.getDate()).slice(-2);

        let secondDate = year + month + day;
        let firstDate = date.split("-").join("");
        var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
        var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
        var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());

        let result = Math.floor(betweenTime / (1000 * 60 * 60 * 24));
        console.log(result);
        if (result > 30) return "";
        else return "New";
    };

    return (
        <div className={courseClass ? courseClass : "courses-item"}>
            <div className="img-part content-part">
                {courseImg ? (
                    <img style={{ width: "300px", height: "170px" }} src={courseImg} alt={courseTitle} />
                ) : (
                    <div className="background-wrap" style={{ display: "flex", backgroundSize: "cover", backgroundImage: `url(${logo})`, width: "275px", height: "170px", borderRadius: "5px" }}>
                        <span
                            style={{
                                display: "inline-block",
                                width: "275px",
                                height: "170px",
                                lineHeight: "170px",
                                textAlign: "center",
                                color: "#404040",
                                fontWeight: "bold",
                                fontSize: "18px",
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
                            <span className="price">New</span>
                        </li>
                    </ul>
                ) : null}
            </div>

            <div className="content-part" style={{ width: "80%" }}>
                <div className="row">
                    <h3 className="title" onClick={() => {}}>
                        <Link
                            to={{
                                pathname: "/learntube/course/course-single",
                                state: { classId: classId },
                            }}
                        >
                            {courseTitle ? courseTitle : "강의제목"}
                        </Link>
                    </h3>
                    <p className="creatorName text-end">{creatorName ? creatorName : "-"}</p>
                </div>
                <ul className="meta-part text-start">
                    <li>학습현황</li>
                    <li>
                        <ProgressBar now={progress} label={`${progress}%`} />
                    </li>
                </ul>
                <div className="info-meta">
                    <div className="row">
                        <div className="col">
                            <ul>
                                <li className="user">
                                    <i className="fa fa-bullhorn"></i>공지
                                </li>
                                <li className="notice">
                                    <span>{notice ? notice : "공지가 없습니다."}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="pull-right">
                                <li className="user">
                                    <i className="fa fa-user"></i> {userCount ? userCount : 0}
                                </li>
                                <li className="date">
                                    <span>{openDate ? openDate : "-"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDashBoard;
