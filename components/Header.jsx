import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { removeData } from "../configs/authentication";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const signOut = () => {
    removeData();
    setUser(null);
    navigate("/default/login");
  };

  return (
    <header id="header" className="h-14 bg-black top-0 left-0 right-0">
      <nav className="w-full flex items-center justify-between h-full mx-auto px-4">
        {isMobile ? (
          <div className="flex items-center">
            <button className="text-white" onClick={handleMenuToggle}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        ) : (
          <>
            <ul className="flex items-center justify-between text-xl h-full text-white font-semibold flex-grow-2">
              <li className="mr-12">
                <Link to="/default" className="hover:text-red-400">
                  Trang Chủ
                </Link>
              </li>
              <li className="mr-12 hover:text-red">
                <Link to="/default/showing">Phim Đang Chiếu</Link>
              </li>
              <li className="mr-12 hover:text-red">
                <Link to="/default/coming">Phim Sắp Chiếu</Link>
              </li>
              <li className="mr-12 hover:text-red">
                <Link to="/default/cinema">Rạp NedCine</Link>
              </li>
              <li className="mr-12 hover:text-red">
                <Link to="/default/genre">Thể Loại</Link>
              </li>
            </ul>

            <div className="flex items-center">
              <div className="relative mr-6 h-full">
                <input
                  type="text"
                  className="w-56 h-10 rounded-lg pl-4 pr-9"
                  placeholder="Nhập để tìm kiếm..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      // Redirect or perform search action here
                    }
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  <i className="fa-solid fa-magnifying-glass text-xl"></i>
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center">
          {user ? (
            <div className="pl-10 group">
              <div className="hover:text-red-400 text-white">
                <FontAwesomeIcon icon={faUser} /> Xin chào, {user.username}
              </div>
              <ul className="w-44 absolute bg-white shadow-md text-black rounded-md z-50 right-0 hidden group-hover:block">
                <li className="pt-3 pl-3 hover:text-red-400 ">
                  <Link to="/default/user-profile">Thông tin tài khoản</Link>
                </li>
                <li className="pt-2 pl-3 hover:text-red-400 border-top">
                  <Link to="/default/user-orders">Hóa đơn của tôi</Link>
                </li>
                <li
                  className="pt-2 pb-2 pl-3 hover:text-red-400 border-top"
                  onClick={signOut}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/default/login" className="hover:text-red-400 text-white">
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light text-black">
    //   <a className="navbar-brand" href="#">
    //     Navbar
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarSupportedContent"
    //     aria-controls="navbarSupportedContent"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>

    //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <a className="nav-link" href="#">
    //           Home <span className="sr-only">(current)</span>
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">
    //           Link
    //         </a>
    //       </li>
    //       <li className="nav-item dropdown">
    //         <a
    //           className="nav-link dropdown-toggle"
    //           href="#"
    //           id="navbarDropdown"
    //           role="button"
    //           data-toggle="dropdown"
    //           aria-haspopup="true"
    //           aria-expanded="false"
    //         >
    //           Dropdown
    //         </a>
    //         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //           <a className="dropdown-item" href="#">
    //             Action
    //           </a>
    //           <a className="dropdown-item" href="#">
    //             Another action
    //           </a>
    //           <div className="dropdown-divider"></div>
    //           <a className="dropdown-item" href="#">
    //             Something else here
    //           </a>
    //         </div>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link disabled" href="#">
    //           Disabled
    //         </a>
    //       </li>
    //     </ul>
    //     <form className="form-inline my-2 my-lg-0">
    //       <input
    //         className="form-control mr-sm-2"
    //         type="search"
    //         placeholder="Search"
    //         aria-label="Search"
    //       />
    //       <button
    //         className="btn btn-outline-success my-2 my-sm-0"
    //         type="submit"
    //       >
    //         Search
    //       </button>
    //     </form>
    //   </div>
    // </nav>
  );
};

export default Header;
