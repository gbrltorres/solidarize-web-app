import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import HomePage from "@/views/HomePage.vue";
import userController from "@/controllers/userController.js";

jest.mock("@/controllers/userController.js");

const store = createStore({
  state: {},
  actions: {
    setEmail: jest.fn(),
  },
});

describe("Given HomePage starts", () => {
  let wrapper;
  let swalMock;
  let routerPushMock;

  beforeEach(() => {
    swalMock = jest.fn();
    routerPushMock = jest.fn();

    wrapper = shallowMount(HomePage, {
      global: {
        mocks: {
          $swal: swalMock,
          $router: {
            push: routerPushMock,
          },
        },
        plugins: [store],
      },
      data() {
        return {
          email: "test@example.com",
        };
      },
    });
  });

  describe("When form is submitted with a new user email", () => {
    beforeEach(async () => {
      userController.checkUser.mockResolvedValue(null);
      await wrapper.vm.submitForm();
    });

    it("Then navigates to the registration page", () => {
      expect(routerPushMock).toHaveBeenCalledWith("/cadastro");
    });
  });

  describe("When form submission fails", () => {
    beforeEach(async () => {
      userController.checkUser.mockRejectedValue(new Error("Test Error"));
      await wrapper.vm.submitForm();
    });

    it("Then shows an error alert", () => {
      expect(swalMock).toHaveBeenCalled();
    });
  });
});
