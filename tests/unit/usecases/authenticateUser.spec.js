import authenticateUser from "@/usecases/authenticateUser.js";
import userService from "@/services/userService.js";
import Cookies from "js-cookie";

jest.mock("@/services/userService.js");
jest.mock("js-cookie");

describe("Given the authenticateUser module", () => {
  const mockUserData = { username: "user", password: "password" };
  const mockResponse = {
    status: 200,
    data: { token: "token123", message: "Login successful" },
  };
  const mockErrorResponse = {
    response: {
      status: 401,
      data: { message: "Login failed" },
    },
  };

  describe("When login is called with valid credentials", () => {
    beforeEach(() => {
      userService.authenticateUser.mockResolvedValue(mockResponse);
    });

    it("Then sets a cookie with the token", async () => {
      await authenticateUser.login(mockUserData);
      expect(Cookies.set).toHaveBeenCalledWith(
        "token",
        mockResponse.data.token,
        { expires: 7, secure: true, sameSite: "strict" }
      );
    });

    it("Then returns an object indicating the user is logged in", async () => {
      const result = await authenticateUser.login(mockUserData);
      expect(result).toEqual({ isLogged: true, message: "Login successful" });
    });
  });

  describe("When login is called with invalid credentials", () => {
    beforeEach(() => {
      userService.authenticateUser.mockRejectedValue(mockErrorResponse);
      Cookies.set.mockClear();
    });

    it("Then does not set any cookie", async () => {
      try {
        await authenticateUser.login(mockUserData);
      } catch (e) {
        expect(Cookies.set).not.toHaveBeenCalled();
      }
    });

    it("Then returns an object indicating the user is not logged in", async () => {
      try {
        const result = await authenticateUser.login(mockUserData);
        expect(result).toEqual({ isLogged: false, message: "Login failed" });
      } catch (error) {
        expect(error).toEqual(mockErrorResponse);
      }
    });
  });
});
