<template>
  <div class="container d-flex justify-content-center align-items-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body">
        <h2 class="card-title text-start mb-5">Faça seu cadastro</h2>
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
          <div class="d-grid gap-2">
            <button type="submit" class="mt-3 btn btn-primary button-color">
              Avançar
            </button>
            <div class="text-start">
              Já possui uma conta?
              <a href="./assets/html/login-user.html" class="btn btn-link"
                >Entre aqui</a
              >
            </div>
            <img class="mt-3" :src="logoUrl" alt="Solidarize logo" />
          </div>
        </form>
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
