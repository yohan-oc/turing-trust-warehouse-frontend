<script>
export default {
  props: {
    isDisabled: Boolean,
    modelValue: String, // v-model binding
    modes: Array
  },
  emits: ["update:modelValue", "mode-changed"],
  computed: {
    selectedMode: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value); // Update parent state
        this.$emit("mode-changed", value); // Notify parent of change
      }
    }
  },
  methods: {
    focusDropdown() {
      this.$nextTick(() => {
        if (this.$refs.modeInput) {
          this.$refs.modeInput.focus();
        }
      });
    }
  }
};
</script>

<template>
    <label class="fw-bold ms-3">Mode:</label>
    <select class="form-select d-inline w-auto" :disabled="isDisabled" v-model="selectedMode" ref="modeInput">
      <option disabled>Select a mode</option>
      <option v-for="mode in modes" :key="mode">{{ mode }}</option>
    </select>
</template>

<style scoped>

</style>