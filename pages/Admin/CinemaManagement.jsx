import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese";
import cinemaApi from "../../apis/cinemaApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
const CinemaManagement = () => {
  const [cinemas, setCinemas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toLowerCaseNonAccentVietnamese } = nonAccentVietnamese(); // Đảm bảo bạn đã import hàm này
  const history = useNavigate();
  let toLowerCase =
    nonAccentVietnamese().toLowerCaseNonAccentVietnamese(searchQuery);
  useEffect(() => {
    cinemaApi.getAllCinemas().then((data) => {
      const allCinemas = data.data.data;
      setCinemas(data.data.data);
    });
  }, []);

  const deleteMovie = async (cinemaId) => {
    if (window.confirm("Bạn có chắc muốn xóa rạp chiếu  này?")) {
      try {
        await cinemaApi.deleteCinema(cinemaId);
        const updatedCinemas = cinemas.filter(
          (cinema) => cinema.id !== cinemaId
        );
        setCinemas(updatedCinemas);
        toast.success("Xóa rạp chiếu thành công!!!");
      } catch (error) {
        console.error("Lỗi khi xóa rạp: ", error);
        toast.error("Lỗi khi xóa rạp!!!");
      }
    }
  };

  function resultQuery() {
    if (searchQuery) {
      return cinemas.filter((cinema) =>
        nonAccentVietnamese()
          .toLowerCaseNonAccentVietnamese(cinema.name)
          .includes(toLowerCase)
      );
    } else {
      return cinemas;
    }
  }

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
          </div>
          <div className="relative">
            <table className="w-full text-left">
              <thead className="font-bold text-gray-700 uppercase bg-gray-200 rounded ">
                <tr>
                  <th className="py-3 px-6">Tên rạp chiếu phim</th>
                  <th className="py-3 px-6">Địa chỉ</th>
                  <th className="py-3 px-6">Thành Phố</th>
                  <th className="py-3 px-6">Danh sách phòng</th>
                  <th className="py-3 px-6"></th>

                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {cinemas.length !== 0 &&
                  resultQuery().map((cinema, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-slate-300"
                      onClick={(e) => {
                        e.preventDefault();
                        history(`/admin/cinema/${cinema.id}/room-management/`);
                      }}
                    >
                      <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                        {cinema.name}
                      </td>
                      <td className="py-4 px-6">{cinema.address}</td>
                      <td className="py-4 px-6">{cinema.city}</td>

                      <td colSpan={2} className="py-4 px-6">
                        {}
                      </td>

                      <td className="py-4 px-6">
                        <Link
                          className="pr-4"
                          to={`/admin/cinema-management/edit/${cinema.id}`}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className=" text-xl text-blue-500"
                          />
                        </Link>
                        <Link
                          to="#"
                          className="cursor-pointer pr-4 "
                          onClick={(e) => {
                            e.preventDefault();
                            deleteMovie(cinema.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-xl text-red-400"
                          />
                        </Link>
                      </td>
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

export default CinemaManagement;
