import http from "../configs/http";

const userApi = {
  getAllUsers: async () => {
    const response = await http.get("users");
    return response;
  },

  updateUserById: async (id, userUpdateDto) => {
    const response = await http.put(`users/${id}`, userUpdateDto);
    return response;
  },
  updateRoleById: async (id, role) => {
    const response = await http.put(`users/update-role/${id}`, role);
    return response;
  },
  // Add other user-related API methods here
};

export default userApi;
