import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import moment from "moment";

import { Link, useNavigate, useParams } from "react-router-dom";
import showtimeApi from "../apis/showtimeApi";
import { Calculate } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const ChosingShowtimeModal = ({ movieId, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showtimesByCityAndDate, setSTimesByCityAndDate] = useState([]);
  const { id } = useParams();

  const history = useNavigate();
  useEffect(() => {
    fetchDay();
  }, []);
  useEffect(() => {
    if (selectedCity !== "" && selectedDate !== null) {
      fetchShowtimeByDateAndCity(selectedDate, selectedCity);
    }
    // console.log(movieId);
    // console.log("fetchShowtimeByDateAndCity: ", showtimesByCityAndDate);
  }, [selectedCity, selectedDate]);
  const style = {
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    px: 4,
    mt: 8,
    overflow: "auto",
  };
  const fetchShowtimeByDateAndCity = async (date, city) => {
    try {
      const data = {
        movieId: movieId, // Chỉnh sửa ID phim theo cần thiết
        city,
        date,
      };

      const response = await showtimeApi.getShowtimesByCityAndDate(data);
      const showtimesByCityAndDate = response?.data?.data;
      setSTimesByCityAndDate(showtimesByCityAndDate);
      console.log(showtimesByCityAndDate);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchDay = () => {
    const dateList = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dateList.push(date);
    }
    setDates(dateList);
  };
  const handleClickShowtime = () => {};

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <div className=" border-y-4 py-2">
            <ul className="flex flex-wrap justify-content: space-between">
              {dates.map((date) => (
                <li key={date.toISOString()} className="mr-4 date-pick">
                  <button
                    className={` text-black hover:rounded   hover:border-slate-600 hover:border-2 grid grid-cols-2  ${
                      selectedDate == date.toISOString().slice(0, 10)
                        ? "rounded   border-black border-2"
                        : ""
                    }`}
                    type="button"
                    tabIndex={0}
                    onClick={() => {
                      // Cập nhật trạng thái của biến selectedDate
                      setSelectedDate(date.toISOString().slice(0, 10));
                      console.log(date.toISOString().slice(0, 10));
                    }}
                  >
                    <div className="date col-span-1 grid grid-row-2">
                      <span>{date.getMonth() + 1}</span>
                      <em>{date.toDateString().slice(0, 3)}</em>
                    </div>
                    <div className="date col-span-1 text-gray-600">
                      <p>{date.getDate()}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {
            //Select City
          }
          <div className="my-2 border-b-4 pb-2">
            <ul className="flex ">
              <li className="mr-4 ">
                <button
                  className={`text-black hover:rounded   hover:border-slate-600 hover:border-2 p-2   ${
                    selectedCity == "Can tho"
                      ? "rounded   border-black border-2"
                      : ""
                  }`}
                  value="Can tho"
                  onClick={(e) => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  Cần Thơ
                </button>
              </li>
              <li className="mr-4 ">
                <button
                  className={`text-black hover:rounded   hover:border-slate-600 hover:border-2 p-2  ${
                    selectedCity == "Ha noi"
                      ? "rounded   border-black border-2"
                      : ""
                  }`}
                  value="Ha noi"
                  onClick={(e) => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  Hà Nội
                </button>
              </li>
              <li className="mr-4 ">
                <button
                  className={`text-black hover:rounded   hover:border-slate-600 hover:border-2 p-2  ${
                    selectedCity == "Kien giang"
                      ? "rounded   border-black border-2"
                      : ""
                  }`}
                  value="Kien giang"
                  onClick={(e) => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  Kiên Giang
                </button>
              </li>
            </ul>
          </div>
          {
            // Select Showtime
          }
          {showtimesByCityAndDate != null &&
          showtimesByCityAndDate.length != 0 ? (
            <>
              {showtimesByCityAndDate.map((showtimeByCityAndDate) => (
                <>
                  <div
                    key={showtimeByCityAndDate.id}
                    className="my-2 border-b-4 pb-2"
                  >
                    <h1 className="text-xl   text-slate-600">
                      {showtimeByCityAndDate.cinema.name}
                    </h1>
                    <span className="ml-2 text-sm text-black">Rạp 2D </span>
                    <div className="flex mt-2">
                      {showtimeByCityAndDate.showtimes.map((showtime) => (
                        <>
                          <Link
                            key={showtime.id}
                            to={`/default/movies/booking-ticket/${showtime.id}`}
                            onClick={handleClickShowtime()}
                            className="mr-2 border-2 px-4 py-1 rounded hover:border-black"
                          >
                            {showtime.startTime}
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <p>Xin lỗi, Không có lịch chiếu vào ngày này!</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ChosingShowtimeModal;
