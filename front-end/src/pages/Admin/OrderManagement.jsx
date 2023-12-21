import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import orderApi from "../../apis/orderApi";
import { nonAccentVietnamese } from "../../composables/nonAccentVietnamese.js";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faL,
  faSpinner,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    fetchOrder(page);
  }, [page]);
  const fetchOrder = async (page) => {
    const response = await orderApi.getAllOrders(page);
    const orders1 = response?.data?.data?.datas;
    setOrders(orders1);
    setTotalPage(response?.data?.data.totalPage);
    console.log(response?.data?.data?.datas);
  };
  const toLowerCase = (string) => {
    return nonAccentVietnamese().toLowerCaseNonAccentVietnamese(string);
  };

  function resultQuery() {
    if (searchQuery) {
      const searchLower = toLowerCase(searchQuery);
      return orders.filter((order) => {
        const movieTitle = toLowerCase(order.showtime.movie.title);
        const showDate = order.showtime.showDate; // Thời gian chiếu
        const createdAt = order.createdAt; // Thời gian đặt
        const username = toLowerCase(order.user.username);

        return (
          movieTitle.includes(searchLower) || // Kiểm tra tên phim
          showDate.includes(searchQuery) || // Kiểm tra thời gian chiếu
          createdAt.includes(searchQuery) || // Kiểm tra thời gian đặt
          username.includes(searchLower) // Kiểm tra tên người đặt
        );
      });
    } else {
      return orders;
    }
  }
  const handleChange = (event, page) => {
    setPage(page);
    console.log("page:", page);
  };
  const deleteOrder = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hóa đơn này?")) {
      try {
        await orderApi.deleteOrder(id); // Gọi API để xóa hóa đơn với ID đã cho

        // Sau khi xóa thành công, bạn cần cập nhật danh sách hóa đơn, có thể gọi lại hàm `fetchOrder` hoặc làm theo cách khác để cập nhật danh sách.

        // Ví dụ, sau khi xóa, bạn có thể sử dụng filter để loại bỏ hóa đơn đã xóa từ danh sách hiện tại:
        setOrders((orders) => orders.filter((order) => order.id !== id));

        toast.success("Xóa hóa đơn thành công!!!");
      } catch (error) {
        toast.error("Xóa thất bại :((");
        console.error("error : ", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white min-h-full">
        <AdminSidebar dashboard="orders" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 overflow-x-hidden">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-xl">Quản lý hóa đơn</h1>
          </div>
          <div className="mb-2 relative">
            <input
              className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
              placeholder="Nhập tên người dùng để tìm kiếm"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
          </div>
          <div className="relative mb-2">
            <table className="w-full text-left">
              <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">Tên phim</th>
                  <th></th>
                  <th className="py-3 px-6">Tên rạp</th>
                  <th className="py-3 px-6">Thời gian chiếu</th>
                  <th className="py-3 px-6">Ghế</th>
                  <th className="py-3 px-6">Giá tiền</th>
                  <th className="py-3 px-6">Tên người đặt</th>
                  <th className="py-3 px-6">Trạng thái</th>
                  <th className="py-3 px-6">Thời gian tạo</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {resultQuery().map((order, index) => (
                  <tr key={order.id} className="bg-white border-b">
                    <td
                      colSpan="2"
                      className="py-4 px-6 font-bold text-gray-900"
                    >
                      {order.showtime.movie?.title}
                    </td>
                    <td className="py-4 px-6  text-gray-900">
                      {order.showtime?.room?.cinema?.name +
                        " - " +
                        order.showtime?.room?.roomName}
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {`${order.showtime.showDate} ${order.showtime.startTime}`}
                    </td>
                    <td className="py-4 px-6">
                      {order.seats
                        .map((seat) => seat.row + seat.seatNumber)
                        .join(", ")}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total)}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {order.user.username}
                    </td>
                    <td className={`py-4 px-6 font-bold `}>
                      {order.state === "PAID"
                        ? "Đã Thanh toán"
                        : "Chưa thanh toán"}
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <Link className="pr-4">
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
                          deleteOrder(order.id);
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
            <Pagination
              className="mt-4 w-full"
              count={totalPage}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
