import React, { useState, useEffect, Suspense } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";
// import { toLowerCaseNonAccentVietnamese } from "@/composables/nonAccentVietnamese";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [msg, setMsg] = useState(null);
  document.title = "NedCine - Quản lí phim";

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/movies")
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data));
  // }, []);

  const deleteMovie = async (movieId, index) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${movieId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          const updatedMovies = [...movies];
          updatedMovies.splice(index, 1);
          setMovies(updatedMovies);
          setMsg("Xóa phim thành công");
        } else {
          setMsg("Xóa phim không thành công");
        }
      } catch (error) {
        console.error("Lỗi khi xóa phim: ", error);
        setMsg("Có lỗi xảy ra khi xóa phim");
      }
    }
  };

  const resultQuery = () => {
    if (searchQuery) {
      return movies.filter((movie) =>
        toLowerCaseNonAccentVietnamese(movie.Title).includes(searchQuery)
      );
    } else {
      return movies;
    }
  };

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
            {/* {msg && (
              <div className="text-bold text-left text-red-500">{msg}</div>
            )} */}
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
                <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Tên phim</th>
                    <th></th>
                    <th className="py-3 px-6">Poster</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {resultQuery().map((movie, index) => (
                    <tr key={movie._id} className="bg-white border-b">
                      <td className="py-4 px-6">{movie._id}</td>
                      <td
                        colSpan="2"
                        className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap"
                      >
                        {movie.Title}
                      </td>
                      <td className="py-4 px-6">
                        <img
                          className="w-20"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <a href={`/movie-management/edit/${movie._id}`}>
                          <i className="fa-solid fa-pen-to-square text-xl text-blue-500 pr-8"></i>
                        </a>
                        <a
                          href="#"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteMovie(movie._id, index);
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
    </>
  );
};

export default MovieManagement;
