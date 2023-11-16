import React, { useState, useEffect, useContext } from "react";
import UserSidebar from "../../components/UserSidebar";
import { UserContext } from "../../components/UserContext";
import orderApi from "../../apis/orderApi";
import { faL, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { APP_TITLE } from "../../contants";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  document.title = APP_TITLE + "Đơn hàng của tôi";
  useEffect(() => {
    if (user?.id) {
      orderApi.getOrdersByUser(user.id, page).then((data) => {
        const data1 = data?.data?.data?.datas;
        setOrders(data1);
        setIsLoading(false);
        setTotalPage(data.data.data.totalPage);
        console.log(data);
      });
    }
    console.log(user);
  }, [page]);
  const handleChange = (event, page) => {
    setPage(page);
    console.log(page);
  };
  return (
    <div className="mt-28">
      <div className="grid grid-cols-6 gap-10">
        <UserSidebar dashboard="orders" />
        <div className="col-span-5">
          <h1 className=" text-xl uppercase text-center text-white bg-black p-1">
            Hóa đơn của bạn
          </h1>

          {orders.length != 0 || !isLoading ? (
            <>
              <div className="flex  justify-end">
                <span className="mt-4 pt-1  text-slate-600 ">
                  1-10 of {orders.length} {"  "}
                  <span>HIỆN THI:</span>
                </span>
                <Pagination
                  className="mt-4 float-right "
                  count={totalPage}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                ></Pagination>
              </div>
              {orders.map((order, index) => {
                return (
                  <div
                    key={index}
                    className=" mt-4 pb-2 border-bottom border-black"
                  >
                    <span className="font-bold">
                      Mã đặt vé: {order.id}{" "}
                      <span className="text-sm italic">
                        (Trạng thái:{" "}
                        {order.state == "PAID" ? "Hoàn tất" : "Chưa thanh toán"}
                        )
                      </span>
                    </span>

                    <div className="grid grid-cols-6 mt-1 w-full">
                      <div className="col-span-1 pr-4">
                        <img
                          className="w-full h-68"
                          src={order.showtime.movie.poster}
                        />
                      </div>
                      <div className="col-span-5 ">
                        <p>{order.showtime.movie.title}</p>
                        <p>
                          Ngày:{" "}
                          {new Date(order.showtime.showDate)
                            .toLocaleString()
                            .slice(0, 10)}
                        </p>
                        <p>
                          Từ {order.showtime.startTime} ~ Tới{" "}
                          {order.showtime.finishTime}
                        </p>
                        <p>{order.showtime.room.cinema.name}</p>
                        <p>
                          {order.showtime.room.roomName} (
                          {order.seats.map((seat, index) => (
                            <span key={index}>
                              {seat.row}
                              {seat.seatNumber}
                              {index !== order.seats.length - 1 ? ", " : ""}
                            </span>
                          ))}
                          )
                        </p>
                        <p className="mb-3">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.total)}
                        </p>
                        <Link
                          to={`/default/user-orders/view/${order.id}`}
                          className="bg-blue-400 p-2 rounded "
                        >
                          Xem
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex justify-content-center mt-8">
              {" "}
              <FontAwesomeIcon
                className="h-16 w-16"
                icon={faSpinner}
                spinPulse
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
