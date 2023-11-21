<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h4 class="card-title mb-5">Cadastro de usuário gestor</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Form
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
                  type="cnpj"
                  class="form-control"
                  v-model="cnpj"
                  placeholder="Digite o CNPJ"
                  :class="{ 'is-invalid': errors.cnpj }"
                />
                <div class="invalid-feedback">{{ errors.cnpj }}</div>
              </div>
              <div class="mb-3">
                <Field
                  as="textarea"
                  name="description"
                  class="form-control"
                  placeholder="Fale um pouco de sua ONG aqui"
                  v-model="description"
                  rows="4"
                />
                <ErrorMessage name="description" class="text-danger" />
              </div>
              <div class="d-grid gap-2">
                <label>Interesses:</label>
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
                <button
                  type="submit"
                  class="mt-4 btn btn-primary button-color"
                  :disabled="loading"
                >
                  <div v-if="loading" class="spinner"></div>
                  <span v-else>Cadastrar</span>
                </button>
                <div class="text-start">
                  <a href="./assets/html/login-user.html" class="btn btn-link"
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
import userController from "../controllers/userController.js";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  data() {
    const schema = Yup.object().shape({
      ngoName: Yup.string().required("O campo nome da ONG é obrigatório."),
      cnpj: Yup.string().required("O campo CNPJ é obrigatório."),
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
    ...mapGetters(["getEmail"]),
  },

  methods: {
    checkInterests() {
      this.interestsError =
        this.interests.length > 0 ? null : "Selecione pelo menos um interesse.";
    },

    async submitForm() {
      this.loading = true;

      this.checkInterests();
      if (this.interestsError) {
        this.loading = false;
        return;
      }

      try {
        const isManager = this.role === "gestor" ? true : false;
        const reqBody = {
          name: this.fullName,
          email: this.getEmail,
          password: this.password,
          isManager,
        };

        await userController.registerUser(reqBody);
        if (!isManager) {
          this.$router.push("/sucesso");
        } else {
          this.$router.push("/sucesso");
        }
      } catch (error) {
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
  },
};
</script>

<style scoped>
.card {
  max-width: 400px;
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

.user-type-label {
  font-size: 14px;
  color: rgb(85, 85, 85);
}

.checkbox-margin {
  margin-right: 10px;
}
</style>
