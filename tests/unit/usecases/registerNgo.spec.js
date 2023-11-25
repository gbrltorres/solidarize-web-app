import registerNgo from "@/usecases/registerNgo.js";
import ngoService from "@/services/ngoService.js";

jest.mock("@/services/ngoService.js");

describe("Given the registerNgo module", () => {
  const mockNgoData = { name: "ONG Test", cnpj: "00.000.000/0000-00" };
  const mockResponse = { data: { ngo: { id: "1", name: "ONG Test" } } };

  describe("When register is called with NGO data", () => {
    beforeEach(() => {
      ngoService.registerNgo.mockResolvedValue(mockResponse);
    });

    it("Then calls ngoService.registerNgo with the correct data", async () => {
      const result = await registerNgo.register(mockNgoData);
      expect(ngoService.registerNgo).toHaveBeenCalledWith(mockNgoData);
      expect(result).toEqual(mockResponse);
    });
  });
});
