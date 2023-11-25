import updateNgo from "@/usecases/updateNgo.js";
import ngoService from "@/services/ngoService.js";
import Cookies from "js-cookie";

jest.mock("@/services/ngoService.js");
jest.mock("js-cookie");

describe("Given the updateNgo module", () => {
  const mockNgoData = { id: "1", name: "ONG Updated" };
  const mockToken = "token123";
  const mockResponse = { data: { ngo: { id: "1", name: "ONG Updated" } } };

  beforeEach(() => {
    Cookies.get.mockReturnValue(mockToken);
    ngoService.updateNgo.mockResolvedValue(mockResponse);
  });

  describe("When update is called with NGO data", () => {
    let result;

    beforeEach(async () => {
      result = await updateNgo.update(mockNgoData);
    });

    it("Then retrieves the token from cookies", () => {
      expect(Cookies.get).toHaveBeenCalledWith("token");
    });

    it("Then calls ngoService.updateNgo with the correct data and token", () => {
      expect(ngoService.updateNgo).toHaveBeenCalledWith(mockNgoData, mockToken);
    });

    it("Then returns the response from the service", () => {
      expect(result).toEqual(mockResponse);
    });
  });
});
