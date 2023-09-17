import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const EmployeeManagement = () => {
  //   const [employees, setEmployees] = useState([]);
  //   const [users, setUsers] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [msg, setMsg] = useState('');

  //   useEffect(() => {
  //     fetch('http://localhost:3000/api/roles')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUsers(data);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const filteredEmployees = users.filter(
  //       (user) => user.role === 'admin' || user.role === 'employee'
  //     );
  //     setEmployees(filteredEmployees);
  //   }, [users]);

  //   const deleteRole = async (userId, index) => {
  //     if (window.confirm('Bạn có chắc muốn xóa nhân viên này?')) {
  //       try {
  //         const response = await fetch(`http://localhost:3000/api/roles/${userId}`, {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             role: 'user',
  //           }),
  //         });
  //         if (response.status === 200) {
  //           employees.splice(index, 1);
  //           setMsg('Xóa quyền nhân viên thành công');
  //         }
  //       } catch (error) {
  //         console.error('Lỗi khi xóa quyền nhân viên:', error);
  //       }
  //     }
  //   };

  //   const resultQuery = employees.filter((employee) =>
  //     employee.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="employee" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 overflow-x-hidden">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-xl">Danh sách nhân viên</h1>
            {/* <Link
              to={{
                pathname: "/create-employee",
              }}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
            >
              Thêm nhân viên +
            </Link> */}
          </div>
          {/* <div className="text-left font-bold text-red-500">{msg}</div> */}
          <div className="mb-2 relative">
            <input
              className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
              placeholder="Nhập tên để tìm kiếm"
              type="text"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
          </div>
          <div className="relative">
            <table className="w-full text-left">
              <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">User ID</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Tên nhân viên</th>
                  <th className="py-3 px-6">Quyền</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {/* {resultQuery.map((employee, index) => (
                  <tr key={employee._id} className="bg-white border-b">
                    <td className="py-4 px-6">{employee._id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                      {employee.email}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                      {employee.displayName}
                    </td>
                    <td className="py-4 px-6">{employee.role}</td>
                    <td className="py-4 px-6">
                      <Link
                        to={{
                          pathname: `/edit-employee/${employee._id}`,
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square text-xl text-blue-500 pr-8"></i>
                      </Link>
                      <a
                        className="cursor-pointer"
                        onClick={() => deleteRole(employee._id, index)}
                      >
                        <i className="fa-solid fa-trash-can text-xl text-red-400"></i>
                      </a>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
