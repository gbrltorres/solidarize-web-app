<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="p-5 custom-modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Perfil</h3>
        <button class="close" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body text-start">
        <div class="mb-4 d-flex align-items-center">
          <div
            v-if="details.imageUrl"
            class="profile-img"
            :style="{ backgroundImage: 'url(' + details.imageUrl + ')' }"
          ></div>
          <div v-else class="profile-placeholder"></div>
          <h4 class="ong-name">{{ details.name }}</h4>
        </div>
        <h5>Quem somos:</h5>
        <p class="mb-3 ong-description">{{ details.description }}</p>
        <div class="ong-interests">
          <h5>Doações que temos interesse:</h5>
          <ul class="interests-list">
            <li
              class="mb-2"
              v-for="interest in details.interests"
              :key="interest"
            >
              {{ interest }}
            </li>
          </ul>
        </div>
        <button class="btn contact-btn" @click="contactNgo">
          Entrar em contato
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    contactNgo() {
      this.$emit("contact", this.details);
    },
  },
};
</script>

<style scoped>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.custom-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  z-index: 1051;
  display: block !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.close {
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  background: none;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.ong-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0;
}

h5 {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.ong-description {
  margin-bottom: 1rem;
}

.ong-interests {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.interests-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.interests-list li {
  display: inline-block;
  background-color: #e9ecef;
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  border-radius: 16px;
  font-size: 0.875rem;
}

.contact-btn {
  display: block;
  width: 100%;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
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
