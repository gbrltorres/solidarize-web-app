import registerNgo from "../usecases/registerNgo.js";
import checkNgo from "../usecases/checkNgo.js";

export default {
  async registerNgo(ngoData) {
    try {
      const result = await registerNgo.register(ngoData);
      return result;
    } catch (error) {
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },

  async checkNgoByCnpj(ngoData) {
    let response;
    try {
      response = await checkNgo.checkByCnpj(ngoData);
      return response.status === 200;
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      }
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },

  async checkNgoByPhoneNumber(ngoData) {
    let response;
    try {
      response = await checkNgo.checkByPhoneNumber(ngoData);
      return response.status === 200;
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      }
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },
};
