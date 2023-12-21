import axios from "axios";
import http from "../configs/http";

const orderApi = {
  getAllOrders: async (page) => {
    const response = await http.get("orders", { params: { page: page } });
    return response;
  },

  getOrderById: async (id) => {
    const response = await http.get(`orders/${id}`);
    return response;
  },

  createOrder: async (orderCreateRequestDto) => {
    const response = await http.post("orders", orderCreateRequestDto);
    return response;
  },

  updateOrder: async (id, orderUpdateDto) => {
    const response = await http.put(`orders/${id}`, orderUpdateDto);
    return response;
  },

  deleteOrder: async (id) => {
    const response = await http.delete(`orders/${id}`);
  },

  getOrdersByUser: async (id, page) => {
    const response = await http.get(`orders/get-by-user/${id}`, {
      params: { page: page },
    });
    return response;
  },
  vnpayOrder: async (orderCreateRequestDto) => {
    const response = await http.post("orders/VNPay", orderCreateRequestDto);
    return response;
  },
};

export default orderApi;
