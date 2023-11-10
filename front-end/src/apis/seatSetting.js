import axios from "axios";
import http from "../configs/http";

const seatSettingApi = {
  getAllSeatSettings: async () => {
    const response = await http.get("seat-settings");
    return response;
  },

  getSeatSettingById: async (id) => {
    const response = await http.get(`seat-settings/${id}`);
    return response;
  },

  createSeatSetting: async (seatSettingCreateRequestDto) => {
    const response = await http.post(
      "/api/v1/seat-settings",
      seatSettingCreateRequestDto
    );
    return response;
  },

  updateSeatSetting: async (id, seatSettingUpdateDto) => {
    const response = await http.put(
      `/api/v1/seat-settings/${id}`,
      seatSettingUpdateDto
    );
    return response;
  },
  getByShowtimeId: async (id) => {
    const response = await http.get(`seat-settings/get-by-showtime/${id}`);
    return response;
  },
  deleteSeatSetting: async (id) => {
    const response = await http.delete(`seat-settings/${id}`);
  },
};

export default seatSettingApi;
