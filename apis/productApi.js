import axios from "axios";
import http from "../configs/http";

const productApi = {
  getAllProducts: async () => {
    const response = await http.get("products");
    return response;
  },

  getProductById: async (id) => {
    const response = await http.get(`products/${id}`);
    return response;
  },

  createProduct: async (productCreateRequestDto) => {
    const response = await http.post("products", productCreateRequestDto);
    return response;
  },

  updateProduct: async (id, productUpdateDto) => {
    const response = await http.put(`products/${id}`, productUpdateDto);
    return response;
  },

  deleteProduct: async (id) => {
    const response = await http.delete(`products/${id}`);
  },
};

export default productApi;
