import { shallowMount } from "@vue/test-utils";
import RegisterManagerPage from "@/views/RegisterManagerPage.vue";
import ngoController from "@/controllers/ngoController";
import userController from "@/controllers/userController";
import { createStore } from "vuex";
import { redirectToHomePage } from "@/middlewares/redirectToHomePage.js";

jest.mock("@/middlewares/redirectToHomePage.js", () => ({
  redirectToHomePage: jest.fn(),
}));

jest.mock("@/controllers/ngoController");
jest.mock("@/controllers/userController");

const mockStore = createStore({
  state: {},
  getters: {
    getUser: () => ({}),
  },
});

describe("Given RegisterManagerPage starts", () => {
  let wrapper;
  let swalMock;

  beforeEach(() => {
    redirectToHomePage.mockRestore();
    redirectToHomePage.mockImplementation(() => Promise.resolve());

    swalMock = jest.fn();

    wrapper = shallowMount(RegisterManagerPage, {
      global: {
        mocks: {
          $swal: swalMock,
          $router: {
            push: jest.fn(),
          },
        },
        plugins: [mockStore],
      },
      data() {
        return {
          ngoName: "ONG Teste",
          cnpj: "00.000.000/0000-00",
          phoneNumber: "(00) 00000-0000",
          description: "Descrição da ONG",
          interests: ["Alimentos", "Roupas"],
        };
      },
    });
  });

  describe("When the form is submitted", () => {
    beforeEach(async () => {
      wrapper.vm.isNgoDataValid = jest.fn().mockResolvedValue(true);
      ngoController.registerNgo = jest.fn().mockResolvedValue({});
      userController.registerUser = jest.fn().mockResolvedValue({});

      await wrapper.vm.submitForm();
    });

    it("Then calls registerNgo and registerUser", () => {
      expect(ngoController.registerNgo).toHaveBeenCalled();
      expect(userController.registerUser).toHaveBeenCalled();
    });

    it("Then navigates to the success page", () => {
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/sucesso");
    });
  });

  describe("When the back button is clicked", () => {
    beforeEach(async () => {
      await wrapper.vm.redirectBack();
    });

    it("Then redirects back to the home page", () => {
      expect(redirectToHomePage).toHaveBeenCalled();
    });
  });
});
