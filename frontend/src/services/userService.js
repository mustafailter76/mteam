import api from "../api/axios.js";
import { getErrorMessage } from "../util/error.js";

const userService = {

  async getUserProfile(userId) {
    try {
      var response = await api.get("/users/me/" + userId);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Profile information could not be retrieved."));
    }
  },

  async depositBalance(userId, amount) {
    try {
      var response = await api.post("/users/deposit", { userId, amount });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Deposit failed."));
    }
  },

  async withdrawBalance(userId, amount) {
    try {
      var response = await api.post("/users/withdraw", { userId, amount });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Withdrawal failed."));
    }
  },

  async deleteUserAccount(userId) {
    try {
      var response = await api.delete("/users/delete/" + userId);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Account deletion attempt failed."));
    }
  }
  
};

export default userService;
