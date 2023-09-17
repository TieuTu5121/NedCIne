import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const OrderManagement = () => {
  //   const [orders, setOrders] = useState([]);
  //   const [userDisplayName, setUserDisplayName] = useState([]);
  //   const [msg, setMsg] = useState('');

  //   useEffect(() => {
  //     fetch('http://localhost:3000/api/orders')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const unpaidOrders = data.filter((order) => order.Status === 'Chưa thanh toán');
  //         setOrders(unpaidOrders);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     fetch('http://localhost:3000/api/roles')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const updatedOrders = orders.map((order) => {
  //           const user = data.find((d) => d._id === order.UserID);
  //           if (user) {
  //             return {
  //               ...order,
  //               userDisplayName: user.displayName,
  //             };
  //           }
  //           return order;
  //         });
  //         setOrders(updatedOrders);
  //       });
  //   }, [orders]);

  //   const confirmOrder = async (orderId, index) => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           Status: 'Đã thanh toán',
  //         }),
  //       });

  //       if (response.status === 200) {
  //         const updatedOrders = [...orders];
  //         updatedOrders.splice(index, 1);
  //         setOrders(updatedOrders);
  //         setMsg('Xác nhận hóa đơn thành công');
  //       }
  //     } catch (error) {
  //       setMsg(error.message);
  //     }
  //   };

  //   const removeOrder = async (orderId, index) => {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
  //         method: 'DELETE',
  //       });

  //       if (response.status === 200) {
  //         const updatedOrders = [...orders];
  //         updatedOrders.splice(index, 1);
  //         setOrders(updatedOrders);
  //         setMsg('Xóa hóa đơn thành công');
  //       }
  //     } catch (error) {
  //       setMsg(error.message);
  //     }
  //   };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="orders" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 overflow-x-hidden">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-xl">Quản lý hóa đơn</h1>
            {/* <a
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
              href="/orders-paid"
            >
              Xem hóa đơn đã thanh toán
            </a> */}
          </div>
          <div className="mb-2 relative">
            <input
              className="w-1/2 h-10 border border-gray-600 rounded-md focus:outline-none px-2"
              placeholder="Nhập tên người dùng để tìm kiếm"
              type="search"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-1/2 top-1/2 -translate-y-1/2 pr-2"></i>
          </div>
          {/* {msg && <div className="text-bold text-red-400">{msg}</div>} */}

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {orders.map((order, index) => (
                  <tr key={order._id} className="bg-white border-b">
                    <td
                      colSpan="2"
                      className="py-4 px-6 font-bold text-gray-900"
                    >
                      {order.MovieTitle}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {order.CinemaName}
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {`${order.Date} ${order.Time}`}
                    </td>
                    <td className="py-4 px-6">{order.SeatNumber.join(", ")}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.Price)}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {order.userDisplayName}
                    </td>
                    <td
                      className={`py-4 px-6 font-bold ${
                        order.Status === "Đã thanh toán"
                          ? "text-red-400"
                          : "text-gray-900"
                      }`}
                    >
                      {order.Status}
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {moment(order.createdAt).format("HH:mm:ss YYYY-MM-DD")}
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => confirmOrder(order._id, index)}>
                        <i className="fa-solid fa-check text-xl text-white rounded-sm px-1 bg-green-500 hover:bg-green-400"></i>
                      </button>
                      <button
                        className="mt-3"
                        onClick={() => removeOrder(order._id, index)}
                      >
                        <i className="fa-solid fa-trash-can text-xl text-white rounded-sm px-1 bg-red-500 hover:bg-red-400"></i>
                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
