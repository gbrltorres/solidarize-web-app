import userService from "../services/userService.js";

export default {
  async register(userData) {
    return await userService.registerUser(userData);
  },
};
