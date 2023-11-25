import axios from "axios";
import userService from "@/services/userService.js";

jest.mock("axios");

describe("Given the userService", () => {
  const API_BASE_URL = "http://localhost:3000";
  const mockUserData = { username: "user", password: "password" };
  const mockResponse = { data: { success: true } };

  describe("When registerUser is called", () => {
    beforeEach(() => {
      axios.post.mockResolvedValue(mockResponse);
    });

    it("Then makes a POST request to the correct URL with userData", async () => {
      const response = await userService.registerUser(mockUserData);
      expect(axios.post).toHaveBeenCalledWith(
        `${API_BASE_URL}/user/register`,
        mockUserData
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("When checkUser is called", () => {
    beforeEach(() => {
      axios.get.mockResolvedValue(mockResponse);
    });

    it("Then makes a GET request to the correct URL with userData", async () => {
      const response = await userService.checkUser(mockUserData);
      expect(axios.get).toHaveBeenCalledWith(
        `${API_BASE_URL}/user/check-user`,
        { params: mockUserData }
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("When authenticateUser is called", () => {
    beforeEach(() => {
      axios.post.mockResolvedValue(mockResponse);
    });

    it("Then makes a POST request to the correct URL with userData", async () => {
      const response = await userService.authenticateUser(mockUserData);
      expect(axios.post).toHaveBeenCalledWith(
        `${API_BASE_URL}/auth/login`,
        mockUserData
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("When deauthenticateUser is called", () => {
    beforeEach(() => {
      axios.post.mockResolvedValue();
    });

    it("Then makes a POST request to the logout URL", async () => {
      await userService.deauthenticateUser();
      expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/auth/logout`);
    });
  });
});
