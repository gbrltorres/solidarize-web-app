<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <img :src="logoUrl" alt="Logo Solidarize no navegador" class="mb-2" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <a
              class="nav-link"
              :class="{ 'active-link': activeComponent === 'ngo-info' }"
              @click="changeActiveComponent('ngo-info')"
              >Dados da ONG
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ 'active-link': activeComponent === 'update-info' }"
              @click="changeActiveComponent('update-info')"
              >Editar Dados
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Sair </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div v-if="activeComponent === 'ngo-info'" class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-body text-start p-5 pt-4">
            <h5 class="card-title mb-4">Dados da ONG</h5>
            <div
              v-if="loading"
              class="d-flex justify-content-center align-items-center"
              style="height: 200px"
            >
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
              </div>
            </div>
            <div v-else>
              <p class="card-text">
                <strong>Nome:</strong> {{ ngoData ? ngoData.name : "" }}
              </p>
              <p class="card-text">
                <strong>CNPJ:</strong> {{ ngoData ? ngoData.code : "" }}
              </p>
              <p class="card-text">
                <strong>Telefone:</strong>
                {{ ngoData ? ngoData.phoneNumber : "" }}
              </p>
              <p class="card-text">
                <strong>Descrição:</strong>
                {{ ngoData ? ngoData.description : "" }}
              </p>
              <p class="card-text">
                <strong>Interesses:</strong>
                {{ ngoData ? getInterestsString : "" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="activeComponent === 'update-info'">
    <NgoUpdatePage :ngo-data="ngoData" @update-success="updateSuccess" />
  </div>
</template>

<script>
import NgoUpdatePage from "./NgoUpdatePage.vue";
import logo from "../assets/transparent-logo.png";
import ngoController from "@/controllers/ngoController";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { mapGetters } from "vuex";

export default {
  components: {
    NgoUpdatePage,
  },

  data() {
    return {
      logoUrl: logo,
      activeComponent: "ngo-info",
      user: null,
      ngoData: null,
      loading: true,
    };
  },

  async mounted() {
    this.getNgoData();
  },

  computed: {
    ...mapGetters(["getUser"]),

    getInterestsString() {
      return this.ngoData.interests.join(", ");
    },
  },

  methods: {
    async getNgoData() {
      try {
        const data = await userController.checkUser({
          email: this.getUser.email,
        });
        this.user = data.user;

        const response = await ngoController.checkNgoById({
          id: this.user.ngo,
        });
        this.ngoData = response.data.ngo;
      } catch (ex) {
        // TODO: tela de erro genérico
      } finally {
        this.loading = false;
      }
    },

    updateSuccess() {
      this.activeComponent = "ngo-info";
      this.loading = true;
      this.getNgoData();
    },

    changeActiveComponent(component) {
      this.activeComponent = component;
      this.collapseNavbar();
    },

    collapseNavbar() {
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    },

    async logout() {
      try {
        const logoutSucceeded = await authController.deauthenticateUser();
        if (logoutSucceeded) {
          this.$router.push("/");
        }
      } catch (ex) {
        this.$swal({
          title: "Ocorreu algum erro!",
          text: "Ocorreu um erro de serviço desconhecido. Tente novamente.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
}
.custom {
  background-image: none !important;
  background-color: #fff;
}
</style>

<style scoped>
.nav-link:hover {
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 5px;
}

img {
  height: 50px;
}

.active-link {
  font-weight: bolder;
  background-color: #d0d0d0;
  border-radius: 6px;
}
</style>
