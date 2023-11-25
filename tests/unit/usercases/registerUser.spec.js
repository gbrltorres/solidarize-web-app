import registerUser from "@/usecases/registerUser.js";
import userService from "@/services/userService.js";

jest.mock("@/services/userService.js");

describe("Given the registerUser module", () => {
  const mockUserData = {
    name: "User Test",
    email: "test@example.com",
    password: "password123",
  };
  const mockResponse = { data: { user: { id: "1", name: "User Test" } } };

  describe("When register is called with user data", () => {
    beforeEach(() => {
      userService.registerUser.mockResolvedValue(mockResponse);
    });

    it("Then calls userService.registerUser with the correct data", async () => {
      const result = await registerUser.register(mockUserData);
      expect(userService.registerUser).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockResponse);
    });
  });
});
