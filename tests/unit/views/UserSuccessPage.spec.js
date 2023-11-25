import { shallowMount } from "@vue/test-utils";
import UserSuccessPage from "@/views/UserSuccessPage.vue";
import { redirectToHomePage } from "@/middlewares/redirectToHomePage.js";
import { createStore } from "vuex";

jest.mock("@/middlewares/redirectToHomePage.js");

const mockStore = createStore({ state: {} });
const mockRouter = {
  push: jest.fn(),
};

describe("UserSuccessPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserSuccessPage, {
      global: {
        mocks: {
          $store: mockStore,
          $router: mockRouter,
        },
      },
    });
  });

  it("Redirects back to home page on button click", async () => {
    await wrapper.vm.redirectBack();

    expect(redirectToHomePage).toHaveBeenCalledWith(mockStore, mockRouter);
  });
});
