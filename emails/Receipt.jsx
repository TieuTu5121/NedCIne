import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import Barcode from "react-barcode";

export const ReceiptEmail = ({ order }) => {
  return (
    <div className="mt-28 container">
      {
        <div className="col-span-5">
          <h1 className=" text-2xl uppercase text-center text-white bg-black p-1">
            mã đặt vé #{id} - hoàn tất
          </h1>
          <div className="border-2 w-fit mt-4">
            <Barcode value={id} />
          </div>
          <h1 className="uppercase mt-2 text-slate-600 text-sm mb-4 ">
            Ngày mua hàng: ngày {new Date(order.createdAt).getDate()} tháng{" "}
            {new Date(order.createdAt).getMonth()} năm{" "}
            {new Date(order.createdAt).getFullYear()}
          </h1>
          <div className="grid grid-cols-2 mb-12">
            <div className="col-span-1  ">
              <p className="font-bold">Địa chỉ thanh toán</p>
              <p className="text-slate-500 text-sm">{order.user?.username}</p>
              <p className="text-slate-500 text-sm">T: 0837656171</p>
            </div>
            <div className="col-span-1">
              <p className="font-bold">Phương thức thanh toán</p>
              <p className="text-slate-500 text-sm">
                Thanh toán tại quầy thanh toán.
              </p>
              <p className="text-slate-500 text-sm">Thanh toán thành công.</p>
            </div>
          </div>
          <div className="border-b-2 flex justify-between">
            <div className="bg-red-500 p-2 rounded-t-lg text-white font-bold">
              Thông tin giao dịch
            </div>
            <div className="bg-red-500 p-2 rounded-t-lg text-white font-bold">
              In đơn hàng
            </div>
          </div>
          <h1 className=" text-xl uppercase text-center text-white bg-black p-1 mt-2">
            chi tiết giao dịch
          </h1>
          <div className="relative ">
            <table className="w-full mt-3 border-collapse border border-slate-500">
              <thead>
                <tr className="text-white bg-black text-center">
                  <th className="border-2 border-slate-600 py-1 px-3 w-2/12">
                    Tên phim
                  </th>
                  <th className="border-2 border-slate-600 py-1 px-3 w-2/12">
                    Suất chiếu
                  </th>
                  <th className="border-2 border-slate-600 py-1 px-3 w-2/12">
                    Vé
                  </th>

                  <th className="border-2 border-slate-600 py-1 px-3 w-1/12">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 px-3 ">{order.showtime?.movie?.title}</td>
                  <td className="py-1 px-3 ">
                    <p className="font-bold ">
                      {order.showtime?.room?.cinema.name}
                    </p>
                    <p>{order.showtime?.room.roomName}</p>
                    <p>
                      {new Date(order.showtime?.showDate)
                        .toLocaleString()
                        .slice(0, 10)}
                    </p>
                    <p>Từ {order.showtime?.startTime}</p>
                  </td>
                  <td className="py-1 px-3 ">
                    <p className="font-bold">Prime</p>
                    <p>
                      {order != null &&
                        order?.seats.map((seat, index) => (
                          <span key={index}>
                            {seat.row}
                            {seat.seatNumber}
                            {index !== order.seats.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      <p>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalSeatPrice(order))}
                      </p>
                    </p>
                  </td>

                  <td className="py-1 px-3 font-bold ">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalSeatPrice(order))}
                  </td>
                </tr>
                <tr className="text-end font-bold">
                  <td colSpan={4} className=" px-4 py-1">
                    Tổng cộng:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

export default ReceiptEmail;
