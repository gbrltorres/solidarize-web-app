import checkUser from "@/usecases/checkUser.js";
import userService from "@/services/userService.js";

jest.mock("@/services/userService.js");

describe("Given the checkUser module", () => {
  const mockUserData = { username: "user" };
  const mockResponse = { data: { user: { id: "1", name: "User Test" } } };

  describe("When check is called with user data", () => {
    beforeEach(() => {
      userService.checkUser.mockResolvedValue(mockResponse);
    });

    it("Then calls userService.checkUser with the correct data", async () => {
      const result = await checkUser.check(mockUserData);
      expect(userService.checkUser).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockResponse);
    });
  });
});
