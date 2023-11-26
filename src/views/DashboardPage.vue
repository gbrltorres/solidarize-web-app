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
          <li v-if="isUserManager" class="nav-item active">
            <a
              class="nav-link"
              :class="{ 'active-link': activeComponent === 'ngo-info' }"
              @click="changeActiveComponent('ngo-info')"
              >Dados da ONG
            </a>
          </li>
          <li v-if="isUserManager" class="nav-item">
            <a
              class="nav-link"
              :class="{ 'active-link': activeComponent === 'update-info' }"
              @click="changeActiveComponent('update-info')"
              >Editar Dados
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ 'active-link': activeComponent === 'search-ngo' }"
              @click="changeActiveComponent('search-ngo')"
              >Buscar ONG
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Sair </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div v-if="activeComponent === 'ngo-info'" class="mt-4">
    <NgoInfoPage :ngo-data="ngoData"></NgoInfoPage>
  </div>
  <div v-if="activeComponent === 'update-info'">
    <NgoUpdatePage :ngo-data="ngoData" @update-success="updateSuccess" />
  </div>
  <div v-if="activeComponent === 'search-ngo'">
    <SearchNgo></SearchNgo>
  </div>
</template>

<script>
import NgoUpdatePage from "../components/NgoUpdate.vue";
import logo from "../assets/transparent-logo.png";
import ngoController from "@/controllers/ngoController";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";
import { mapGetters } from "vuex";
import NgoInfoPage from "../components/NgoInfo.vue";
import SearchNgo from "@/components/SearchNgo.vue";

export default {
  components: {
    NgoUpdatePage,
    NgoInfoPage,
    SearchNgo,
  },

  data() {
    return {
      logoUrl: logo,
      activeComponent: "",
      user: null,
      ngoData: null,
      isUserManager: "",
    };
  },

  async mounted() {
    this.isUserManager = this.getUser.isManager;
    console.log("user situation", this.isUserManager);
    if (this.isUserManager) {
      this.activeComponent = "ngo-info";
    } else {
      this.activeComponent = "search-ngo";
    }
    await this.getNgoData();
  },

  computed: {
    ...mapGetters(["getUser"]),

    getInterestsString() {
      return this.ngoData.interests.join(", ");
    },
  },

  methods: {
    async getNgoData() {
      this.ngoData = null; // Responsável pelo loading do card de dados da ong
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
        this.showErrorAlert();
      }
    },

    async updateSuccess() {
      this.activeComponent = "ngo-info";
      await this.getNgoData();
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
        this.showErrorAlert();
      }
    },

    showErrorAlert() {
      this.$swal({
        title: "Ocorreu algum erro!",
        text: "Ocorreu um erro de serviço desconhecido. Tente novamente.",
        icon: "error",
        confirmButtonText: "Ok",
      });
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
