import axios from "axios";
import http from "../configs/http";

const roomApi = {
  getAllRooms: async () => {
    const response = await http.get("rooms");
    return response;
  },

  getRoomById: async (id) => {
    const response = await http.get(`rooms/${id}`);
    return response;
  },

  createRoom: async (roomCreateRequestDto) => {
    const response = await http.post("rooms", roomCreateRequestDto);
    return response;
  },

  updateRoom: async (id, roomUpdateDto) => {
    const response = await http.put(`rooms/${id}`, roomUpdateDto);
    return response;
  },

  deleteRoom: async (id) => {
    const response = await http.delete(`rooms/${id}`);
  },
  // Thêm API mới
  getRoomsByCinema: async (cinemaId) => {
    const response = await http.get(`rooms/by-cinema/${cinemaId}`);
    return response;
  },
};

export default roomApi;
