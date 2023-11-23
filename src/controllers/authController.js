import deauthenticateUser from "../usecases/deauthenticateUser.js";

export default {
  async deauthenticateUser() {
    try {
      await deauthenticateUser.logout();
      return true;
    } catch (error) {
      return false;
    }
  },
};
