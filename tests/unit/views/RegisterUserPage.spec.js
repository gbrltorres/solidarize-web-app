import { shallowMount } from "@vue/test-utils";
import RegisterUserPage from "@/views/RegisterUserPage.vue";
import userController from "@/controllers/userController.js";
import { createStore } from "vuex";

jest.mock("@/controllers/userController.js");

const mockRouterPush = jest.fn();
const mockSwal = jest.fn();
const mockDispatch = jest.fn();

const store = createStore({
  state: {},
  getters: {
    getEmail: () => "test@example.com",
  },
  actions: {
    setUser: mockDispatch,
  },
});

const mocks = {
  $router: {
    push: mockRouterPush,
  },
  $swal: mockSwal,
};

describe("Given RegisterUserPage starts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterUserPage, {
      global: {
        mocks,
        plugins: [store],
      },
    });
  });

  describe("When the form is submitted for a non-manager user", () => {
    beforeEach(async () => {
      wrapper.setData({
        role: "nao-gestor",
        fullName: "User Test",
        password: "123456",
        confirmPassword: "123456",
      });
      userController.registerUser = jest.fn().mockResolvedValue({});
      await wrapper.vm.submitForm();
    });

    it("Then calls registerUser and navigates to success page", () => {
      expect(userController.registerUser).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith("/sucesso");
    });
  });

  describe("When the form is submitted for a manager user", () => {
    beforeEach(async () => {
      wrapper.setData({
        role: "gestor",
        fullName: "Manager Test",
        password: "123456",
        confirmPassword: "123456",
      });
      await wrapper.vm.submitForm();
    });

    it("Then dispatches setUser and navigates to manager registration page", () => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.anything(), {
        email: "test@example.com",
        isManager: true,
        name: "Manager Test",
        password: "123456",
      });
      expect(mockRouterPush).toHaveBeenCalledWith("/cadastro-gestor");
    });
  });
});
