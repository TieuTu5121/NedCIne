import { Button } from "@mui/material";
import React, { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import showtimeApi from "../../apis/showtimeApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../../configs/http";
import { UserContext } from "../../components/UserContext";
import {
  APP_TITLE,
  EMAILJS_COMFIRM_TICKET_TEMPLATE,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
} from "../../contants";
import img from "../../assets/img/movieScreen.png";
import seatSettingApi from "../../apis/seatSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faL,
  faSpinner,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import productApi from "../../apis/productApi";
import { toast } from "react-hot-toast";
import orderApi from "../../apis/orderApi";
import emailApi from "../../apis/emailApi";
import { Receipt } from "@mui/icons-material";
import ReceiptEmail from "../../emails/Receipt";
import { Result } from "postcss";
const BookingTicket = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [foodOrder, setFoodOrder] = useState([]);
  const [selectedSeatsID, setSelectedSeatsID] = useState([]);
  const [totalSeatPrice, setTotalSeatPrice] = useState(0);
  const [totalFoodPrice, setTotalFoodPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [showtime, setShowtime] = useState({});
  const [room, setRoom] = useState({});
  const [cinema, setCinema] = useState({});
  const [seats, setSeats] = useState([]);
  const [totalFree, setTotalFree] = useState(0);
  const [isLoading, setIsLoanding] = useState(true);
  const [foods, setFoods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const history = useNavigate();
  const [selectedSeatsMap, setSelectedSeatsMap] = useState({});
  useEffect(() => {
    fetchData();
    console.log("fetch data ");
    // console.log(user);
  }, [id]);

  useEffect(() => {
    if (cinema && room && seats.length != 0) {
      setIsLoanding(false);
    }
  }, [showtime, seats]);

  useEffect(() => {
    // Tính toán tổng giá tiền của đồ ăn dựa trên số lượng và giá tiền của từng món
    const newTotalFoodPrice = foodOrder.reduce((total, item) => {
      const itemPrice = foods.find((food) => food.id === item.productId).price;
      return total + itemPrice * item.quantity;
    }, 0);

    // Cập nhật state cho totalFoodPrice
    setTotalFoodPrice(newTotalFoodPrice);
  }, [foodOrder]);

  useEffect(() => {
    if (selectedSeats.length != 0) {
      const price = showtime.price;
      setTotalSeatPrice(selectedSeats.length * price);
    }
  }, [selectedSeats]);
  const fetchData = async () => {
    const response = await showtimeApi.getShowtimeById(id);
    setShowtime(response?.data?.data);
    // console.log(response?.data?.data);
    setIsLoanding(false);

    const seatResponse = await seatSettingApi.getByShowtimeId(id);
    const seatList = seatResponse?.data?.data;
    setSeats(seatList);
    let totalSeatFree = 0;

    seatList.map((seat) => {
      if (seat.status == "AVAILABLE") {
        totalSeatFree++;
      }
    });
    setTotalFree(totalSeatFree);

    const foodResponse = await productApi.getAllProducts();
    const products = foodResponse?.data?.data;
    setFoods(products);
    // console.log(new Date(showtime.showdate));
    changeShowtimeToTimeString();
  };
  const toggleSeat = (seatId) => {
    setSelectedSeatsMap((prevMap) => {
      const newMap = { ...prevMap };

      if (!newMap[seatId]) {
        // Thêm ghế vào danh sách nếu chưa được chọn
        newMap[seatId] = true;

        // Thêm thông tin ghế vào danh sách selectedSeats
        const seat = seats.find((seat) => seat.id == seatId);
        setSelectedSeats((prevSeats) => [...prevSeats, seat]);
      } else {
        // Hủy chọn ghế nếu đã được chọn
        delete newMap[seatId];

        // Xóa thông tin ghế khỏi danh sách selectedSeats
        setSelectedSeats((prevSeats) =>
          prevSeats.filter((seat) => seat.id !== seatId)
        );
      }

      return newMap;
    });
  };

  const renderSeats = () => {
    console.log("render seats");
    const rows = [];
    for (let i = 0; i < seats.length; i += 15) {
      const row = seats.slice(i, i + 15);
      rows.push(
        <div key={i} className="flex mb-2">
          {row.map((seat) => (
            <button
              key={seat.id}
              className={`border-black  border rounded p-1 text-black   mr-2 text-center   text-xs ${
                seat.status === "BOOKED" ? "bg-slate-300" : ""
              } ${selectedSeatsMap[seat.id] ? "bg-red-500" : ""}`}
              disabled={seat.status === "BOOKED"}
              style={{
                fontSize: "10px",
                width: 30,
              }}
              onClick={() => toggleSeat(seat.id)}
            >
              <span className="text-center">
                {seat.seat.row + seat.seat.seatNumber}
              </span>
            </button>
          ))}
        </div>
      );
    }

    return rows;
  };
  // const toggleSeat = (seatId) => {
  //   // Chuyển đổi seatId sang dạng số
  //   seatId = Number(seatId);

  //   // Kiểm tra xem seatId có phải là số và không phải là null hoặc undefined không
  //   if (!isNaN(seatId) && seatId != null && seatId != undefined) {
  //     if (!selectedSeatsID.includes(seatId)) {
  //       // Thêm seatId vào selectedSeatsID
  //       setSelectedSeatsID([...selectedSeatsID, seatId]);

  //       // Thêm seat tương ứng với seatId vào selectedSeats
  //       const seat = seats.find((seat) => seat.id == seatId);
  //       setSelectedSeats([...selectedSeats, seat]);
  //     } else {
  //       // Xóa seatId khỏi selectedSeatsID
  //       setSelectedSeatsID(selectedSeatsID.filter((id) => id != seatId));

  //       // Xóa seat tương ứng với seatId khỏi selectedSeats
  //       setSelectedSeats(selectedSeats.filter((seat) => seat.id != seatId));
  //     }
  //   }
  // };

  const handleDecreaseQuantity = (foodId) => {
    const food = foodOrder.find((food) => food.productId === foodId);
    const foodPrice = foods.find((food) => food.id == foodId).price;

    if (food) {
      if (food.quantity > 0) {
        food.quantity--;
        setFoodOrder([...foodOrder]);
        setTotalFoodPrice(food.quantity * foodPrice);
      }
    } else {
      setFoodOrder([...foodOrder, { productId: foodId, quantity: 0 }]);
    }
  };
  const handleIncreaseQuantity = (foodId) => {
    const food = foodOrder.find((food) => food.productId === foodId);
    // const foodPrice = foods.find((food) => food.id == foodId).price;

    if (food) {
      food.quantity++;
      setFoodOrder([...foodOrder]);
    } else {
      // Nếu food không tồn tại trong foodOrder, thì thêm nó vào mảng
      const newFoodOrderItem = { productId: foodId, quantity: 1 };
      setFoodOrder([...foodOrder, newFoodOrderItem]);
    }

    // Tính toán tổng giá tiền của đồ ăn dựa trên số lượng
    const totalFoodPrice = foodOrder.reduce((total, item) => {
      const itemPrice = foods.find((food) => food.id == item.productId).price;
      return total + itemPrice * item.quantity;
    }, 0);

    // // Cập nhật state cho foodOrder và totalFoodPrice
    // setTotalFoodPrice(totalFoodPrice);
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };
  const createOrder = async (e) => {
    e.preventDefault();
    if (selectedSeats.length == 0) {
      toast.error("Vui lòng chọn ghế ngồi!!");
      return;
    }
    if (selectedPayment == "") {
      toast.error("Vui lòng chọn cách thanh toán!!");
      return;
    }
    if (user == null) {
      if (window.confirm("Vui lòng đăng nhập để đặt vé!!!")) {
        history("/default/login");
        return;
      }
    }
    let seatSettings = [];
    selectedSeats.map((seat) =>
      seatSettings.push({
        id: seat.id,
        seatId: seat.seat.id,
        showtimeId: seat.showtime.id,
        status: seat.status,
      })
    );
    const data = {
      userId: user.id,
      discount: 0,
      seatSettings: seatSettings,
      productOrderInfos: foodOrder,
      createdAt: new Date(),
    };

    orderApi.createOrder(data).then((data) => {
      toast.success("Đặt vé thành công!!!");
      setOrder(data?.data?.data);
      orderApi.getOrderById(data?.data?.data.id).then((data) => {
        // console.log(data);
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_COMFIRM_TICKET_TEMPLATE,
          {
            name: user?.username,
            movieTitle: showtime.movie.title,
            showtime: changeShowtimeToTimeString(),
            email: user.email,
            linkOrder: `http://localhost:3000/default/user-orders/view/${data.data.data.id}`,
          },
          EMAILJS_PUBLIC_KEY
        );
      });
      history("/default");
    });
  };
  const changeShowtimeToTimeString = () => {
    const day = new Date(showtime?.showdate).getDate();
    const month = new Date(showtime?.showdate).getMonth();
    const year = new Date(showtime?.showdate).getFullYear();
    const showtimeString =
      showtime.showtime + " ngày " + day + "-" + month + "-" + year;
    // console.log(showtime.showtime + " ngày " + day + "-" + month + "-" + year);
    return showtimeString;
  };

  return (
    <>
      <div className="container min-h-full">
        {!isLoading ? (
          <>
            <div className="border bg-slate-800 text-white text-xl font-semibold text-center p-2">
              <h1>BOOKING TICKET</h1>
            </div>
            <div className="p-2 border bg-orange-100">
              <div className="font-semibold">
                <span>
                  {showtime.room?.cinema?.name} | {showtime.room?.roomName} | Số
                  ghế {`(`}
                  {totalFree} / {seats.length}
                  {`)`}
                </span>
                <p className="tracking-widest">
                  {showtime.showdate} {showtime.showtime} ~ {showtime.showdate}{" "}
                  {showtime.finishTime}
                </p>
              </div>
            </div>
            <div className="border">
              <div className="mt-4 bg-slate-300 text-center p-1 font-semibold text-lg">
                Người / Ghế
              </div>
              <img
                className="w-11/12 m-auto pt-4"
                src={img}
                alt="Movie Screen"
              />
              <div className="  flex justify-center">
                <div className="flex flex-col mb-4 mt-20 ml-16 w-6/12 ">
                  {renderSeats()}
                </div>
              </div>
              <div className="legend flex justify-center">
                <div className="flex items-center mr-4">
                  <div className="mr-2 bg-slate-300 w-3 h-3 "></div>
                  <span>Đã đặt</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="mr-2 bg-red-500 w-3 h-3 text-center "></div>
                  <span>Đã chọn</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="mr-2 bg-yellow-300 w-3 h-3   "></div>
                  <span>Không thể chọn</span>
                </div>
              </div>
              <div className="bg-slate-400 py-2 text-2xl text-black text-center font-bold mt-12">
                <h2>Bắp nước</h2>
              </div>
              <div className="grid grid-cols-2 gap-5 ml-32 mb-8">
                {foods.map((food) => {
                  const foodOrderItem = foodOrder.find(
                    (food1) => food1.productId === food.id
                  );
                  const quantity = foodOrderItem ? foodOrderItem.quantity : 0;

                  return (
                    <div key={food.id} className="grid grid-cols-4 mt-5">
                      <div className="col-span-1">
                        <img src={food.photo} alt="" />
                      </div>
                      <div className="col-span-3">
                        <h3 className="text-lg font-bold uppercase">
                          {food.name}
                        </h3>
                        <p>* Miễn phí đổi vị bắp Phô mai, Caramel</p>
                        <p>** Nhận trong ngày xem phim</p>
                        <p>
                          Giá:
                          <strong>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(food.price)}
                          </strong>
                        </p>
                        <div className="flex mt-3">
                          <button
                            className="bg-red-600 px-2 text-white hover:bg-red-500"
                            onClick={() => handleDecreaseQuantity(food.id)}
                          >
                            -
                          </button>
                          <span className="border border-black inline-block w-8 h-6 text-center mx-3">
                            {quantity}
                          </span>
                          <button
                            className="bg-red-600 px-2 text-white hover-bg-red-500"
                            onClick={() => handleIncreaseQuantity(food.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 bg-black p-4 w-full">
                <div className="flex">
                  <img
                    src={showtime.movie.poster}
                    alt=""
                    className="w-52 mr-12"
                  />
                  <div className="text-white">
                    <h3 className="font-bold text-2xl mb-4">
                      {showtime.movie.title}
                    </h3>
                    <p>
                      <strong>Chỗ Ngồi: </strong>
                      {selectedSeats.map((seat, index) => (
                        <span key={index}>
                          {seat.seat.row}
                          {seat.seat.seatNumber},{" "}
                        </span>
                      ))}
                    </p>
                    <p>
                      <strong>Phòng chiếu: </strong>
                      {showtime.room?.cinema?.name}
                    </p>
                    <p>
                      <strong>Suất chiếu: </strong>
                      {showtime.showtime}, {showtime.showdate}
                    </p>
                    <p>
                      <strong>Giá phim: </strong>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalSeatPrice)}
                    </p>
                    <p>
                      <strong>Giá đồ ăn: </strong>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalFoodPrice)}
                    </p>
                    <p>
                      <strong>Tổng: </strong>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalFoodPrice + totalSeatPrice)}
                    </p>
                    <form className="pay-form">
                      <strong>Chọn phương thức thanh toán: </strong>
                      <label className="pl-5 pr-2" htmlFor="atm">
                        Thanh toán bằng ATM
                      </label>
                      <input
                        type="radio"
                        value="atm"
                        id="atm"
                        name="pay"
                        checked={selectedPayment === "atm"}
                        onChange={handlePaymentChange}
                      />
                      <label className="pl-5 pr-2" htmlFor="momo">
                        Thanh toán bằng MOMO
                      </label>
                      <input
                        type="radio"
                        value="MOMO"
                        id="momo"
                        name="pay"
                        checked={selectedPayment === "MOMO"}
                        onChange={handlePaymentChange}
                      />
                      <label className="pl-5 pr-2" htmlFor="cash">
                        Thanh toán tại quầy
                      </label>
                      <input
                        type="radio"
                        value="cash"
                        id="cash"
                        name="pay"
                        checked={selectedPayment === "cash"}
                        onChange={handlePaymentChange}
                      />
                    </form>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    onClick={createOrder}
                    className="bg-blue-600 rounded-md text-white font-bold px-10 py-3 text-lg hover:bg-blue-500"
                    disabled={isPending}
                  >
                    {isPending ? "Đang đặt vé..." : "Xác nhận"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="m-auto">
            <FontAwesomeIcon className="h-16 w-16" icon={faSpinner} spinPulse />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingTicket;
