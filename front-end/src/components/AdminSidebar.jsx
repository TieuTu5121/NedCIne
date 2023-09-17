import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSignOut } from "@/composables/useSignOut";
// import { projectAuth } from "@/configs/firebase";

function AdminSidebar({ dashboard }) {
  //   const { signOut } = useSignOut();
  //   const [isAccess, setIsAccess] = useState(false);
  //   const [role, setRole] = useState("");
  //   const [username, setUsername] = useState(projectAuth.currentUser.displayName);

  //   useEffect(() => {
  //     const fetchRole = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:3000/api/roles/${projectAuth.currentUser.uid}`
  //         );
  //         const data = await response.json();
  //         const userRole = data.role;
  //         setRole(userRole);
  //         setIsAccess(userRole === "admin");
  //       } catch (error) {
  //         setIsAccess(false);
  //       }
  //     };

  //     fetchRole();
  //   }, []);

  return (
    <div className="fixed w-[254px] h-full relative">
      <Link to="/admin">
        <h1 className="text-2xl font-bold pt-8 pb-2 text-center">DASHBOARD</h1>
      </Link>
      <h3 className="text-center pb-6">
        Xin chào, <span className="text-yellow-200">User Name</span>
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
            dashboard === "food" ? "bg-blue-600" : ""
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
            className="block px-4 py-4 hover:bg-blue-600 w-full"
            to="/admin/employee-management"
          >
            Quản lý nhân viên
          </Link>
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
        <li
          className={`border-b-2 border-t-2 border-gray-300 cursor-pointer flex justify-between items-center flex-grow absolute bottom-0 w-full`}
        >
          <Link
            className="block px-4 py-4 hover:bg-red-600 w-full"
            // onClick={signOut}
          >
            Đăng xuất
          </Link>
          <i className="fa-solid fa-right-from-bracket right-3 "></i>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
