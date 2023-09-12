import React, { useState, useEffect, Suspense } from "react";
import AdminSidebar from "../components/AdminSidebar";

// import { toLowerCaseNonAccentVietnamese } from "../composables/nonAccentVietnamese";

const AdminIndex = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [msg, setMsg] = useState(null);

  document.title = "NedCine - Trang Admin";

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/movies")
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data));
  // }, []);

  // const deleteMovie = async (movieId, index) => {
  //   if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if (response.status === 200) {
  //         const updatedMovies = [...movies];
  //         updatedMovies.splice(index, 1);
  //         setMovies(updatedMovies);
  //         setMsg("Xóa phim thành công");
  //       } else {
  //         setMsg("Xóa phim không thành công");
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi xóa phim: ", error);
  //       setMsg("Có lỗi xảy ra khi xóa phim");
  //     }
  //   }
  // };

  //   const resultQuery = () => {
  //     if (searchQuery) {
  //       return movies.filter((movie) =>
  //         toLowerCaseNonAccentVietnamese(movie.Title).includes(searchQuery)
  //       );
  //     } else {
  //       return movies;
  //     }
  //   };

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSidebar dashboard="" />
          </Suspense>
        </div>
        <div className="col-span-5">
          <h1>Admin page</h1>
        </div>
      </div>
    </>
  );
};

export default AdminIndex;
