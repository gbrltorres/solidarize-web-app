import { shallowMount } from "@vue/test-utils";
import NgoSuccessPage from "@/views/NgoSuccessPage.vue";
import { redirectToHomePage } from "@/middlewares/redirectToHomePage.js";
import { createStore } from "vuex";

jest.mock("@/middlewares/redirectToHomePage.js");

const mockStore = createStore({ state: {} });
const mockRouter = {
  push: jest.fn(),
};

describe("Given NgoSuccessPage starts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NgoSuccessPage, {
      global: {
        mocks: {
          $store: mockStore,
          $router: mockRouter,
        },
      },
    });
  });

  describe("When the back button is clicked", () => {
    beforeEach(async () => {
      await wrapper.vm.redirectBack();
    });

    it("Then redirects back to the home page", () => {
      expect(redirectToHomePage).toHaveBeenCalledWith(mockStore, mockRouter);
    });
  });
});
