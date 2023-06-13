<template>
  <button
   :disabled="disabled"
   type="button"
   
   data-bs-toggle="tooltip"
   data-bs-placement="bottom"
   title="Добавить поле"
   class="create-form__add-field btn btn-success mx-auto d-block">
    <img src="@/assets/icons/add-icon.svg" alt="" aria-hidden="true">
   </button>
</template>

<script>
export default {
  name: 'ButtonMore',

  props: {
    disabled: Boolean,
    showTooltip: Boolean,
  },

  watch: {
    showTooltip() {
      this.tooltip.toggle();
    }
  },

  mounted() {
    this.tooltip = new bootstrap.Tooltip(this.$el);
  },
}
</script>

<style scoped>

</style>