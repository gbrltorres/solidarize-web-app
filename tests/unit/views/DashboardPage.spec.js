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

describe("DashboardPage.vue", () => {
  let wrapper;
  let swalMock;

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
    wrapper = shallowMount(DashboardPage, {
      computed: {
        getInterestsString: () => "",
        getUser: () => ({ email: "test@example.com" }),
      },
      global: {
        mocks: {
          $swal: swalMock,
          $router: {
            push: jest.fn(),
          },
        },
        plugins: [store],
      },
    });
  });

  it("Shows error alert when call fails", () => {
    wrapper.vm.showErrorAlert();
    expect(swalMock).toHaveBeenCalled();
  });

  it("Loads NGO data on mount", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.ngoData).not.toBeNull();
    expect(wrapper.vm.loading).toBeFalsy();
  });

  it("Changes active component correctly", () => {
    wrapper.vm.changeActiveComponent("update-info");
    expect(wrapper.vm.activeComponent).toBe("update-info");
  });

  it("Logs out successfully", async () => {
    authController.deauthenticateUser.mockResolvedValue(true);

    await wrapper.vm.logout();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/");
  });

  it("Updates NGO data successfully", async () => {
    wrapper.vm.updateSuccess();
    await wrapper.vm.logout();

    expect(wrapper.vm.activeComponent).toBe("ngo-info");
    expect(wrapper.vm.loading).toBeTruthy();
  });
});
