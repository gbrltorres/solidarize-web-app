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

describe("HomePage.vue", () => {
  let wrapper;
  let swalMock;

  beforeEach(() => {
    swalMock = jest.fn();

    wrapper = shallowMount(HomePage, {
      global: {
        mocks: {
          $swal: swalMock,
          $router: {
            push: jest.fn(),
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

  it("Navigates to registration page on successful submission", async () => {
    userController.checkUser.mockResolvedValue(null);
    await wrapper.vm.submitForm();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/cadastro");
  });

  it("Shows error alert on submission failure", async () => {
    userController.checkUser.mockRejectedValue(new Error("Test Error"));
    await wrapper.vm.submitForm();

    expect(swalMock).toHaveBeenCalled();
  });
});
