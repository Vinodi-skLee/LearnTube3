import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import Modal from "react-modal";
import axios from "axios";
import UpdateNotice from '../../../components/Modal/UpdateNotice';
import DeleteNotice from '../../../components/Modal/DeleteNotice';

function NoticeCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);
  return (
    <Card border = "dark" style={{ width: '40rem', margin:'auto'}}>
      <Card.Body onClick={openModal}>
        <Modal
            isOpen={isOpen}
            onClose={() => {
                openModal();
            }}
            onRequestClose={() => setIsOpen(false)}
            style={{
                    overlay: {
                    zIndex: "100",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgb(0, 0, 0, 0.55)",
                },
                content: {
                    position: "absolute",
                    top: "20%",
                    left: "30%",
                    right: "30%",
                    bottom: "20%",
                    background: "#fff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    outline: "none",
                    padding: "0px",
                },
            }}
        >
            <div className="">
                <div className="register-section ">
                    <div className="container">
                        <div className="py-3 px-5">
                            <div
                                className="sec-title text-center mb-10"
                                style={{
                                    paddingBottom: "0.7rem",
                                }}
                            >
                                <h3 className="title mt-3 mb-10">Notice</h3>
                                <hr></hr>
                            </div>
                            <div className="styled-form">
                                <div id="form-messages"></div>
                                <form id="contact-form" method="post" action="#">
                                    <div className="row clearfix">
                                        <div
                                            className="title mt-3 mb-10"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                paddingBottom: "1rem",
                                            }}
                                        >
                                            {props.notice.title}
                                        </div>
                                        <div
                                            className="form-group col-lg-12 mb-25"
                                            style={{
                                                paddingBottom: "3rem",
                                            }}
                                        >
                                            <div
                                                className="my-2"
                                                style={{
                                                    fontSize: "17px",
                                                }}
                                            >
                                                {props.notice.content}
                                                {props.instructor_id}
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <p className="text-muted">
                                        최종 업로드:
                                        {props.notice.modDate.split("T")[0] +
                                            " " +
                                            props.notice.modDate.split("T")[1].split(":")[0] +
                                            ":" +
                                            props.notice.modDate.split("T")[1].split(":")[1]}
                                    </p>
                                    <hr></hr>
                                    <div className="row d-flex justify-content-end ms-3 me-1 mt-3">
                                        <button
                                            type="submit"
                                            className="createbtn text-center pt-2"
                                            onClick={() => {
                                                openModal();
                                            }}
                                        >
                                            <span className="txt">확인</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        <Card.Title>{props.notice.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.notice.modDate.split("T")[0]}</Card.Subtitle>
        <Card.Text>
        {props.notice.content}
        </Card.Text>
        <div style={{display:'table-row'}}>
            <div style={{display:'table-cell'}}>
                <UpdateNotice notice = {props.notice} instructorId = {props.instructorId} userId = {props.userId}/>
            </div>
            <div style={{display:'table-cell'}}>
                <DeleteNotice notice = {props.notices} i = {props.i} instructorId = {props.instructorId} userId = {props.userId}/>
            </div>
        </div>
      </Card.Body>
    </Card>
  );
    {/* 공지 모달 open */}
}

export default NoticeCard;