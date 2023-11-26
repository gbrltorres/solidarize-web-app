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
                    v-if="row.imageUrl"
                    class="profile-img"
                    :style="{ backgroundImage: 'url(' + row.imageUrl + ')' }"
                  ></div>
                  <div v-else class="profile-placeholder"></div>
                  <div>
                    {{ row.content }}
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
</template>

<script>
import { Field, Form } from "vee-validate";
import logo from "../assets/secondary-logo.png";

export default {
  components: {
    Field,
    Form,
  },

  data() {
    return {
      selectedCategory: "",
      categories: [
        "Alimentos",
        "Roupas",
        "Brinquedos",
        "Livros",
        "Equipamentos",
        "Outros",
      ],
      rows: [
        { id: 1, content: "Sebastião Salgados", imageUrl: logo },
        { id: 2, content: "Pika Sonica", imageUrl: "" },
        { id: 3, content: "Anjos angelicais", imageUrl: "" },
        { id: 4, content: "Vasco da Gama", imageUrl: "" },
        { id: 5, content: "3 Espiãs demais", imageUrl: "" },
        { id: 6, content: "Macacos escravos", imageUrl: "" },
      ],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.rows.length / this.itemsPerPage);
    },
    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.rows.slice(start, end);
    },
  },

  methods: {
    submitForm() {
      // Lógica para enviar a categoria selecionada
    },

    rowClicked(id) {
      console.log(`Linha ${id} clicada.`);
    },

    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
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

.profile-placeholder {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #adb5bd;
  margin-right: 8px;
}

.profile-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-right: 8px;
}
</style>
