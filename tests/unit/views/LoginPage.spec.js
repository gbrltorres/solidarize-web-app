import { shallowMount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";
import userController from "@/controllers/userController";
import { createStore } from "vuex";

jest.mock("@/controllers/userController");

const mockRouterPush = jest.fn();
const mockSwal = jest.fn();

const store = createStore({
  state: {},
  actions: {
    setUser: jest.fn(),
  },
});

const mocks = {
  $router: {
    push: mockRouterPush,
  },
  $swal: mockSwal,
};

describe("Given LoginPage starts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginPage, {
      global: {
        mocks,
        plugins: [store],
      },
      data() {
        return {
          email: "test@example.com",
          password: "password123",
        };
      },
    });
  });

  describe("When login is successful", () => {
    beforeEach(async () => {
      userController.checkUser.mockResolvedValue({ user: { isManager: true } });
      userController.userAuthentication.mockResolvedValue({ isLogged: true });
      await wrapper.vm.submitForm();
    });

    it("Then navigates to the dashboard", () => {
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  describe("When login fails", () => {
    beforeEach(async () => {
      userController.checkUser.mockResolvedValue({ user: { isManager: true } });
      userController.userAuthentication.mockResolvedValue({
        isLogged: false,
        message: "Login failed",
      });
      await wrapper.vm.submitForm();
    });

    it("Then shows an error message", () => {
      expect(mockSwal).toHaveBeenCalled();
    });
  });

  describe("When 'register' link is clicked", () => {
    beforeEach(() => {
      wrapper.vm.goToRegisterPage();
    });

    it("Then navigates to the register page", () => {
      expect(mockRouterPush).toHaveBeenCalledWith("/cadastro");
    });
  });
});
