import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const CinemaManagement = () => {
  //   const [cinemas, setCinemas] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const { toLowerCaseNonAccentVietnamese } = nonAccentVietnamese(); // Đảm bảo bạn đã import hàm này

  //   useEffect(() => {
  //     fetch('http://localhost:3000/api/movies/cinema')
  //       .then((response) => response.json())
  //       .then((data) => setCinemas(data));
  //   }, []);

  //   const deleteCinema = async (cinemaId, index) => {
  //     if (window.confirm('Bạn có chắc muốn xóa rạp chiếu phim này?')) {
  //       try {
  //         const response = await fetch(`http://localhost:3000/api/movies/cinema/${cinemaId}`, {
  //           method: 'DELETE',
  //           headers: { 'Content-Type': 'application/json' },
  //         });

  //         if (response.status === 200) {
  //           const updatedCinemas = [...cinemas];
  //           updatedCinemas.splice(index, 1);
  //           setCinemas(updatedCinemas);
  //         }
  //       } catch (error) {
  //         console.error('Lỗi khi xóa rạp chiếu phim: ', error);
  //       }
  //     }
  //   };

  //   const resultQuery = () => {
  //     if (searchQuery) {
  //       return cinemas.filter((cinema) =>
  //         toLowerCaseNonAccentVietnamese(cinema.Name).includes(searchQuery)
  //       );
  //     } else {
  //       return cinemas;
  //     }
  //   };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="cinema" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 overflow-x-hidden">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-xl">Danh sách các rạp chiếu phim</h1>
            <Link
              to="/admin/cinema-management/add" // Điều hướng đến trang tạo rạp phim mới
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
            >
              Thêm rạp phim mới +
            </Link>
          </div>
          <div className="mb-2 relative">
            <input
              className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
              placeholder="Nhập tên rạp để tìm kiếm"
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
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-6">Tên rạp chiếu phim</th>
                  <th></th>
                  <th className="py-3 px-6">Số phòng</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {/* {resultQuery().map((cinema, index) => (
                  <tr key={cinema._id} className="bg-white border-b">
                    <td className="py-4 px-6">{cinema._id}</td>
                    <td
                      colSpan="2"
                      className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap"
                    >
                      {cinema.Name}
                    </td>
                    <td className="py-4 px-6">{cinema.Seats}</td>
                    <td className="py-4 px-6">
                      <a
                        href={`/edit-cinema/${cinema._id}`} // Điều hướng đến trang chỉnh sửa rạp phim
                      >
                        <i className="fa-solid fa-pen-to-square text-xl text-blue-500 pr-8"></i>
                      </a>
                      <a
                        href="#"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCinema(cinema._id, index);
                        }}
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

export default CinemaManagement;
