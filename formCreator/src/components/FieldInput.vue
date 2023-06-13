<template>
  <template v-if="field.type === 'text'">
    <input 
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      class="create-form-field__input form-control" type="text"
      :class="fieldName === 'title' ? 'form-control-lg' : ''"
    >
  </template>

  <template v-else-if="field.type === 'number'">
    <input 
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      class="create-form-field__input form-control" type="number"
    >
  </template>

  <template v-else-if="field.type === 'group'">
    <h5 class="text-decoration-underline">{{ field.group.groupName }}</h5>

    <div class="row">
      <div v-for="option in field.group.options" class="col-3">
        <label class="option-radio-value d-flex col-form-label">
          <input class="form-check-input" type="radio" v-model="field.value" name="field.group.groupName" :value="option.optionTitle">
          <div class="mx-2">{{ option.optionTitle }}</div>
        </label>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'FieldInput',

  props: {
    modelValue: String,
    placeholder: String,
    field: Object,
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>

/* Radio Value */
.option-radio-value {
  cursor: pointer;
}

.option-radio-value input {
  cursor: inherit;
}

</style>