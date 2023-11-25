<template>
  <div class="mb-3">
    <div class="input-group">
      <input
        :type="fieldType"
        class="form-control"
        :placeholder="placeholder"
        v-model="localValue"
        @input="$emit('update:value', localValue)"
      />
      <button
        v-if="showToggle"
        class="btn"
        type="button"
        @click.prevent="toggleVisibility"
      >
        <i :class="icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: String,
    showToggle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
      localValue: this.value, // Adiciona uma propriedade local para sincronizar com o valor externo
    };
  },
  watch: {
    value(newValue) {
      this.localValue = newValue; // Atualiza o valor local quando a propriedade value muda
    },
  },
  computed: {
    fieldType() {
      return this.isVisible ? "text" : "password";
    },
    icon() {
      return this.isVisible ? "bi bi-eye" : "bi bi-eye-slash";
    },
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style scoped>
.btn {
  border-color: #ced4da;
  color: #8c52ff;
}

.btn:hover {
  border-color: #a6cef7;
}
</style>
