import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import userApi from "../../apis/userApi";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toLowerCaseNonAccentVietnamese } = nonAccentVietnamese(); // Đảm bảo bạn đã import hàm này
  const [employees, setEmployees] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  // Hàm xử lý sự kiện thay đổi của select
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Hàm xử lý sự kiện thay đổi của select
  const handleRoleChange = (e) => {
    if (selectedEmployee) {
      const newRole = e.target.value;
      userApi.updateRoleById(selectedEmployee.id, newRole);
      // Cập nhật giá trị role trong state của user được chọn
      setSelectedEmployee((prevSelectedEmployee) => ({
        ...prevSelectedEmployee,
        role: newRole,
      }));
    }
  };
  let toLowerCase =
    nonAccentVietnamese().toLowerCaseNonAccentVietnamese(searchQuery);
  useEffect(() => {
    userApi.getAllUsers().then((data) => {
      const users = data.data.data;
      setEmployees(users);
      console.log(users);
    });
  }, []);
  function resultQuery() {
    if (searchQuery) {
      return employees.filter((employee) =>
        nonAccentVietnamese()
          .toLowerCaseNonAccentVietnamese(employee.username)
          .includes(toLowerCase)
      );
    } else {
      return employees;
    }
  }
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="employee" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 overflow-x-hidden">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-xl">Danh sách nhân viên</h1>
          </div>

          <div className="mb-2 relative">
            <input
              className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
              placeholder="Nhập tên để tìm kiếm"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                {resultQuery().map((employee, index) => (
                  <tr key={employee.id} className="bg-white border-b">
                    <td className="py-4 px-6">{employee.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                      {employee.email}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                      {employee.username}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={selectedEmployee?.role || employee.role}
                        onChange={(e) => handleRoleChange(e)}
                        className="w-full h-8 border border-gray-600 rounded-md focus:outline-none px-2"
                      >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 px-6"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
