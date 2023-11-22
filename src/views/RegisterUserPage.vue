<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h2 class="card-title mb-5">Cadastro de usuário</h2>
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
                  name="fullName"
                  type="text"
                  class="form-control"
                  placeholder="Digite seu nome completo"
                  :class="{ 'is-invalid': errors.fullName }"
                  v-model="fullName"
                />
                <div class="invalid-feedback">{{ errors.fullName }}</div>
              </div>
              <div class="mb-3">
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Digite sua senha"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback">{{ errors.password }}</div>
              </div>
              <div class="mb-3">
                <Field
                  name="confirmPassword"
                  type="password"
                  class="form-control"
                  v-model="confirmPassword"
                  placeholder="Digite sua senha novamente"
                  :class="{ 'is-invalid': errors.confirmPassword }"
                />
                <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
              </div>
              <div class="d-grid gap-2">
                <label class="text-start user-type-label">
                  <input
                    type="radio"
                    name="role"
                    value="nao-gestor"
                    v-model="role"
                    checked
                  />
                  Quero apenas fazer doações
                </label>
                <label class="text-start user-type-label">
                  <input
                    type="radio"
                    name="role"
                    value="gestor"
                    v-model="role"
                  />
                  Quero cadastrar uma ONG
                </label>
                <button
                  type="submit"
                  class="col-6 mt-4 btn btn-primary button-color"
                  :disabled="loading"
                >
                  <div v-if="loading" class="spinner"></div>
                  <span v-else>Cadastrar</span>
                </button>
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
import { Field, Form } from "vee-validate";
import * as Yup from "yup";
import { mapActions, mapGetters } from "vuex";
import { redirectToHomePage } from "../middlewares/redirectToHomePage.js";

export default {
  components: {
    Field,
    Form,
  },

  data() {
    const schema = Yup.object().shape({
      fullName: Yup.string().required("O campo nome é obrigatório."),
      password: Yup.string().required("O campo senha é obrigatório."),
      confirmPassword: Yup.string()
        .required("O campo senha é obrigatório.")
        .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais."),
    });

    return {
      schema,
      fullName: "",
      role: "",
      password: "",
      confirmPassword: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getEmail"]),
  },

  methods: {
    ...mapActions(["setUser"]),

    async submitForm() {
      this.loading = true;
      try {
        const isManager = this.role === "gestor" ? true : false;
        const userInfo = {
          name: this.fullName,
          email: this.getEmail,
          password: this.password,
          isManager,
        };

        if (!isManager) {
          this.$router.push("/sucesso");
        } else {
          this.setUser(userInfo);
          this.$router.push("/cadastro-gestor");
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

    redirectBack() {
      redirectToHomePage(this.$store, this.$router);
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

.user-type-label {
  font-size: 14px;
  color: rgb(85, 85, 85);
}
</style>
