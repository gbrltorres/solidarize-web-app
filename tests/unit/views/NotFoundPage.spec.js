import { shallowMount } from "@vue/test-utils";
import NotFoundPage from "@/views/NotFoundPage.vue";
import { redirectToHomePage } from "@/middlewares/redirectToHomePage.js";
import { createStore } from "vuex";

jest.mock("@/middlewares/redirectToHomePage.js");

const mockStore = createStore({ state: {} });
const mockRouter = {
  push: jest.fn(),
};

describe("Given NotFoundPage starts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NotFoundPage, {
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
