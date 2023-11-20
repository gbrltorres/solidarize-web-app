import { shallowMount } from "@vue/test-utils";
import { Form, Field } from "vee-validate";
import RegisterUserPage from "../../../src/views/RegisterUserPage.vue";

describe("Given RegisterUserPage starts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterUserPage, {
      global: {
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
    beforeEach(() => {
      wrapper.vm.fullName = "Test User";
      wrapper.vm.password = "password123";
      wrapper.vm.confirmPassword = "password123";
      wrapper.vm.role = "gestor";
      wrapper.vm.submitForm();
    });

    it("Then it should submit form with correct data", () => {
      // Aqui você pode adicionar verificações específicas relacionadas à submissão do formulário
      // Por exemplo, você pode verificar se um método esperado foi chamado ou se a navegação ocorreu
    });
  });

  describe("Given the role is selected", () => {
    it("Then it should reflect the correct default role", () => {
      const radioButton = wrapper.find('input[type="radio"][value="gestor"]');
      expect(radioButton.element.checked).toBeTruthy();
    });

    it("Then it should allow changing the role", async () => {
      const radioButton = wrapper.find(
        'input[type="radio"][value="nao-gestor"]'
      );
      await radioButton.setChecked();
      expect(wrapper.vm.role).toBe("nao-gestor");
    });
  });
});
