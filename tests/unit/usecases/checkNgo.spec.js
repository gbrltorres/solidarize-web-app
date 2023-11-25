import checkNgo from "@/usecases/checkNgo.js";
import ngoService from "@/services/ngoService.js";

jest.mock("@/services/ngoService.js");

describe("Given the checkNgo module", () => {
  const mockNgoData = { cnpj: "12345", id: "1", phoneNumber: "1234567890" };
  const mockResponse = { data: { ngo: { name: "NGO Test", id: "1" } } };

  describe("When checkByCnpj is called", () => {
    beforeEach(() => {
      ngoService.checkNgoByCnpj.mockResolvedValue(mockResponse);
    });

    it("Then calls ngoService.checkNgoByCnpj with the correct data", async () => {
      const result = await checkNgo.checkByCnpj(mockNgoData);
      expect(ngoService.checkNgoByCnpj).toHaveBeenCalledWith(mockNgoData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("When checkById is called", () => {
    beforeEach(() => {
      ngoService.checkNgoById.mockResolvedValue(mockResponse);
    });

    it("Then calls ngoService.checkNgoById with the correct data", async () => {
      const result = await checkNgo.checkById(mockNgoData);
      expect(ngoService.checkNgoById).toHaveBeenCalledWith(mockNgoData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("When checkByPhoneNumber is called", () => {
    beforeEach(() => {
      ngoService.checkNgoByPhoneNumber.mockResolvedValue(mockResponse);
    });

    it("Then calls ngoService.checkNgoByPhoneNumber with the correct data", async () => {
      const result = await checkNgo.checkByPhoneNumber(mockNgoData);
      expect(ngoService.checkNgoByPhoneNumber).toHaveBeenCalledWith(
        mockNgoData
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
