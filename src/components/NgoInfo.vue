<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-body text-start p-5 pt-4">
            <h5 class="card-title mb-4">Dados da ONG</h5>
            <div
              v-if="!ngoData"
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
</template>

<script>
export default {
  props: {
    ngoData: {
      type: [Object, null],
      default: () => null,
    },
  },

  data() {
    return {
      ngoName: "",
      cnpj: "",
      phoneNumber: "",
      description: "",
      interests: [],
    };
  },
  computed: {
    getInterestsString() {
      return this.ngoData.interests.join(", ");
    },
  },
};
</script>

<style scoped></style>
