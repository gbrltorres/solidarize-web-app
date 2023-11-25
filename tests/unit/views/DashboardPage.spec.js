import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import DashboardPage from "@/views/DashboardPage.vue";
import ngoController from "@/controllers/ngoController";
import userController from "@/controllers/userController.js";
import authController from "@/controllers/authController.js";

jest.mock("@/controllers/ngoController");
jest.mock("@/controllers/userController.js");
jest.mock("@/controllers/authController.js");

const store = createStore({
  state: {},
  getters: {
    getUser: () => ({}),
  },
});

describe("Given DashboardPage starts", () => {
  let wrapper;
  let swalMock;
  let routerPushMock;

  beforeEach(() => {
    document.getElementById = jest.fn().mockReturnValue({
      classList: {
        contains: jest.fn().mockReturnValue(true),
        remove: jest.fn(),
      },
    });

    userController.checkUser.mockResolvedValue({ user: { ngo: "123" } });
    ngoController.checkNgoById.mockResolvedValue({
      data: { ngo: { interests: ["Education", "Environment"] } },
    });

    swalMock = jest.fn();
    routerPushMock = jest.fn();

    wrapper = shallowMount(DashboardPage, {
      computed: {
        getInterestsString: () => "",
        getUser: () => ({ email: "test@example.com" }),
      },
      global: {
        mocks: {
          $swal: swalMock,
          $router: {
            push: routerPushMock,
          },
        },
        plugins: [store],
      },
    });
  });

  describe("When showErrorAlert is called", () => {
    beforeEach(() => {
      wrapper.vm.showErrorAlert();
    });

    it("Then triggers swalMock", () => {
      expect(swalMock).toHaveBeenCalled();
    });
  });

  describe("When component is mounted", () => {
    beforeEach(async () => {
      await wrapper.vm.$nextTick();
    });

    it("Then loads NGO data", () => {
      expect(wrapper.vm.ngoData).not.toBeNull();
    });
  });

  describe("When changing active component", () => {
    beforeEach(() => {
      wrapper.vm.changeActiveComponent("update-info");
    });

    it("Then sets active component to 'update-info'", () => {
      expect(wrapper.vm.activeComponent).toBe("update-info");
    });
  });

  describe("When logging out", () => {
    beforeEach(async () => {
      authController.deauthenticateUser.mockResolvedValue(true);
      await wrapper.vm.logout();
    });

    it("Then redirects to the home page", () => {
      expect(routerPushMock).toHaveBeenCalledWith("/");
    });
  });

  describe("When updating NGO data", () => {
    beforeEach(async () => {
      wrapper.vm.getNgoData = jest.fn();
      wrapper.vm.updateSuccess();
    });

    it("Then sets active component to 'ngo-info'", () => {
      expect(wrapper.vm.activeComponent).toBe("ngo-info");
    });

    it("Then method getNgoData is ccalled", () => {
      expect(wrapper.vm.getNgoData).toHaveBeenCalled();
    });
  });
});
