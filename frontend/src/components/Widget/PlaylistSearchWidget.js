import React, { useState } from "react";

const PlaylistSearchWidget = ({ findSearchData }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className="search-widget"
      style={{ background: "none", boxShadow: "none" }}
    >
      <div
        className="search-wrap"
        style={{ width: "280px" }}
        // style={{ width: "280px", height: "55px", left: "110px" }}
      >
        <input
          type="search"
          placeholder="플레이리스트 검색..."
          name="s"
          onChange={onChangeSearch}
          style={{ padding: "4px" }}
        />
        <button
          className="p-2"
          type="submit"
          onClick={() => findSearchData(search)}
          style={{ fontSize: "10px" }}
        >
          <i
            className="fa fa-search"
            style={{ background: "white", borderRadius: "20px" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default PlaylistSearchWidget;
