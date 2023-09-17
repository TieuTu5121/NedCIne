import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar";

function MovieManagementEdit() {
  //   const { id } = useParams();
  const history = useNavigate();
  const location = useLocation();

  //   const [movie, setMovie] = useState({});
  //   const [cinemas, setCinemas] = useState([]);
  //   const [showCinema, setShowCinema] = useState(false);
  //   const [showShowTime, setShowShowTime] = useState(false);
  //   const [cinemaSelected, setCinemaSelected] = useState([]);
  //   const [showTimeSelected, setShowTimeSelected] = useState([]);
  //   const [msg, setMsg] = useState(null);
  //   const [isPending, setIsPending] = useState(null);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/api/movies/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => setMovie(data));

  //     fetch(`http://localhost:3000/api/movies/cinema`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCinemas(data);
  //         bindingSelectedCinema();
  //       });
  //   }, [id]);

  //   function bindingSelectedCinema() {
  //     const selectedCinemas = [];
  //     movie.Cinema.forEach((movieCinema) => {
  //       cinemas.forEach((cinema) => {
  //         if (movieCinema._id === cinema._id) {
  //           selectedCinemas.push({ ...cinema, checked: true });
  //         }
  //       });
  //     });
  //     setCinemaSelected(selectedCinemas);
  //   }

  //   function handleShowCinemaDropdown() {
  //     setShowCinema(!showCinema);
  //   }

  //   function handleShowTimeDropdown() {
  //     setShowShowTime(!showShowTime);
  //   }

  //   async function onSubmit(e) {
  //     e.preventDefault();
  //     setIsPending(true);
  //     movie.Cinema = [...cinemaSelected];

  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/api/movies/${movie._id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ ...movie }),
  //         }
  //       );

  //       const data = await response.json();
  //       console.log(data);
  //       setMsg("Cập nhật thông tin phim thành công");
  //     } catch (error) {
  //       setMsg(error.message);
  //     } finally {
  //       setIsPending(false);
  //     }
  //   }
  const handleGoBack = (e) => {
    e.preventDefault();
    console.log(location.state);
    history(-1); // This will navigate back to the previous page
  };
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white h-full">
          <AdminSidebar dashboard="movie" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 relative">
            <h1 className="font-bold text-xl mb-5">Chỉnh sửa thông tin phim</h1>
            <form action="" className="w-full relative" onSubmit={onended}>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="id"
                >
                  Id
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-no-drop"
                  type="text"
                  v-model="movie._id"
                  id="id"
                  disabled
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="title"
                >
                  Tên phim
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Title"
                  id="title"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="year"
                >
                  Năm ra mắt
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Year"
                  id="year"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="rated"
                >
                  Rated
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Rated"
                  id="rated"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="released"
                >
                  Ngày, tháng ra mắt
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Released"
                  id="released"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="runtime"
                >
                  Thời lượng
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Runtime"
                  id="runtime"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="genres"
                >
                  Thể loại
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Genres"
                  id="genres"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="directors"
                >
                  Đạo diễn
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Directors"
                  id="directors"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="actors"
                >
                  Tên diễn viên
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Actors"
                  id="actors"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="plot"
                >
                  Nội dung phim
                </label>
                <textarea
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  rows="5"
                  type="text"
                  v-model="movie.Plot"
                  id="plot"
                ></textarea>
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="languages"
                >
                  Ngôn ngữ
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Language"
                  id="languages"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="poster"
                >
                  Poster
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Poster"
                  id="poster"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="banner"
                >
                  Banner
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Banner"
                  id="banner"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="trailer"
                >
                  Trailer
                </label>
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  v-model="movie.Trailer"
                  id="trailer"
                />
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="status"
                >
                  Trạng thái
                </label>
                <select
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  v-model="movie.Status"
                  id="status"
                >
                  <option value="Đang chiếu">Đang chiếu</option>
                  <option value="Sắp chiếu">Sắp chiếu</option>
                </select>
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="cinema"
                >
                  Chiếu tại rạp
                </label>

                <input
                  className="form-control block w-full px-3 py-1.5 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  value="Chọn các rạp"
                  type="button"
                />
                <div
                  className="p-2 border border-gray-500 rounded-sm shadow-sm"
                  v-if="showCinema"
                >
                  <ul>
                    <li v- htmlFor="cinema in cinemas">
                      <input type="checkbox" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="form-group mb-6">
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold"
                  htmlFor="cinema"
                >
                  Thời gian chiếu
                </label>

                <input
                  className="form-control block w-full px-3 py-1.5 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  value="Chọn thời gian chiếu"
                  type="button"
                />
                <div
                  className="p-2 border border-gray-500 rounded-sm shadow-sm"
                  v-if="showShowTime"
                >
                  <ul>
                    <li v- htmlFor="(cinema, index) in cinemaSelected">
                      <div
                        v-
                        htmlFor="(showtime, indexShowTime) in cinema.ShowTimes"
                      >
                        <input
                          type="checkbox"
                          //   :id="showtime.Date + showtime.Time"
                          //   :value="showtime.Date + ' ' + showtime.Time"
                          //   v-if="
                          //     showtime.MovieId == movie._id ||
                          //     showtime.MovieId == null
                          //   "
                          //   v-model="showTimeSelected"
                          //   :checked="
                          //     showtime.MovieId == movie._id ? 'checked' : null
                          //   "
                        />
                        {/* <label
                      v-if="
                        showtime.MovieId == movie._id ||
                        showtime.MovieId == null
                      "
                      : htmlFor="showtime.Date + showtime.Time"
                      >{{
                        showtime.Date +
                        " - " +
                        showtime.Time +
                        " - " +
                        cinema.Name
                      }}
                      </label> */}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 
                <div className="text-red-400 font-semibold" >
                    {{ msg }}
                </div> */}

              <div className="relative py-8">
                <button
                  v-if="!isPending"
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Lưu
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 cursor-not-allowed"
                  disabled
                >
                  Đang Lưu ...
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleGoBack}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieManagementEdit;
