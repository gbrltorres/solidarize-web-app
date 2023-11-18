<template>
  <div class="container d-flex justify-content-center align-items-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body">
        <h2 class="card-title text-start mb-5">Cadastro de usuário</h2>
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
            <label class="text-start user-type-label">
              <input type="radio" name="role" value="gestor" />
              Quero apenas fazer doações
            </label>
            <label class="text-start user-type-label">
              <input type="radio" name="role" value="nao-gestor" checked />
              Quero cadastrar uma ONG
            </label>
            <button type="submit" class="mt-4 btn btn-primary button-color">
              Cadastrar
            </button>
            <div class="text-start">
              <a href="./assets/html/login-user.html" class="btn btn-link"
                >Voltar para o início</a
              >
            </div>
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
  max-width: 400px;
  width: 100%;
}

.button-color {
  background-color: rgb(175, 127, 219);
  border-color: rgb(175, 127, 219);
}

.button-color:hover {
  background-color: hsl(271, 55%, 76%);
  border-color: hsl(271, 55%, 76%);
}

a {
  color: blueviolet;
  padding-left: 0 !important;
}

a:hover,
a:active {
  color: hsl(271, 55%, 76%);
}

.user-type-label {
  font-size: 14px;
  color: rgb(85, 85, 85);
}
</style>
