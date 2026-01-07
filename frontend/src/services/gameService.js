import api from "../api/axios.js";
import { getErrorMessage } from "../util/error.js";

const gameService = {

  async getAllGames() {
    try {
      var response = await api.get("/games");
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "An error occurred while loading the games."));
    }
  },

  async getGameById(id) {
    try {
      var response = await api.get("/games/" + id);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Game details could not be provided."));
    }
  },

  async purchaseGame(userId, gameId) {
    try {
      var response = await api.post("/purchases", { userId, gameId });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Purchase failed."));
    }
  },

  async purchaseBulkGames(userId, gameIds) {
    try {
      var response = await api.post("/purchases/bulk", { userId, gameIds });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Bulk purchase failed."));
    }
  }
  
};

export default gameService;
