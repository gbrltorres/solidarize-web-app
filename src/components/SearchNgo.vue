<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="card p-4 mb-5">
      <div class="card-body text-start">
        <h5 class="card-title mb-3 label">O que você vai doar hoje?</h5>
        <Form ref="form" @submit="submitForm">
          <div class="mb-3 d-flex justify-content-center">
            <Field
              as="select"
              name="donationCategory"
              class="form-select"
              v-model="selectedCategory"
            >
              <option disabled value="">Selecione uma categoria</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </Field>
            <button type="submit" class="btn btn-primary">Buscar</button>
          </div>
        </Form>
        <div
          v-if="loading"
          class="d-flex justify-content-center align-items-center"
          style="height: 200px"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
        <div v-if="dataLoaded">
          <p class="mt-5 mb-2 label">Resultados:</p>
          <table class="table">
            <tbody>
              <tr
                v-for="row in paginatedData"
                :key="row.id"
                @click="rowClicked(row.id)"
              >
                <td class="table-line">
                  <div class="d-flex align-items-center">
                    <div
                      v-if="row.image"
                      class="profile-img"
                      :style="{ backgroundImage: 'url(' + row.image + ')' }"
                    ></div>
                    <div
                      v-else
                      class="profile-img"
                      :style="{
                        backgroundImage: 'url(' + defaultImage + ')',
                      }"
                    ></div>
                    <div>
                      {{ row.name }}
                      <div class="text-muted small">
                        Clique aqui para conhecer
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="changePage(currentPage - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="n in totalPages"
                :key="n"
                :class="{ active: n === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(n)">{{
                  n
                }}</a>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="changePage(currentPage + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <NgoProfileModal
    v-if="showModal"
    :details="selectedNgo"
    :showModal="showModal"
    @close="closeModal"
    @contact="handleContact"
  />
</template>

<script>
import { Field, Form } from "vee-validate";
import NgoProfileModal from "../components/NgoProfileModal.vue";
import ngoController from "../controllers/ngoController.js";
import defaultImageUrl from "../assets/no-photo.jpg";

export default {
  components: {
    Field,
    Form,
    NgoProfileModal,
  },

  data() {
    return {
      selectedCategory: "",
      categories: [
        "Alimentos",
        "Roupas",
        "Materiais de Higiene",
        "Materiais Hospitalares",
        "Eletrônicos",
        "Eletrodomésticos",
        "Materiais Escolares",
        "Livros",
        "Móveis",
        "Materiais Esportivos",
        "Outros",
      ],
      rows: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      loading: false,
      dataLoaded: false,
      showModal: false,
      selectedNgo: null,
      defaultImage: defaultImageUrl,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.rows.slice(start, end);
    },
  },

  methods: {
    async submitForm() {
      this.dataLoaded = false;
      this.loading = true;
      try {
        if (!this.selectedCategory) {
          this.showNotSelectedAlert();
          return;
        }

        const requestData = {
          interest: this.selectedCategory,
          page: this.currentPage,
          pageSize: this.itemsPerPage,
        };

        const response = await ngoController.listByCategory(requestData);

        this.totalItems = response.total;
        if (response.total === 0) {
          this.rows = [];
          this.dataLoaded = false;
          this.showEmptyArrayAlert();
          return;
        }

        this.rows = response.data;
        this.mapRowsId();
        this.dataLoaded = true;
      } catch (ex) {
        this.showErrorAlert();
      } finally {
        this.loading = false;
      }
    },

    handleContact(ngo) {
      // Lógica para entrar em contato com a ONG
      console.log("Entrar em contato com a ONG:", ngo.name);
    },

    mapRowsId() {
      this.rows = this.rows.map((row, index) => ({
        id: index,
        ...row,
      }));
    },

    rowClicked(id) {
      this.selectedNgo = this.rows.find((row) => row.id === id);
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      await this.submitForm(); // Recarrega os dados com a nova página
    },

    showErrorAlert() {
      this.$swal({
        title: "Ocorreu algum erro!",
        text: "Ocorreu um erro de serviço desconhecido. Tente novamente.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    },

    showEmptyArrayAlert() {
      this.$swal({
        text: "Infelizmente não encontramos nenhuma ONG com este interesse",
        icon: "info",
        confirmButtonText: "Ok",
      });
    },

    showNotSelectedAlert() {
      this.$swal({
        text: "Você precisa selecionar uma das categorias!",
        icon: "info",
        confirmButtonText: "Ok",
      });
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 500px;
  width: 100%;
  border: none;
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
  margin-left: 16px;
}

.btn-primary:hover {
  background-color: #78a9d1;
  border-color: #78a9d1;
}

.table tr {
  cursor: pointer;
}

.table tr td .text-muted {
  color: #6c757d;
}

.table-line {
  padding-left: 0;
}

.label {
  font-weight: bold;
}

.profile-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-right: 8px;
}

h5 {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.btn {
  background-color: #8c52ff;
  border-color: #8c52ff;
}

.btn:hover {
  background-color: #c3a0e3;
  border-color: #c3a0e3;
}
</style>
