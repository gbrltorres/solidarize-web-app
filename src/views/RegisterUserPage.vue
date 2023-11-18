<template>
  <div class="container d-flex justify-content-center align-items-center mt-5">
    <div class="card p-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-5">Cadastro de usuário</h2>
        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Nome Completo"
              v-model="fullName"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="E-mail"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <PasswordInput
              v-model="password"
              placeholder="Senha"
              :showToggle="true"
            />
            <PasswordInput
              v-model="confirmPassword"
              placeholder="Confirme sua senha"
              :showToggle="true"
            />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="mt-4 btn btn-primary">
              Cadastrar
            </button>
            <a href="./assets/html/login-user.html" class="btn btn-link"
              >Já possui uma conta? Entre aqui</a
            >
          </div>
        </form>
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  width: 100%;
}
</style>
