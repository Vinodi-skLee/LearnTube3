import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const RSMobileMenu = ({ setMenuOpen, menuOpen, parentMenu, secondParentMenu, headerFullWidth }) => {
    const location = useLocation();

    const [home, setHome] = useState(false);
    const [about, setAbout] = useState(false);
    const [course, setCourse] = useState(false);
    const [pages, setPages] = useState(false);
    const [team, setTeam] = useState(false);
    const [event, setEvent] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [shop, setShop] = useState(false);
    const [otherPages, setOtherPages] = useState(false);
    const [blog, setBlog] = useState(false);
    const [blogSidebar, setBlogSidebar] = useState(false);
    const [blogSingle, setBlogSingle] = useState(false);
    const [contact, setContact] = useState(false);
    const userId = window.sessionStorage.getItem("userId");
    const openMobileMenu = (menu) => {
        if (menu === "home") {
            setHome(!home);
            setAbout(false);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "about") {
            setHome(false);
            setAbout(!about);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "course") {
            setHome(false);
            setAbout(false);
            setCourse(!course);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "pages") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(!pages);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "team") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(true);
            setTeam(!team);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "event") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(true);
            setTeam(false);
            setEvent(!event);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "gallery") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(true);
            setTeam(false);
            setEvent(false);
            setGallery(!gallery);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "shop") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(true);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(!shop);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "otherPages") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(true);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(!otherPages);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "blog") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(!blog);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "blogSidebar") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(true);
            setBlogSidebar(!blogSidebar);
            setBlogSingle(false);
            setContact(false);
        } else if (menu === "blogSingle") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(true);
            setBlogSidebar(false);
            setBlogSingle(!blogSingle);
            setContact(false);
        } else if (menu === "contact") {
            setHome(false);
            setAbout(false);
            setCourse(false);
            setPages(false);
            setTeam(false);
            setEvent(false);
            setGallery(false);
            setShop(false);
            setOtherPages(false);
            setBlog(false);
            setBlogSidebar(false);
            setBlogSingle(false);
            setContact(!contact);
        }
    };

    return (
        <div className={headerFullWidth ? "container-fluid relative" : "container relative"}>
            <div className={menuOpen ? "mobile-menu-part open" : "mobile-menu-part"}>
                <div className="mobile-menu">
                    <ul className="nav-menu">
                        <li>
                            <Link
                                to="/"
                                onClick={() => {
                                    openMobileMenu("home");
                                }}
                                className={parentMenu === "home" ? "active-menu" : ""}
                            >
                                홈
                            </Link>
                            {/* <ul className={home ? "sub-menu current-menu" : "sub-menu"}>
                                <li>
                                    <Link to="/" className={location.pathname === "/" ? "active-menu" : ""}>
                                        Main Demo
                                    </Link>
                                </li>
                            </ul> */}
                        </li>
                        <li className={pages ? "menu-item-has-children current-menu-item" : "menu-item-has-children"}>
                            <Link
                                to="#"
                                onClick={() => {
                                    openMobileMenu("pages");
                                }}
                                className={parentMenu === "pages" ? "active-menu" : ""}
                            >
                                내 강의실
                            </Link>
                            <ul className={pages ? "sub-menu current-menu" : "sub-menu"}>
                                {userId ? (
                                    <>
                                        <li>
                                            <Link to="/dashboard-main" className={location.pathname === "/dashboard-main" ? "active-menu" : ""}>
                                                수강중인 강의실
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard-admin" className={location.pathname === "/dashboard-admin" ? "active-menu" : ""}>
                                                관리중인 강의실
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard-closed" className={location.pathname === "/dashboard-closed" ? "active-menu" : ""}>
                                                종료된 강의실
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="#" className={location.pathname === "/dashboard-main" ? "active-menu" : ""}>
                                            로그인이 필요합니다
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li>
                            <Link
                                to="/course"
                                onClick={() => {
                                    openMobileMenu("course");
                                }}
                                className={parentMenu === "about" ? "active-menu" : ""}
                            >
                                강의 둘러보기
                            </Link>
                            {/* <ul className={about ? "sub-menu current-menu" : "sub-menu"}>
                                <li>
                                    <Link to="/about" className={location.pathname === "/about" ? "active-menu" : ""}>
                                        About One
                                    </Link>
                                </li>
                            </ul> */}
                        </li>
                        <li>
                            <Link
                                to="/learntube-studio"
                                onClick={() => {
                                    openMobileMenu("learntube-studio");
                                }}
                                className={parentMenu === "course" ? "active-menu" : ""}
                            >
                                런튜브 스튜디오
                            </Link>
                            {/* <ul className={course ? "sub-menu current-menu" : "sub-menu"}>
                                <li>
                                    <Link to="/course" className={location.pathname === "/course" ? "active-menu" : ""}>
                                        Courses One
                                    </Link>
                                </li>
                            </ul> */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RSMobileMenu;
