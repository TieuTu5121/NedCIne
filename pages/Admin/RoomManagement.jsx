import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { APP_TITLE } from "../../contants";
import { Link, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import { useEffect } from "react";
import cinemaApi from "../../apis/cinemaApi";
import roomApi from "../../apis/roomApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faL,
  faSpinner,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const RoomManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cinema, setCinema] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loadding, setLoadding] = useState(true);
  const { id } = useParams();
  document.title = APP_TITLE + "Quản lí phòng chiếu";

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
    console.log(loadding);
  }, [id]);

  const fetchCinemaById = async (id) => {
    const response = await cinemaApi.getCinemaById(id);

    return response.data.data;
  };

  // ...
  const fetchRoomsByCinema = async (cinemaId) => {
    const roomsPromise = await roomApi.getRoomsByCinema(cinemaId);
    // console.log(roomsPromise.data.data);
    return roomsPromise.data.data;
  };

  const fetchData = async () => {
    const cinema = await fetchCinemaById(id);
    setCinema(cinema);

    const rooms = await fetchRoomsByCinema(id);
    setRooms(rooms);
    console.log(rooms);
    setLoadding(false);
  };
  const deleteRoom = async (roomid) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        await roomApi.deleteRoom(roomid);
        const updatedProduct = rooms.filter((room) => room.id !== roomid);
        toast.success("Xóa phòng chiếu thành công!!!");

        setRooms(updatedProduct);
      } catch (error) {
        console.error("Lỗi khi xóa phòng chiếu: ", error);
        toast.error("Lỗi khi xóa phòng chiếu!!!");
      }
    }
  };
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white min-h-screen">
          <AdminSidebar dashboard="cinema" />
        </div>
        <div className="col-span-5">
          <div className="container p-10 overflow-x-hidden">
            <h1 className="font-bold text-xl">
              Rạp Chiếu {cinema.name} - Thành Phố: {cinema.city}
            </h1>

            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xl">Danh sách phòng chiếu</h3>
              <Link
                to={`/admin/cinema/${id}/room-management/edit/`}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
              >
                Thêm phòng chiếu mới +
              </Link>
            </div>
            <div className="relative">
              <table className="w-full text-left">
                <thead className="font-bold text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Tên Phòng</th>
                    <th className="py-3 px-6">Số lượng ghế</th>

                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {loadding ? (
                    <tr className="">
                      <td
                        className="w-96 h-96 justify-center text-center  "
                        colSpan={4}
                      >
                        <FontAwesomeIcon
                          className="h-16 w-16"
                          icon={faSpinner}
                          spinPulse
                        />
                      </td>
                    </tr>
                  ) : (
                    rooms.map((room, index) => {
                      return (
                        <tr key={room.id} className="bg-white border-b">
                          <td className="py-4 px-6">{room.id}</td>
                          <td className="py-4 px-6 font-bold text-gray-900 whitespace-nowrap">
                            {room.roomName}
                          </td>
                          <td className="py-4 px-6">{room.seatQuantity}</td>
                          <td className="py-4 px-6">
                            <Link
                              className="pr-4"
                              to={`/admin/cinema/${id}/room-management/edit/${room.id}`}
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
                                deleteRoom(room.id);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-xl text-red-400"
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomManagement;
