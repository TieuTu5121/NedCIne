import React, { useState, useEffect, Suspense } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";
import movieApi from "../../apis/movie";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let toLowerCase =
    nonAccentVietnamese().toLowerCaseNonAccentVietnamese(searchQuery);
  document.title = "NedCine - Quản lí phim";

  useEffect(() => {
    movieApi.getAllMovies().then(({ data }) => {
      setMovies(data.data);
    });
  }, []);

  const deleteMovie = async (movieId) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        await movieApi.deleteMovie(movieId);
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
        toast.success("Xóa phim thành công!!!");
      } catch (error) {
        console.error("Lỗi khi xóa phim: ", error);
        toast.error("Lỗi khi xóa phim!!!");
      }
    }
  };

  function resultQuery() {
    if (searchQuery) {
      return movies.filter((movie) =>
        nonAccentVietnamese()
          .toLowerCaseNonAccentVietnamese(movie.title)
          .includes(toLowerCase)
      );
    } else {
      return movies;
    }
  }

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSidebar dashboard="movie" />
          </Suspense>
        </div>
        <div className="col-span-5">
          <div className="container p-10 overflow-x-hidden">
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-xl">Danh sách các bộ phim</h1>
              <Link
                to="/admin/movie-management/edit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
              >
                Thêm phim mới +
              </Link>
            </div>

            <div className="mb-2 relative">
              <input
                className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
                placeholder="Nhập tên phim để tìm kiếm"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
            </div>
            <div className="relative">
              <table className="w-full text-left">
                <thead className="font-bold text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="py-3 px-6">Tên phim</th>
                    <th></th>
                    <th className="py-3 px-6 ">Poster</th>
                    <th className="py-3 px-6 ">Thể loại</th>

                    <th className="py-3 px-6">Ngày chiếu</th>
                    <th className="py-3 px-6">Trạng thái</th>

                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {movies.legth != 0 &&
                    resultQuery().map((movies) => (
                      <tr key={movies.id} className="bg-white border-b">
                        <td
                          colSpan="2"
                          className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap"
                        >
                          {movies.title}
                        </td>
                        <td className="py-4 px-6">
                          <img
                            className="w-20"
                            src={movies.poster}
                            alt={movies.title}
                          />
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                          {movies.genres}
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                          {movies.release}
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                          {movies.status === "SHOWING"
                            ? "Đang chiếu"
                            : "Sắp chiếu"}
                        </td>
                        <td className="py-2 px-6 ">
                          <Link
                            className="pr-4"
                            to={`/admin/movie-management/edit/${movies.id}`}
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className=" text-xl text-blue-500"
                            />
                          </Link>
                          <Link
                            to="#"
                            className="cursor-pointer "
                            onClick={(e) => {
                              e.preventDefault();
                              deleteMovie(movies.id);
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
    </>
  );
};

export default MovieManagement;
