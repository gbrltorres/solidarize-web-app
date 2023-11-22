import userService from "../services/userService.js";
import Cookies from "js-cookie";

export default {
  async login(userData) {
    const response = await userService.authenticateUser(userData);
    Cookies.set("token", response.data.token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    const isLogged = response.status === 200;
    return { isLogged: isLogged, message: response.data.message };
  },
};
