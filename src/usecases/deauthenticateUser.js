import userService from "../services/userService.js";
import Cookies from "js-cookie";

export default {
  async logout() {
    await userService.deauthenticateUser();
    Cookies.remove("token");
  },
};
