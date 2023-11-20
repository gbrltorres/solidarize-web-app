import userService from "../services/userService.js";

export default {
  async check(userData) {
    return await userService.checkUser(userData);
  },
};
