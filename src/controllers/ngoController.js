import registerNgo from "../usecases/registerNgo.js";
import updateNgo from "../usecases/updateNgo.js";
import checkNgo from "../usecases/checkNgo.js";
import listByCategory from "../usecases/listByCategory.js";

export default {
  async registerNgo(ngoData) {
    try {
      const result = await registerNgo.register(ngoData);
      return result;
    } catch (error) {
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },

  async listByCategory(requestData) {
    let response;
    try {
      response = await listByCategory.list(requestData);
      return response.data.ngos;
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

  async checkNgoById(ngoData) {
    let response;
    try {
      response = await checkNgo.checkById(ngoData);
      return response;
    } catch (error) {
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

  async updateNgo(ngoData) {
    try {
      const result = await updateNgo.update(ngoData);
      return result;
    } catch (error) {
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },
};
