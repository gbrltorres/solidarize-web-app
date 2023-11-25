import authController from "@/controllers/authController";
import deauthenticateUser from "@/usecases/deauthenticateUser";

jest.mock("@/usecases/deauthenticateUser");

describe("Given the authController module", () => {
  describe("When deauthenticateUser is called", () => {
    let result;

    beforeEach(async () => {
      deauthenticateUser.logout.mockResolvedValue(true);

      result = await authController.deauthenticateUser();
    });

    it("Then it should call deauthenticateUser.logout", () => {
      expect(deauthenticateUser.logout).toHaveBeenCalledTimes(1);
    });

    it("Then it should return true on successful deauthentication", () => {
      expect(result).toBe(true);
    });
  });

  describe("When deauthenticateUser encounters an error", () => {
    let result;

    beforeEach(async () => {
      deauthenticateUser.logout.mockRejectedValue(new Error("Logout failed"));

      result = await authController.deauthenticateUser();
    });

    it("Then it should call deauthenticateUser.logout", () => {
      expect(deauthenticateUser.logout).toHaveBeenCalled();
    });

    it("Then it should return false on error", () => {
      expect(result).toBe(false);
    });
  });
});
