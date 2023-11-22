import ngoService from "../services/ngoService.js";
import Cookies from "js-cookie";

export default {
  async update(ngoData) {
    const token = Cookies.get("token");
    return await ngoService.updateNgo(ngoData, token);
  },
};
