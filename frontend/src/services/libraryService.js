import api from "../api/axios.js";
import { getErrorMessage } from "../util/error.js";

const libraryService = {

  async getLibrary(userId) {
    try {
      var response = await api.get("/library/" + userId);
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "An error occurred while loading library information."));
    }
  }

};

export default libraryService;
