import React from "react";
import { Link } from "react-router-dom";

const UserSidebar = ({ dashboard }) => {
  return (
    <div className="col-span-1">
      <h1 className=" text-red-500 font-bold text-xl">TÀI KHOẢN NED</h1>
      <ul className="flex flex-col mt-2">
        <li
          className={`border border-gray-300 py-2 pl-3 hover:bg-gray-300 cursor-pointer ${
            dashboard === "profile" ? "bg-gray-300" : ""
          }`}
        >
          <Link to="/default/user-orders/">Thông tin tài khoản</Link>
        </li>
        <li
          className={`border border-gray-300 py-2 pl-3 hover:bg-gray-300 cursor-pointer ${
            dashboard === "orders" ? "bg-gray-300" : ""
          }`}
        >
          <Link to="/default/user-orders/">Hóa đơn của bạn</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
