import axios from "axios";
import ngoService from "@/services/ngoService.js";

jest.mock("axios");

describe("Given the ngoService", () => {
  const mockNgoData = { name: "ONG Test", cnpj: "00.000.000/0000-00" };
  const mockToken = "token123";
  const mockResponse = { data: { success: true } };

  describe("When registerNgo is called", () => {
    beforeEach(() => {
      axios.post.mockResolvedValue(mockResponse);
    });

    it("Then makes a POST request to the correct URL with ngoData", async () => {
      const response = await ngoService.registerNgo(mockNgoData);
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/ngo/register",
        mockNgoData
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe("When updateNgo is called", () => {
    beforeEach(() => {
      axios.put.mockResolvedValue(mockResponse);
    });

    it("Then makes a PUT request to the correct URL with ngoData and token", async () => {
      const response = await ngoService.updateNgo(mockNgoData, mockToken);
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3000/protected/update",
        mockNgoData,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
