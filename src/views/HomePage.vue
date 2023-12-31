<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h2 class="card-title mb-5">Faça seu cadastro</h2>
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
                  placeholder="Digite o seu e-mail"
                  :class="{ 'is-invalid': errors.email }"
                  v-model="email"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>
              <div class="d-grid gap-2 mb-3">
                <button
                  type="submit"
                  class="mt-4 btn btn-primary button-color"
                  :disabled="loading"
                >
                  <div v-if="loading" class="spinner"></div>
                  <span v-else>Cadastrar</span>
                </button>
              </div>
              <div class="text-start mb-3">
                Já possui uma conta?
                <a href="#" @click.prevent="linkClick" class="btn btn-link"
                  >Entre aqui</a
                >
              </div>
              <div class="mt-3">
                <img :src="logoUrl" alt="Logo Solidarize" />
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
import { mapActions } from "vuex";
import * as Yup from "yup";
import logo from "../assets/logo.png";
import userController from "../controllers/userController.js";

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
    });

    return {
      schema,
      email: "",
      logoUrl: logo,
      loading: false,
    };
  },

  methods: {
    ...mapActions(["setEmail"]),

    async submitForm() {
      this.loading = true;
      try {
        const user = await userController.checkUser({
          email: this.email,
        });
        if (user) {
          this.$refs.form.setErrors({
            email: "Este e-mail já está cadastrado.",
          });
        } else {
          await this.setEmail(this.email);
          this.$router.push("/cadastro");
        }
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

    linkClick() {
      this.$router.push("/login");
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
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.button-color:hover {
  background-color: #c3a0e3;
  border-color: #c3a0e3;
}

a {
  color: #8c52ff;
  padding-left: 0;
}

a:hover,
a:active {
  color: #c3a0e3;
}

img {
  max-width: 100%;
  height: auto;
}

.form-control {
  margin-bottom: 10px;
}
</style>
