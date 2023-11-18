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
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Digite seu e-mail"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <PasswordInput
                  v-model="password"
                  placeholder="Digite sua senha"
                  :showToggle="true"
                />
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
                <a href="./assets/html/login-user.html" class="btn btn-link"
                  >Cadastre aqui</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "@/components/PasswordInput.vue";

export default {
  components: {
    PasswordInput,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.card {
  max-width: 400px;
  width: 100%;
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
