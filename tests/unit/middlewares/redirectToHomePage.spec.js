import { redirectToHomePage } from "@/middlewares/redirectToHomePage";
import deauthenticateUser from "@/usecases/deauthenticateUser";

jest.mock("@/usecases/deauthenticateUser");

describe("Given the redirectToHomePage middleware", () => {
  let storeMock;
  let routerMock;

  beforeEach(() => {
    storeMock = {
      dispatch: jest.fn(),
    };

    routerMock = {
      push: jest.fn(),
    };

    deauthenticateUser.logout.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When redirectToHomePage is called", () => {
    beforeEach(async () => {
      await redirectToHomePage(storeMock, routerMock);
    });

    it("Then it should call deauthenticateUser.logout", () => {
      expect(deauthenticateUser.logout).toHaveBeenCalledTimes(1);
    });

    it("Then it should call store.dispatch with 'resetState'", () => {
      expect(storeMock.dispatch).toHaveBeenCalledWith("resetState");
    });

    it("Then it should call router.push with '/'", () => {
      expect(routerMock.push).toHaveBeenCalledWith("/");
    });
  });
});
