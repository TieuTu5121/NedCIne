import axios from "axios";
import http from "../configs/http";

const showtimeApi = {
  getAllShowtimes: async () => {
    const response = await http.get("/api/v1/showtimes");
    return response;
  },

  getShowtimeById: async (id) => {
    const response = await http.get(`/api/v1/showtimes/${id}`);
    return response;
  },

  createShowtime: async (showtimeCreateRequestDto) => {
    const response = await http.post(
      "/api/v1/showtimes",
      showtimeCreateRequestDto
    );
    return response;
  },

  updateShowtime: async (id, showtimeUpdateDto) => {
    const response = await http.put(
      `/api/v1/showtimes/${id}`,
      showtimeUpdateDto
    );
    return response;
  },

  deleteShowtime: async (id) => {
    const response = await http.delete(`/api/v1/showtimes/${id}`);
  },
};

export default showtimeApi;
