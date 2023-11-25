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

describe("LoginPage.vue", () => {
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

  it("Navigates to dashboard on successful login", async () => {
    userController.checkUser.mockResolvedValue({ user: { isManager: true } });
    userController.userAuthentication.mockResolvedValue({ isLogged: true });

    await wrapper.vm.submitForm();

    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  it("Shows error message on failed login", async () => {
    userController.checkUser.mockResolvedValue({ user: { isManager: true } });
    userController.userAuthentication.mockResolvedValue({
      isLogged: false,
      message: "Login failed",
    });

    await wrapper.vm.submitForm();

    expect(mockSwal).toHaveBeenCalled();
  });

  it("Navigates to register page when link clicked", () => {
    wrapper.vm.goToRegisterPage();
    expect(mockRouterPush).toHaveBeenCalledWith("/cadastro");
  });
});
