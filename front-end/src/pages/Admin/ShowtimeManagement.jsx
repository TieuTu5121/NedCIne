import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { APP_TITLE } from "../../contants";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faL,
  faSpinner,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import moment from "moment";
import showtimeApi from "../../apis/showtimeApi";
import cinemaApi from "../../apis/cinemaApi";
import roomApi from "../../apis/roomApi";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import { Link } from "react-router-dom";
const ShowtimeManagement = () => {
  const [city, setCity] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [choosenCinema, setChoosenCinema] = useState({});
  const [choosenCineId, setChoosenCineId] = useState();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date(moment()));
  const [totalPage, setTotalPage] = useState();

  const colors = ["#239a21", "#ff0101", "#e9ec12", "#d8ca1a", "#01adff"];
  document.title = APP_TITLE + "Quản lí suất chiếu";
  useEffect(() => {
    fetchData();
    // console.log(cinemas);

    setRooms([]);
    setChoosenCineId();
    setChoosenCinema();
    setShowtimes([]);
  }, [city]);

  useEffect(() => {
    if (choosenCineId != null) {
      setLoading(false);
      fetchRoomsAndShowtime(choosenCineId);
    }
  }, [choosenCineId, page]);

  const fetchData = async () => {
    try {
      const cinemaByCity = await fetchCinemaByCity(city);

      setCinemas(cinemaByCity);
    } catch (e) {
      console.log(e);
    }
  };
  // function formatShowtime(showdate, showtime) {
  //   // const formattedShowdate = moment(showdate).format("YYYY-MM-DD");
  //   // console.log("formattedShowdate: ", formattedShowdate, " - ", showdate);
  //   // const formattedShowtime = moment(showtime, "HH:mm:ss").format("HH:mm");
  //   // , "HH:mm:ss").format("HH:mm");
  //   // console.log("formattedShowtime: ", formattedShowtime, " - ", showtime);
  //   // console.log(`${formattedShowdate}T${formattedShowtime}`);
  //   console.log(`${showdate}T${showtime}`);
  //   return `${showdate}T${showtime}`;
  // }
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const fetchRoomsAndShowtime = async (cinemaId) => {
    const roomResponse = await roomApi.getRoomsByCinema(cinemaId);

    const roomByCinema = roomResponse?.data?.data;
    const roomsWithTitle = roomByCinema.map((room) => {
      return {
        ...room,
        title: room.roomName,
        color: getRandomColor(),
      };
    });
    setChoosenCinema(cinemas.find((cinema) => cinema.id == cinemaId));

    setRooms(roomsWithTitle);
    console.log("page in fetch: ", page);
    const showtimesResponse = await showtimeApi.getShowtimesByCinema(
      choosenCineId,
      page
    );
    const showtimesByCinema = showtimesResponse?.data?.data.datas;
    const showtimeToEvent = showtimesByCinema.map((showtime) => {
      const startDate = moment(showtime.showdate + "T" + showtime.showtime);
      const endDate = moment(showtime.showdate + "T" + showtime.finishTime);

      return {
        ...showtime,
        title: showtime.movie.title,
        start_time: startDate,
        end_time: endDate,
        bgColor: "rgba(225, 166, 244, 0.6)",
        group: showtime.room.id,
        // start: "2023-10-11T00:00",
        // end: "2023-10-15T00:00",
        // title: "Event 1",
        // resource: 1,
      };
    });

    setShowtimes(showtimeToEvent);
    setTotalPage(showtimesResponse.data.data.totalPage);
    console.log(showtimesResponse);
  };

  const fetchCinemaByCity = async (city) => {
    const response = await cinemaApi.getByCity(city);

    return response?.data?.data;
  };
  const deleteShowtimes = (id) => {
    try {
      showtimeApi.deleteShowtime(id).then(() => {
        const updatedShowtimes = showtimes.filter(
          (showtime) => showtime.id !== id
        );
        setShowtimes(updatedShowtimes);
        toast.success("Xóa suất phim thành công!!");
      });
    } catch (e) {
      toast.error("Lỗi khi xóa suất chiếu!!");
    }
  };
  const handleChange = (event, page) => {
    setPage(page);
    console.log(page);
  };

  const handleTimeChange = () => {};
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen ">
          <AdminSidebar dashboard="showtime" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 overflow-x-hidden">
            <div className="flex  items-center mb-2  justify-content-between ">
              <h1 className="font-bold text-xl">Lịch chiếu phim</h1>
            </div>

            <br />
            <div className=" bg-orange-300 rounded  mb-4  p-2  px-4  relative flex justify-between">
              <input
                className="w-80 h-10 border  rounded-md focus:outline-none px-2"
                placeholder="Nhập tên suất chiếu để tìm kiếm"
                type="search"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div>
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold mr-2"
                  htmlFor="title"
                >
                  Thành phố:
                </label>
                <select
                  className="w-30 h-10 border  rounded-md focus:outline-none px-2 py-2 text-center"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                >
                  <option value="Ha noi">Hà Nội</option>
                  <option value="Kien giang">Kiên Giang</option>
                  <option value="Can tho">Cần Thơ</option>
                </select>
              </div>
              <div>
                <label
                  className="form-label inline-block mb-2 text-gray-700 font-bold mr-2"
                  htmlFor="title"
                >
                  Rạp:
                </label>
                <select
                  className="w-30 h-10 border  rounded-md focus:outline-none px-2 py-2 text-center"
                  value={choosenCineId}
                  onChange={(e) => setChoosenCineId(e.target.value)}
                  id="cinema"
                >
                  <option value="">Chọn rạp chiếu</option>
                  {cinemas.length != 0 ? (
                    cinemas.map((cinema) => {
                      return (
                        <option key={cinema.id} value={cinema.id}>
                          {cinema.name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">Không có rạp chiếu</option>
                  )}
                </select>
              </div>
            </div>
            <div className="relative w-full rounded  grid grid-cols-6 ">
              <div className="col-span-6  ">
                <div className="">
                  <h2 className="font-bold text-xl">
                    {choosenCinema != null
                      ? `Lịch chiếu của rạp ${choosenCinema.name}`
                      : "Lịch chiếu của rạp"}
                  </h2>
                  <br />

                  <div className={`${rooms != 0 ? "  " : ""}`}>
                    {rooms.length != 0 ? (
                      loading ? (
                        <FontAwesomeIcon
                          className="h-16 w-16"
                          icon={faSpinner}
                          spinPulse
                        />
                      ) : (
                        <Timeline
                          groups={rooms}
                          items={showtimes}
                          defaultTimeStart={moment().add(-12, "hour")}
                          defaultTimeEnd={moment().add(12, "hour")}
                          timeSteps={{
                            second: 1,
                            minute: 15,
                            hour: 1,
                            day: 1,
                            month: 1,
                            year: 1,
                          }}
                        >
                          <TimelineHeaders>
                            <SidebarHeader>
                              {({ getRootProps }) => {
                                return (
                                  <div
                                    className="flex items-center justify-content-around bg-blue-200"
                                    {...getRootProps()}
                                  >
                                    <h1 className="font-bold text-l text-black ">
                                      Các phòng chiếu
                                    </h1>
                                  </div>
                                );
                              }}
                            </SidebarHeader>

                            <DateHeader
                              unit="primaryHeader"
                              className="bg-blue-400 text-black"
                            />

                            <DateHeader />
                          </TimelineHeaders>
                        </Timeline>
                      )
                    ) : (
                      <h1> Không có phòng chiếu!!</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="w-full border-t-4 mt-4 ">
              <div className="flex  items-center mb-2  justify-content-between ">
                <h1 className="font-bold text-xl my-2">
                  Danh sách suất chiếu{" "}
                </h1>
                {choosenCineId && (
                  <Link
                    to={`/admin/cinema/${choosenCineId}/showtimes/edit`}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                  >
                    Thêm suất chiếu mới +
                  </Link>
                )}
              </div>

              {showtimes.length != 0 ? (
                <>
                  {" "}
                  <table className="w-full text-left">
                    <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="py-3 px-6">Tên phim</th>

                        <th className="py-3 px-6">Ngày chiếu</th>

                        <th className="py-3 px-6">Thời lượng</th>
                        <th className="py-3 px-6">Thời gian chiếu</th>
                        <th className="py-3 px-6">Trạng thái</th>

                        <th className="py-3 px-6"></th>
                      </tr>
                    </thead>

                    {showtimes.map((showtime, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="bg-white border-b">
                            <td className="py-4 px-6">
                              {showtime.movie.title}
                            </td>

                            <td className="py-4 px-6">{showtime.showdate}</td>
                            <td className="py-4 px-6">
                              {showtime.movie.runTime}
                            </td>
                            <td className="py-4 px-6">
                              {moment(showtime.showtime, "HH:mm:ss").format(
                                "HH:mm"
                              )}{" "}
                              -{" "}
                              {moment(showtime.finishTime, "HH:mm:ss").format(
                                "HH:mm"
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {showtime.state === "SHOWING"
                                ? "Đang chiếu"
                                : showtime.state === "COMING"
                                ? "Sắp chiếu"
                                : "Đã chiếu"}
                            </td>
                            <td className="py-4 px-6">
                              <Link
                                className="pr-4"
                                to={`/admin/cinema/${choosenCineId}/showtimes/edit/${showtime.id}`}
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
                                  deleteShowtimes(showtime.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-xl text-red-400"
                                />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <Pagination
                    className="mt-4"
                    count={totalPage}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                  ></Pagination>
                </>
              ) : (
                <h2>Không có lịch chiếu !!</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowtimeManagement;
