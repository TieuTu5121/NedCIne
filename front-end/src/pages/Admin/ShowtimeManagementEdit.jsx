import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { APP_TITLE, SHOWTIME_STATE } from "../../contants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faL,
  faSpinner,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import showtimeApi from "../../apis/showtimeApi";
import cinemaApi from "../../apis/cinemaApi";
import roomApi from "../../apis/roomApi";
import { Eventcalendar, localeVi } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import movieApi from "../../apis/movie";
import toast from "react-hot-toast";
const ShowtimeManagementEdit = () => {
  const { id, choosenCineId } = useParams();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [showDate, setShowDate] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [cinema, setCinema] = useState({});
  const [room, setRoom] = useState({});
  const [price, setPrice] = useState(0);
  const [isPending, setIsPending] = useState();
  const [choosenRoomId, setChoosenRoomId] = useState();
  const [choosenMovieId, setChoosenMovieId] = useState();
  const [runTime, setRunTime] = useState();
  const history = useNavigate();
  const colors = ["#239a21", "#ff0101", "#e9ec12", "#d8ca1a", "#01adff"];
  document.title = APP_TITLE + "Quản lí suất chiếu";

  useEffect(() => {
    fetchData();
  }, [choosenCineId]);
  useEffect(() => {
    if (choosenMovieId != null)
      movieApi.getMovieById(choosenMovieId).then((data) => {
        const movie = data?.data?.data;
        // console.log(movie);
        setRunTime(movie.runTime);
      });
  }, [choosenMovieId]);

  const fetchData = async () => {
    fetchRoomsByCinema();
    fetchMovies();
    if (id) {
      fetchShowtime();
    }
  };
  const fetchRoomsByCinema = async () => {
    const roomResponse = await roomApi.getRoomsByCinema(choosenCineId);
    const roomByCinema = roomResponse?.data?.data;
    setRooms(roomByCinema);
    // console.log(rooms);
  };
  const fetchMovies = async () => {
    const movieResponse = await movieApi.getAllMovies();
    const movieFromApi = movieResponse?.data?.data;
    // console.log(movieFromApi);
    setMovies(movieFromApi);
  };
  const fetchShowtime = async () => {
    const response = await showtimeApi.getShowtimeById(id);
    const showtime = response?.data?.data;
    console.log(showtime);
    setEndTime(showtime.finishTime);
    setStartTime(showtime.showtime);
    setRunTime(showtime.movie.runTime);
    setShowDate(showtime.showdate);
    setPrice(showtime.price);
    setRoom(showtime.room);
    // set;
  };
  const formatRuntime = (runtime) => {
    // Sử dụng regular expression để lấy số từ chuỗi
    const match = runtime.match(/\d+/);

    // Kiểm tra nếu match có giá trị thì lấy giá trị đầu tiên (số)
    const minutes = match ? parseInt(match[0], 10) : 0;

    console.log(minutes); // Kết quả sẽ là 103
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      if (remainingMinutes > 0) {
        return `  ${hours} giờ ${remainingMinutes}  phút`;
      } else {
        return `  ${hours} giờ`;
      }
    } else {
      return `${remainingMinutes}m`;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the required fields are empty
    if (
      !choosenMovieId ||
      !choosenRoomId ||
      !showDate ||
      !startTime ||
      !endTime ||
      !price
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    // Get movie and room by ID
    const movie = await movieApi.getMovieById(choosenMovieId);
    const room = await roomApi.getRoomById(choosenRoomId);

    // Create a ShowtimeRequestDto object
    const showTimeData = {
      movie: movie?.data?.data,
      room: room?.data?.data,
      showtime: startTime,
      finishTime: endTime,
      showdate: showDate,
      price,
    };
    console.log(showTimeData);
    console.log(id);
    if (id) {
      // Update showtime
      await showtimeApi.updateShowtime(id, showTimeData);

      toast.success("Cập nhật thành công!!!");
      history(-1);
    } else {
      // Create showtime
      await showtimeApi.createShowtime(showTimeData);
      toast.success("Tạo mới  thành công!!!");
      history(-1);
    }

    // Navigate to showtime management page
    // history("/showtime-management");
  };

  const handleGoBack = () => {
    history(-1);
  };
  function getCurrentDate() {
    const today = new Date();

    // console.log(today.toISOString().slice(11, 16));
    return today.toISOString().slice(0, 10);
  }
  const calculateMinValue = () => {
    if (!startTime || !runTime) {
      return ""; // Trả về giá trị rỗng nếu thời gian bắt đầu hoặc runtime không tồn tại
    }

    // Chuyển đổi runtime (vd: "103 phút") thành số phút
    const match = runTime.match(/\d+/);
    const minutes = match ? parseInt(match[0], 10) : 0;

    // Chuyển đổi thời gian bắt đầu thành giờ và phút
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Tính giá trị min bằng cách cộng thời gian bắt đầu với runtime
    const totalMinutes = startHour * 60 + startMinute + minutes;

    // Chuyển đổi totalMinutes thành chuỗi "HH:mm" cho thuộc tính "min"
    const totalHour = Math.floor(totalMinutes / 60);
    const totalMinute = totalMinutes % 60;
    const minTimeString = `${totalHour
      .toString()
      .padStart(2, "0")}:${totalMinute.toString().padStart(2, "0")}`;

    return minTimeString;
  };
  const calculateMaxValue = () => {
    if (!startTime || !runTime) {
      return ""; // Trả về giá trị rỗng nếu thời gian bắt đầu hoặc runtime không tồn tại
    }

    // Chuyển đổi runtime (vd: "103 phút") thành số phút
    const match = runTime.match(/\d+/);
    const minutes = match ? parseInt(match[0], 10) : 0;

    // Chuyển đổi thời gian bắt đầu thành giờ và phút
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Tính giá trị min bằng cách cộng thời gian bắt đầu với runtime
    const totalMinutes = startHour * 60 + startMinute + minutes;

    // Chuyển đổi totalMinutes thành chuỗi "HH:mm" cho thuộc tính "min"
    const totalHour = Math.floor(totalMinutes / 60);
    const totalMinute = (totalMinutes % 60) + 30;
    const minTimeString = `${totalHour
      .toString()
      .padStart(2, "0")}:${totalMinute.toString().padStart(2, "0")}`;

    return minTimeString;
  };
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen ">
          <AdminSidebar dashboard="showtime" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 overflow-x-hidden">
            <div className="flex  items-center mb-2  justify-content-between ">
              <h1 className="font-bold text-xl">Quản lí lịch chiếu phim</h1>
            </div>

            <br />
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-6 w-full border-4    p-4 rounded"
              action=""
            >
              <div className="col-span-3">
                <div className="form-group mb-6 grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="showDate"
                  >
                    Ngày chiếu:
                  </label>
                  <input
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    type="date"
                    name="showDate"
                    id="showDate"
                    value={showDate}
                    onChange={(e) => {
                      setShowDate(e.target.value);
                    }}
                    min={getCurrentDate()}
                  />
                </div>
                <div className="form-group mb-6 grid grid-cols-3 ">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="start"
                  >
                    Thời gian chiếu:{" "}
                  </label>
                  <input
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    type="time"
                    name="start"
                    id="start"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="endtime"
                  >
                    Thời gian kết thúc:
                  </label>
                  <input
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    type="time"
                    name="endTime"
                    min={calculateMinValue()}
                    max={calculateMaxValue()}
                    id="endTime"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="form-group mb-6 grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="rooms"
                  >
                    Chọn phòng chiếu:
                  </label>
                  <select
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    name="rooms"
                    id="rooms"
                    placeholder="Chọn phòng chiếu"
                    onChange={(e) => setChoosenRoomId(e.target.value)}
                  >
                    {rooms.length !== 0 &&
                      rooms.map((room) => {
                        return (
                          <option
                            // className="text-black"
                            key={room.id}
                            value={room.id}
                          >
                            {room.roomName}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="form-group mb-6 grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="movies"
                  >
                    Chọn phim:
                  </label>
                  <select
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    name="movies"
                    id="movies"
                    onChange={(e) => {
                      setChoosenMovieId(e.target.value);
                    }}
                  >
                    {movies.length !== 0 &&
                      movies.map((movie) => {
                        return (
                          <option
                            // className="text-black"
                            key={movie.id}
                            value={movie.id}
                          >
                            {movie.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group mb-6 grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="runtime"
                  >
                    Thời lượng phim
                  </label>
                  <input
                    type="text"
                    name="runtime"
                    id="runtime"
                    value={!runTime ? "" : formatRuntime(runTime)}
                    readOnly
                  />
                </div>
                <div className="form-group mb-6 grid grid-cols-3">
                  <label
                    className="form-label inline-block mb-2 text-gray-700 font-bold col-span-1"
                    htmlFor="price"
                  >
                    Giá vé:
                  </label>
                  <input
                    className="ml-2 px-2 rounded  border-2 col-span-1"
                    type="number"
                    name="price"
                    id="price"
                    value={price === 0 ? "" : price}
                    placeholder="200.000 đồng"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="relative py-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  disabled={isPending}
                >
                  {isPending ? "Đang lưu ..." : "Lưu"}
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
};

export default ShowtimeManagementEdit;
