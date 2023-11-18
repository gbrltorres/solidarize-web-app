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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo.png";

export default {
  data() {
    return {
      email: "",
      logoUrl: logo,
    };
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
</style>
