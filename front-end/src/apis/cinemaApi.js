import axios from "axios";
import http from "../configs/http";

const cinemaApi = {
  getAllCinemas: async () => {
    const response = await http.get("cinemas");
    return response;
  },

  getCinemaById: async (id) => {
    const response = await http.get(`cinemas/${id}`);
    return response;
  },

  createCinema: async (cinemaCreateRequestDto) => {
    const response = await http.post("cinemas", cinemaCreateRequestDto);
    return response;
  },

  updateCinema: async (id, cinemaUpdateDto) => {
    const response = await http.put(`cinemas/${id}`, cinemaUpdateDto);
    return response;
  },

  deleteCinema: async (id) => {
    const response = await http.delete(`cinemas/${id}`);
  },
  getByCity: async (city) => {
    const response = await http.get(`cinemas/by-city?city=${city}`);
    return response;
  },
};

export default cinemaApi;
