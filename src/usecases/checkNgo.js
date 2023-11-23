import ngoService from "../services/ngoService.js";

export default {
  async checkByCnpj(ngoData) {
    return await ngoService.checkNgoByCnpj(ngoData);
  },

  async checkById(ngoData) {
    return await ngoService.checkNgoById(ngoData);
  },

  async checkByPhoneNumber(ngoData) {
    return await ngoService.checkNgoByPhoneNumber(ngoData);
  },
};
