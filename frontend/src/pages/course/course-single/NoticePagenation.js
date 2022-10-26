import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../../../assets/css/pagenation.css";
import { Button } from "react-bootstrap";

const NoticePagination = ({ page, count, setPage }) => {
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={3}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(page) => {
                setPage(page);
            }}
        />
    );
};

export default NoticePagination;
