import React, { memo, useRef } from 'react';
import { useState } from 'react';
import 'rc-slider/assets/index.css'

const YoutubeVideoSearchWidget = memo(({ onSearch, isSearchShown, setIsSearchShown }) => {
    // const [query,setQuery] = useState('');

    // const getInput = (e) => {
    //     setQuery(e.target.value);
    //     console.log(query);
    //   };

    // const clickSearch = () => {
    //     console.log("query before going up to parent:" + query);
    //     props.clickSearch(query);
    // };

    const inputRef = useRef();
    const handleSearch = () => {
        const value = inputRef.current.value;
        onSearch(value);
    };
    const onClick = () => {
        handleSearch();
        setIsSearchShown(true);
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        // <div className="search-widget mb-50">
        //     <div className="search-wrap">
        //         <input type="search" placeholder="플레이리스트에 추가할 영상을 검색하세요" name="s" className="search-input" ref={inputRef} /*onChange={getInput}*/onKeyPress={onKeyPress} />
        //         <button type="submit" value="Search" onClick={onClick}><i className="fa fa-search"></i></button>
        //     </div>
        // </div>
        <>
        <div className="d-flex" style={{backgroundColor: "#eef0ff", position: "relative", zIndex: "1"}}>
            <div className="col-6 col-md-6" style={{marginLeft: "50px"}}>
                <input autoFocus type="text" placeholder="플레이리스트에 추가할 영상을 검색하세요" name="s" className={isSearchShown ? "search-input search-bar search-bar-focus" : "search-input search-bar"} ref={inputRef} onKeyPress={onKeyPress} onFocus={() => setIsSearchShown(true)} onBlur={()=> setIsSearchShown(false)}/>
            </div>
            <div className="col-1">
                <button type="submit" className="search-button" value="Search" onMouseDown={onClick}>
                <i className="fa fa-search" onMouseDown={onClick}></i>
                </button>
            </div>
        </div>
        </>
    )
});

export default YoutubeVideoSearchWidget;