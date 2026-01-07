import api from "../api/axios.js";
import { getErrorMessage } from "../util/error.js";

const authService = {

  async login(credentials) {
    try {
      var response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Login failed"));
    }
  },

  async register(userData) {
    try {
      var response = await api.post("/auth/register", userData);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Register failed"));
    }
  },

  async logout() {
    try {
      var response = await api.post("/auth/logout");
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Logout failed"));
    }
  }

};

export default authService;
