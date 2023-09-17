import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getToken, removeData, setData } from "../configs/authentication";

const Header = () => {
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const signOut = () => {
    removeData();
    console.log("Remove Token!!!");
    setUser(null);
    navigate("/default/login");
  };

  return (
    <header id="header" className=" h-14 bg-black fixed top-0 left-0 right-0 ">
      <nav className="w-full flex items-center justify-between h-full mx-auto px-4 ">
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
        <div className="flex">
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
          <span className="text-white h-full relative py-2">
            {user ? (
              <div className="pl-10 group">
                <div className="hover:text-red-400">
                  Xin chào, {user.username}
                </div>
                <ul className="w-44 h-100 absolute bg-white shadow-md text-black rounded-md z-50 right-0 hidden group-hover:block">
                  <li className="pt-3 pl-3 hover:text-red-400">
                    <Link to="/user-profile">Thông tin tài khoản</Link>
                  </li>
                  <li className="pt-2 pl-3 hover:text-red-400">
                    <Link to="/user-orders">Hóa đơn của tôi</Link>
                  </li>
                  <li
                    className="pt-2 pb-3 pl-3 hover:text-red-400"
                    onClick={signOut}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/default/login" className="hover:text-red-400">
                Đăng nhập
              </Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
