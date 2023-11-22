import registerUser from "../usecases/registerUser.js";
import checkUser from "../usecases/checkUser.js";
import authenticateUser from "../usecases/authenticateUser.js";

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
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        return null;
      }
      throw new Error(error.message || "Erro de serviço desconhecido");
    }
  },

  async userAuthentication(userData) {
    try {
      const result = await authenticateUser.login(userData);
      return result;
    } catch (error) {
      if (error.response.status !== 500) {
        return { message: error.response.data.message };
      }

      return new Error(error.message || "Erro de serviço desconhecido");
    }
  },
};
