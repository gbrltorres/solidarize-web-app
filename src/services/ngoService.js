import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default {
  async registerNgo(ngoData) {
    const response = await axios.post(`${API_BASE_URL}/ngo/register`, ngoData);
    return response;
  },

  async checkNgoByCnpj(ngoData) {
    const response = await axios.get(`${API_BASE_URL}/ngo/check-ngo-cnpj`, {
      params: ngoData,
    });
    return response;
  },

  async checkNgoByPhoneNumber(ngoData) {
    const response = await axios.get(`${API_BASE_URL}/ngo/check-ngo-phone`, {
      params: ngoData,
    });
    return response;
  },
};
