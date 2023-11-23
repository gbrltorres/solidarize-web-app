import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default {
  async registerUser(userData) {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    return response;
  },

  async checkUser(userData) {
    const response = await axios.get(`${API_BASE_URL}/user/check-user`, {
      params: userData,
    });
    return response;
  },

  async authenticateUser(userData) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response;
  },

  async deauthenticateUser() {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  },
};
