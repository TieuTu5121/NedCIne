import { removeData } from "../configs/authentication";
import http from "../configs/http";

const authApi = {
  login: async (email, password) =>
    http.post("auth/login", {
      email,
      password,
    }),
  register: async (email, username, password) =>
    http.post("auth/register", {
      email,
      username,
      password,
    }),

  profile: async () => http.post("auth/profile", {}),
  logout: async () => {
    removeData();
  },
  profile: async () => http.post("auth/profile", {}),
};

export default authApi;
