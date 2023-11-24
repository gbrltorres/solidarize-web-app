<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h5 class="card-title mb-5">
              Quase lá! Agora você só precisa preencher os dados da ONG
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Form
              ref="form"
              @submit="submitForm"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <div class="mb-3">
                <Field
                  name="ngoName"
                  type="text"
                  class="form-control"
                  placeholder="Digite o nome da ONG"
                  :class="{ 'is-invalid': errors.ngoName }"
                  v-model="ngoName"
                />
                <div class="invalid-feedback">{{ errors.ngoName }}</div>
              </div>
              <div class="mb-3">
                <Field
                  name="cnpj"
                  type="tel"
                  class="form-control"
                  v-model="cnpj"
                  placeholder="Digite o CNPJ"
                  :class="{ 'is-invalid': errors.cnpj }"
                  v-mask="'##.###.###/####-##'"
                />
                <div class="invalid-feedback">{{ errors.cnpj }}</div>
              </div>
              <div class="mb-3">
                <Field
                  name="phoneNumber"
                  type="tel"
                  class="form-control"
                  v-model="phoneNumber"
                  placeholder="Digite o telefone da ONG"
                  :class="{ 'is-invalid': errors.phoneNumber }"
                  v-mask="'(##) #####-####'"
                />
                <div class="invalid-feedback">{{ errors.phoneNumber }}</div>
              </div>
              <div class="mb-3">
                <Field
                  as="textarea"
                  name="description"
                  class="form-control mb-2"
                  :class="{ 'is-invalid': errors.description }"
                  placeholder="Fale um pouco de sua ONG aqui"
                  v-model="description"
                  rows="4"
                />
                <ErrorMessage name="description" class="text-danger" />
              </div>
              <div class="mb-3">
                <label class="mb-2">Interesses:</label>
                <div
                  v-for="option in interestsOptions"
                  :key="option"
                  class="mb-1"
                >
                  <Field
                    class="checkbox-margin"
                    type="checkbox"
                    name="interests"
                    :value="option"
                    v-model="interests"
                  />
                  <label :for="`interest-${option}`">{{ option }}</label>
                </div>
                <ErrorMessage name="interests" class="text-danger" />
                <div>
                  <button
                    type="submit"
                    class="col-6 mt-4 btn btn-primary button-color"
                    :disabled="loading"
                  >
                    <div v-if="loading" class="spinner"></div>
                    <span v-else>Cadastrar</span>
                  </button>
                </div>
                <div class="mt-2 text-start">
                  <a href="#" @click.prevent="redirectBack" class="btn btn-link"
                    >Voltar para o início</a
                  >
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import ngoController from "@/controllers/ngoController";
import userController from "../controllers/userController.js";
import { redirectToHomePage } from "../middlewares/redirectToHomePage.js";

const phoneRegex = /^[1-9]{1}[1-9]{1}9[1-9][0-9]{7}$/;

export default {
  directives: {
    mask,
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  data() {
    Yup.addMethod(Yup.string, "cnpjValido", function (message) {
      return this.test("test-cnpj", message, function (value) {
        const { path, createError } = this;

        return (
          cnpjValidator.isValid(value) ||
          createError({ path, message: message || "Forneça um CNPJ válido." })
        );
      });
    });

    const schema = Yup.object().shape({
      ngoName: Yup.string().required("O campo nome da ONG é obrigatório."),
      cnpj: Yup.string()
        .required("O campo CNPJ é obrigatório.")
        .cnpjValido("Forneça um CNPJ válido."),
      phoneNumber: Yup.string().required("O campo telefone é obrigatório."),
      description: Yup.string().required(
        "O campo de descrição da ONG é obrigatório."
      ),
      interests: Yup.array()
        .min(1, "Selecione pelo menos um interesse.")
        .of(Yup.string())
        .required("Selecione pelo menos um interesse."),
    });

    return {
      schema,
      ngoName: "",
      cnpj: "",
      phoneNumber: "",
      description: "",
      loading: false,
      interests: [],
      interestsOptions: [
        "Alimentos",
        "Roupas",
        "Materiais de Higiene",
        "Materiais Hospitalares",
        "Eletrônicos",
        "Eletrodomésticos",
        "Materiais Escolares",
        "Livros",
        "Móveis",
        "Materiais Esportivos",
        "Outros",
      ],
      interestsError: null,
    };
  },

  computed: {
    ...mapGetters(["getUser"]),

    getRawCnpj() {
      return this.cnpj.replace(/[.\-/]/g, "");
    },

    getRawPhone() {
      return this.phoneNumber.replace(/[^\d]/g, "");
    },
  },

  methods: {
    checkInterests() {
      this.interestsError =
        this.interests.length > 0 ? null : "Selecione pelo menos um interesse.";
    },

    async submitForm() {
      this.loading = true;
      try {
        const isValid = await this.isNgoDataValid();
        if (!isValid) {
          return;
        }

        const ngoInfo = {
          name: this.ngoName,
          code: this.getRawCnpj,
          phoneNumber: this.getRawPhone,
          description: this.description,
          interests: this.interests,
          email: this.getUser.email,
        };

        const user = { ...this.getUser };
        await userController.registerUser(user);
        await ngoController.registerNgo(ngoInfo);

        this.$router.push("/sucesso-ong");
      } catch (ex) {
        this.$swal({
          title: "Ocorreu algum erro!",
          text: "Ocorreu um erro de serviço desconhecido. Tente novamente.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        this.loading = false;
      }
    },

    async isNgoDataValid() {
      let isValid = true;

      this.checkInterests();
      if (this.interestsError) {
        this.loading = false;
        isValid = false;
      }

      if (!phoneRegex.test(this.getRawPhone)) {
        isValid = false;
      }

      const cnpjExists = await ngoController.checkNgoByCnpj({
        cnpj: this.getRawCnpj,
      });
      if (cnpjExists) {
        this.$refs.form.setErrors({
          cnpj: "O CNPJ fornecido já está cadastrado.",
        });

        isValid = false;
      }

      const phoneExists = await ngoController.checkNgoByPhoneNumber({
        phoneNumber: this.getRawPhone,
      });
      if (phoneExists) {
        this.$refs.form.setErrors({
          phoneNumber: "O telefone fornecido já está cadastrado.",
        });

        isValid = false;
      }

      return isValid;
    },

    async redirectBack() {
      await redirectToHomePage(this.$store, this.$router);
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  width: 100%;
  border: none;
}

.button-color {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.button-color:hover {
  background-color: #c3a0e3;
  border-color: #c3a0e3;
}

a {
  color: #8c52ff;
  padding-left: 0 !important;
}

a:hover,
a:active {
  color: #c3a0e3;
}
.checkbox-margin {
  margin-right: 10px;
}

.text-danger {
  font-size: 0.875em;
}
</style>
