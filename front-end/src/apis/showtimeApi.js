import http from "../configs/http";

const showtimeApi = {
  getAllShowtimes: async () => {
    const response = await http.get("showtimes");
    return response;
  },

  getShowtimeById: async (id) => {
    const response = await http.get(`showtimes/${id}`);
    return response;
  },

  getShowtimesByCinema: async (cinemaId, page) => {
    const response = await http.get(`showtimes/get-by-cinema/${cinemaId}`, {
      params: { page: page },
    });
    return response;
  },

  createShowtime: async (showtimeCreateRequestDto) => {
    const response = await http.post("showtimes", showtimeCreateRequestDto);
    return response;
  },

  updateShowtime: async (id, showtimeUpdateDto) => {
    const response = await http.put(`showtimes/${id}`, showtimeUpdateDto);
    return response;
  },

  deleteShowtime: async (id) => {
    const response = await http.delete(`showtimes/${id}`);
    return response;
  },

  getShowtimesByCityAndDate: async (showtimeRequestBookingDto) => {
    const response = await http.post(
      `/showtimes/get-by-cityAndShowDate`,
      showtimeRequestBookingDto
    );
    return response;
  },
};

export default showtimeApi;
