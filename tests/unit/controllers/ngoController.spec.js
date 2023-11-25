import ngoController from "@/controllers/ngoController";
import registerNgo from "@/usecases/registerNgo";
import updateNgo from "@/usecases/updateNgo";
import checkNgo from "@/usecases/checkNgo";

jest.mock("@/usecases/registerNgo");
jest.mock("@/usecases/updateNgo");
jest.mock("@/usecases/checkNgo");

describe("Given the ngoController module", () => {
  describe("When registerNgo is called with ngoData", () => {
    let result;

    beforeEach(async () => {
      registerNgo.register.mockResolvedValue({ id: 1 });

      result = await ngoController.registerNgo({});
    });

    it("Then it should call registerNgo.register with ngoData", () => {
      expect(registerNgo.register).toHaveBeenCalledWith({});
    });

    it("Then it should return the result of registerNgo.register", () => {
      expect(result).toEqual({ id: 1 });
    });
  });

  describe("When checkNgoByCnpj is called with ngoData", () => {
    let result;

    beforeEach(async () => {
      checkNgo.checkByCnpj.mockResolvedValue({ status: 200 });

      result = await ngoController.checkNgoByCnpj({});
    });

    it("Then it should call checkNgo.checkByCnpj with ngoData", () => {
      expect(checkNgo.checkByCnpj).toHaveBeenCalledWith({});
    });

    it("Then it should return true if the response status is 200", () => {
      expect(result).toBe(true);
    });
  });

  describe("When checkNgoByCnpj encounters a 404 error", () => {
    let result;

    beforeEach(async () => {
      checkNgo.checkByCnpj.mockRejectedValue({ response: { status: 404 } });

      result = await ngoController.checkNgoByCnpj({});
    });

    it("Then it should call checkNgo.checkByCnpj with ngoData", () => {
      expect(checkNgo.checkByCnpj).toHaveBeenCalledWith({});
    });

    it("Then it should return false on a 404 error", () => {
      expect(result).toBe(false);
    });
  });

  describe("When updateNgo is called with ngoData", () => {
    let result;

    beforeEach(async () => {
      updateNgo.update.mockResolvedValue({ success: true });

      result = await ngoController.updateNgo({});
    });

    it("Then it should call updateNgo.update with ngoData", () => {
      expect(updateNgo.update).toHaveBeenCalledWith({});
    });

    it("Then it should return the result of updateNgo.update", () => {
      expect(result).toEqual({ success: true });
    });
  });
});
