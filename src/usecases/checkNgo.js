import ngoService from "../services/ngoService.js";

export default {
  async checkByCnpj(ngoData) {
    return await ngoService.checkNgoByCnpj(ngoData);
  },

  async checkByPhoneNumber(ngoData) {
    return await ngoService.checkNgoByPhoneNumber(ngoData);
  },
};
