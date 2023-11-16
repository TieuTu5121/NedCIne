import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import roomApi from "../../apis/roomApi";
import cinemaApi from "../../apis/cinemaApi";

const RoomManagementEdit = () => {
  const [roomName, setRoomName] = useState("");
  const [seatQuantity, setSeatQuantity] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [room, setRoom] = useState({});
  const [cinema, setCinema] = useState({});
  const { id, roomId } = useParams("");
  const history = useNavigate();

  useEffect(() => {
    fetchcinema();
    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const fetchcinema = async () => {
    const cinema = await fetchCinemaById(id);
    setCinema(cinema);
    // console.log("cinema>>> ", cinema);
  };

  const fetchRoom = async () => {
    const room = await fetchRoomById(roomId);
    setRoom(room);
    // console.log("rooms>>> ", room);
  };

  const fetchCinemaById = async (id) => {
    const response = await cinemaApi.getCinemaById(id);

    return response.data.data;
  };
  const fetchRoomById = async (roomId) => {
    const response = await roomApi.getRoomById(roomId);
    return response.data.data;
  };
  const handleSubmit = (e) => {
    // console.log(room);
    setIsPending(true);
    e.preventDefault();

    const roomData = {
      roomName: room.roomName,
      seatQuantity: room.seatQuantity,
      cinema: cinema,
    };
    console.log(roomData);
    // Kiểm tra trường `roomName`
    if (room.roomName === "" || room.roomName === undefined) {
      toast.error("Chưa nhập tên phòng chiếu!");
      setIsPending(false);

      return;
    }

    // Kiểm tra trường `seatQuantity`
    if (room.seatQuantity === "" || room.seatQuantity === undefined) {
      toast.error("Chưa nhập số lượng!");
      setIsPending(false);

      return;
    }

    try {
      if (roomId) {
        roomApi.updateRoom(roomId, roomData).then(() => {
          // console.log(response);
          toast.success("Cập nhật phòng chiếu thành công!!!");
          history(-1);
        });
      } else {
        roomApi.createRoom(roomData).then((data) => {
          toast.success("Thêm phòng chiếu thành công!!!");
          history(-1);

          console.log("create product sucess !!!", data);
        });
      }
    } catch (error) {
      toast.error("Có lỗi đã xảy ra!!!");
      console.log("error: ", error);
    }
    setIsPending(false);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history(-1); // This will navigate back to the previous page
  };
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1 bg-slate-500 text-white h-screen">
        <AdminSidebar dashboard="cinema" />
      </div>
      <div className="col-span-5">
        <div className="container p-10 relative">
          <h1 className="font-bold text-xl">Thông tin phòng chiếu</h1>
          <form onSubmit={handleSubmit} className="w-full relative">
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="title"
              >
                Tên phòng chiếu
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="text"
                value={room.roomName}
                onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
                placeholder="Nhập tên phòng chiếu..."
                id="name"
              />
            </div>
            <div className="form-group mb-6">
              <label
                className="form-label inline-block mb-2 text-gray-700 font-bold"
                htmlFor="title"
              >
                Số lượng ghế
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="number"
                value={room.seatQuantity}
                onChange={(e) =>
                  setRoom({ ...room, seatQuantity: e.target.value })
                }
                placeholder="Ví dụ:  120"
                id="name"
              />
            </div>

            <div className="relative py-8">
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
  );
};

export default RoomManagementEdit;
