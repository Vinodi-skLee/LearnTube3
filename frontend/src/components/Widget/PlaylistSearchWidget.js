import React from "react";

const PlaylistSearchWidget = () => {
    return (
        <div className="p-0 search-widget" style={{ background: "none", boxShadow: "none" }}>
            <div className="search-wrap" style={{ width: "300px", height: "40px", left: "90px" }}>
                <input type="search" placeholder="플레이리스트 이름 검색" name="s" className="search-input" val="" style={{ padding: "4px" }} />
                <button className="p-2" type="submit" value="Search" style={{ fontSize: "10px" }}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    );
};

export default PlaylistSearchWidget;
