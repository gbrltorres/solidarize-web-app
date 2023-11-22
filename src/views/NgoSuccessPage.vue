<template>
  <div class="container d-flex pt-5 justify-content-center">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <div class="row">
          <div class="col-12">
            <h2 class="card-title mb-5">Sucesso!</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p>
              Você está pronto para solidarizar! Volte à tela de login e acesse
              sua conta para fazer a gestão de sua ONG.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button
              @click="redirectToHomePage"
              class="mt-4 btn btn-primary button-color custom-button"
            >
              Voltar
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="separator-line mt-5"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <img
              class="mt-4"
              :src="logoUrl"
              alt="Logo Solidarize apenas com a letra S"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo.png";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      logoUrl: logo,
    };
  },

  methods: {
    ...mapActions(["resetState"]),

    redirectToHomePage() {
      this.$store.dispatch("resetState");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
}

@media (min-width: 768px) {
  .card {
    max-width: 400px;
    width: 100%;
  }

  .card-body {
    padding: 2rem;
  }

  .custom-button {
    width: 50%;
  }
}

p {
  color: rgb(85, 85, 85);
  font-size: 18px;
}

.card-title {
  font-weight: bold;
  color: #8c52ff;
}

.button-color {
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.button-color:hover {
  background-color: #c3a0e3;
  border-color: #c3a0e3;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
