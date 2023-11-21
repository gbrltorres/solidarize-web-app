import ngoService from "../services/ngoService.js";

export default {
  async register(ngoData) {
    return await ngoService.registerNgo(ngoData);
  },
};
