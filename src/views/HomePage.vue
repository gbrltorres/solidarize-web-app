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
            <Form ref="form" @submit.prevent="submitForm">
              <div class="mb-3">
                <Field
                  name="e-mail"
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                  v-model="email"
                  rules="required|email"
                />
                <ErrorMessage name="e-mail" class="text-danger" />
              </div>
              <div class="d-grid gap-2 mb-3">
                <button type="submit" class="btn btn-primary button-color">
                  Avançar
                </button>
              </div>
              <div class="text-start mb-3">
                Já possui uma conta?
                <a href="./assets/html/login-user.html" class="btn btn-link"
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
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import { mapGetters, mapActions } from "vuex";
import logo from "../assets/logo.png";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  data() {
    return {
      email: "",
      logoUrl: logo,
    };
  },

  computed: {
    ...mapGetters(["getEmail"]),
  },

  created() {
    defineRule("required", required);
    defineRule("email", email);

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `O campo ${context.field} é obrigatório.`,
          email: `Por favor, insira um endereço de e-mail válido.`,
        };

        return (
          messages[context.rule.name] || `O campo ${context.field} é inválido.`
        );
      },
    });
  },

  methods: {
    ...mapActions(["setEmail"]),

    async submitForm() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        return;
      }

      this.setEmail(this.email);
      const foo = this.getEmail;
      console.log("foo", foo);
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
