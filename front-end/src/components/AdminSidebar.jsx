import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { removeData } from "../configs/authentication";
function AdminSidebar({ dashboard }) {
  //   const { signOut } = useSignOut();

  //   const [isAccess, setIsAccess] = useState(false);
  //   const [role, setRole] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user: ", user);
  }, []);
  const signOut = () => {
    removeData();
    setUser(null);

    navigate("/admin/login");
  };
  return (
    <div className="fixed w-[254px] h-full relative">
      <Link to="/admin">
        <h1 className="text-2xl font-bold pt-8 pb-2 text-center">DASHBOARD</h1>
      </Link>
      <h3 className="text-center pb-6">
        Xin chào, {"  "}
        <span className="text-yellow-200">
          {user ? user.username : "User Name"}
        </span>
      </h3>
      <ul className="flex flex-col ">
        <li
          className={`border-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "movie" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/movie-management"
          >
            Quản lý phim
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        <li
          className={`border-b-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "cinema" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/cinema-management"
          >
            Quản lý rạp chiếu phim
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        <li
          className={`border-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "showtime" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/showtime-management"
          >
            Quản lý suất chiếu
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        <li
          className={`border-b-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "product" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/product-management"
          >
            Quản lý sản phẩm
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        {/* {isAccess && ( */}
        <li
          className={`border-b-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "employee" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className={`block px-4 py-4 hover:bg-blue-600 w-full ${
              user?.roles[0] == "EMPLOYEE" ? "hidden" : ""
            } `}
            to="/admin/employee-management"
          >
            Quản lý nhân viên
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        <li
          className={`border-b-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "employee" ? "bg-blue-600" : ""
          }`}
        >
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        {/* )} */}
        <li
          className={`border-b-2 border-gray-300 cursor-pointer flex justify-between items-center ${
            dashboard === "orders" ? "bg-blue-600" : ""
          }`}
        >
          <Link
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/orders-management"
          >
            Quản lý hóa đơn
          </Link>
          <i className="fa-solid fa-chevron-right right-4 absolute"></i>
        </li>
        <div className=" w-full">
          <li
            onClick={signOut}
            className={`block px-4 py-4 hover:bg-red-600 w-full border-b-2 border-t-2 border-gray-300 cursor-pointer flex justify-between absolute items-center flex-grow  bottom-0 w-full`}
          >
            Đăng xuất
            <i className="fa-solid fa-right-from-bracket right-3 "></i>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default AdminSidebar;
