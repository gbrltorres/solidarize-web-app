import { shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { Form, Field } from "vee-validate";
import HomePage from "../../../src/views/HomePage.vue";

describe("Given HomePage starts", () => {
  let wrapper;
  let actions;
  let store;
  let routerPushMock;

  beforeEach(() => {
    actions = {
      setEmail: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });

    routerPushMock = jest.fn();

    wrapper = shallowMount(HomePage, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: routerPushMock,
          },
        },
        stubs: {
          Form,
          Field,
        },
      },
    });
  });

  describe("Given the component is rendered", () => {
    it("Then it should be rendered correctly", () => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  describe("Given the form is submitted", () => {
    beforeEach(async () => {
      wrapper.vm.email = "teste@teste.com";
      await wrapper.vm.submitForm();
    });

    it("Then it should call setEmail action with the correct email", () => {
      expect(actions.setEmail).toHaveBeenCalledWith(
        expect.anything(),
        wrapper.vm.email
      );
    });

    it('Then it should navigate to "/cadastro"', () => {
      expect(routerPushMock).toHaveBeenCalledWith("/cadastro");
    });
  });

  describe("Given the login link is clicked", () => {
    beforeEach(async () => {
      await wrapper.vm.linkClick();
    });

    it('Then it should navigate to "/login"', () => {
      expect(routerPushMock).toHaveBeenCalledWith("/login");
    });
  });
});
