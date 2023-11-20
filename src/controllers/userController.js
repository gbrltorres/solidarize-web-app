import registerUser from "../usecases/registerUser.js";
import checkUser from "@/usecases/checkUser.js";

export default {
  async registerUser(userData) {
    try {
      const result = await registerUser.register(userData);
      return result;
    } catch (error) {
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },

  async checkUser(userData) {
    let response;
    try {
      response = await checkUser.check(userData);
      return response.status === 200;
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      }
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },
};
