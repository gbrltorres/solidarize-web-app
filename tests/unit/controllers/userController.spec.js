import userController from "@/controllers/userController";
import registerUser from "@/usecases/registerUser";
import checkUser from "@/usecases/checkUser";
import authenticateUser from "@/usecases/authenticateUser";

jest.mock("@/usecases/registerUser");
jest.mock("@/usecases/checkUser");
jest.mock("@/usecases/authenticateUser");

describe("Given the userController module", () => {
  describe("When registerUser is called with userData", () => {
    let result;

    beforeEach(async () => {
      registerUser.register.mockResolvedValue({ id: 1 });

      result = await userController.registerUser({});
    });

    it("Then it should call registerUser.register with userData", () => {
      expect(registerUser.register).toHaveBeenCalledWith({});
    });

    it("Then it should return the result of registerUser.register", () => {
      expect(result).toEqual({ id: 1 });
    });
  });

  describe("When checkUser is called with userData", () => {
    let result;

    beforeEach(async () => {
      checkUser.check.mockResolvedValue({ data: { id: 1 } });

      result = await userController.checkUser({});
    });

    it("Then it should call checkUser.check with userData", () => {
      expect(checkUser.check).toHaveBeenCalledWith({});
    });

    it("Then it should return the data from checkUser.check", () => {
      expect(result).toEqual({ id: 1 });
    });
  });

  describe("When userAuthentication is called with userData", () => {
    let result;

    beforeEach(async () => {
      authenticateUser.login.mockResolvedValue({ message: "Login successful" });

      result = await userController.userAuthentication({});
    });

    it("Then it should call authenticateUser.login with userData", () => {
      expect(authenticateUser.login).toHaveBeenCalledWith({});
    });

    it("Then it should return the result of authenticateUser.login", () => {
      expect(result).toEqual({ message: "Login successful" });
    });
  });

  describe("When userAuthentication encounters an error with status other than 500", () => {
    let result;

    beforeEach(async () => {
      authenticateUser.login.mockRejectedValue({
        response: { status: 401, data: { message: "Unauthorized" } },
      });

      result = await userController.userAuthentication({});
    });

    it("Then it should call authenticateUser.login with userData", () => {
      expect(authenticateUser.login).toHaveBeenCalledWith({});
    });

    it("Then it should return an object with an error message", () => {
      expect(result).toEqual({ message: "Unauthorized" });
    });
  });

  describe("When userAuthentication encounters an error with status 500", () => {
    let result;

    beforeEach(async () => {
      authenticateUser.login.mockRejectedValue({ response: { status: 500 } });

      result = await userController.userAuthentication({});
    });

    it("Then it should call authenticateUser.login with userData", () => {
      expect(authenticateUser.login).toHaveBeenCalledWith({});
    });

    it("Then it should return a new Error with a generic message", () => {
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Erro de serviço desconhecido");
    });
  });
});
