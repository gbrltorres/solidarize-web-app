import deauthenticateUser from "@/usecases/deauthenticateUser";
import userService from "@/services/userService.js";
import Cookies from "js-cookie";

jest.mock("@/services/userService.js");
jest.mock("js-cookie");

describe("Given the deauthenticateUser module", () => {
  describe("When logout is called", () => {
    beforeEach(() => {
      userService.deauthenticateUser.mockResolvedValue();
      Cookies.remove.mockClear();
      deauthenticateUser.logout();
    });

    it("Then calls userService.deauthenticateUser", () => {
      expect(userService.deauthenticateUser).toHaveBeenCalled();
    });

    it("Then removes the cookie named 'token'", () => {
      expect(Cookies.remove).toHaveBeenCalledWith("token");
    });
  });
});
