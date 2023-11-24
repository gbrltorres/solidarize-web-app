<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h2 class="card-title mb-5">Entre no Solidarize</h2>
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
                  name="email"
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                  v-model="email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>
              <div class="mb-4">
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
              <div class="card-footer text-start">
                <div class="footer-content">
                  <img
                    :src="tipsUrl"
                    alt="Imagem Dicas Rodapé"
                    class="footer-image"
                  />
                  <p class="footer-text">
                    Este Login é destinado a gestores de ONG. Se você é um
                    doador, faça o login no aplicativo móvel Solidarize.
                  </p>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="mt-4 btn btn-primary button-color">
                  Entrar
                </button>
                <a
                  href="./assets/html/login-user.html"
                  class="btn btn-link text-start forgot-password-button"
                  >Esqueceu sua senha?</a
                >
              </div>
              <div class="separator-line mt-4"></div>
              <div class="mt-4">
                Não possui uma conta?
                <a href="#" @click="goToRegisterPage" class="btn btn-link"
                  >Cadastre aqui</a
                >
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
import tips from "../assets/tips-icon.jpg";
import userController from "@/controllers/userController";
import { mapActions } from "vuex";

export default {
  components: {
    Field,
    Form,
  },
  data() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("O campo e-mail é obrigatório.")
        .email("Por favor, insira um endereço de e-mail válido."),
      password: Yup.string().required("O campo senha é obrigatório."),
    });

    return {
      schema,
      email: "",
      password: "",
      tipsUrl: tips,
      loading: false,
    };
  },

  methods: {
    ...mapActions(["setUser"]),

    async submitForm() {
      this.loading = true;
      try {
        const checkUserResponse = await userController.checkUser({
          email: this.email,
        });
        if (!checkUserResponse) {
          this.$refs.form.setErrors({
            email: "Este e-mail não foi cadastrado.",
          });
          return;
        }

        if (!checkUserResponse.user.isManager) {
          this.$swal({
            text: "Se você é um doador, faça o login no aplicativo móvel Solidarize.",
            icon: "error",
            confirmButtonText: "Ok",
          });
          return;
        }

        const response = await userController.userAuthentication({
          email: this.email,
          password: this.password,
        });
        if (response.isLogged) {
          await this.setUser(checkUserResponse.user);
          this.$router.push("/dashboard");
          return;
        }

        this.$swal({
          text: response.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
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

    goToRegisterPage() {
      this.$router.push("/cadastro");
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

.card-footer {
  padding: 0;
  border-top: none;
  background-color: transparent;
}

.footer-content {
  display: flex;
  align-items: start;
  gap: 10px;
}

.footer-image {
  width: 30px;
  height: auto;
}

.footer-text {
  flex-grow: 1;
  font-size: 0.8rem;
  color: #6c757d;
  margin: 0;
}

.button-color {
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.button-color:hover {
  background-color: #c3a0e3;
  border-color: #c3a0e3;
}

.forgot-password-button {
  padding-left: 0;
}

a {
  color: #8c52ff;
  padding-left: 0;
}

a:hover,
a:active {
  color: hsl(271, 55%, 76%);
}
</style>
