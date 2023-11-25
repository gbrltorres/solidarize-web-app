import { shallowMount } from "@vue/test-utils";
import NgoUpdatePage from "@/components/NgoUpdate.vue";
import ngoController from "@/controllers/ngoController";

jest.mock("@/controllers/ngoController");

describe("Given NgoUpdatePage starts", () => {
  let wrapper;

  beforeEach(() => {
    ngoController.updateNgo = jest.fn();
    ngoController.checkNgoByCnpj = jest.fn();
    ngoController.checkNgoByPhoneNumber = jest.fn();

    wrapper = shallowMount(NgoUpdatePage, {
      propsData: {
        ngoData: {
          name: "ONG Teste",
          code: "00.000.000/0000-00",
          phoneNumber: "(00) 00000-0000",
          description: "Descrição da ONG",
          interests: ["Alimentos", "Roupas"],
        },
      },
      global: {
        mocks: {
          $swal: jest.fn(),
        },
      },
    });
  });

  describe("When the form is submitted", () => {
    beforeEach(async () => {
      ngoController.updateNgo.mockResolvedValue({});
      await wrapper.vm.submitForm();
    });

    it("Then calls updateNgo with the correct parameters", () => {
      expect(ngoController.updateNgo).toHaveBeenCalledWith({
        name: "ONG Teste",
        code: "00000000000000",
        phoneNumber: "00000000000",
        description: "Descrição da ONG",
        interests: ["Alimentos", "Roupas"],
      });
    });
  });
});
