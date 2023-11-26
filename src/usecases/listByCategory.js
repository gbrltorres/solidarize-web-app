import ngoService from "../services/ngoService.js";
import Cookies from "js-cookie";

export default {
  async list(requestData) {
    const token = Cookies.get("token");
    return await ngoService.listByCategory(requestData, token);
  },
};
