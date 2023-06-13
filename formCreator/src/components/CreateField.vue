<template>
  <div @click="closePopup" :class="{ show: $store.state.showPopup }" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div @click.stop class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Создание нового поля формы</h1>
          <button @click="closePopup" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="field-title" class="col-form-label">Заголовок поля:</label>
              <input
                v-model="field.title"
                type="text" class="form-control"
                id="field-title"
              >
            </div>
            <div class="mb-3">
              <label for="field-text" class="col-form-label">Текст под полем (необязательно):</label>
              <textarea 
              v-model="field.text"
              class="form-control"
              id="field-text"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="field-text" class="col-form-label d-flex align-items-center">
                Обязательное поле:

                <div class="mx-3">
                  <input 
                    v-model="field.required"
                    class="form-check-input"
                    type="checkbox">
                </div>
              </label>
            </div>
            <div class="mb-3">
              <label for="field-type" class="col-form-label">Тип поля:</label>
              <div class="dropdown">
                <select v-model="field.type" id="field-type" class="btn btn-outline-success dropdown-toggle">
                  <option value="text">Текстовое</option>
                  <option value="number">Числовое</option>
                  <option value="group">Группа полей</option>
                </select>
              </div>
            </div>
            <div class="mt-4 pt-3 border border-secondary border-start-0 border-bottom-0 border-end-0">
              <div v-if="showPlaceholderInput" class="mb-3">
                <label for="field-text-placeholder" class="col-form-label">Текст на поле ввода (Placeholder):</label>
                <input
                  v-model="field.placeholder"
                  type="text" class="form-control"
                  id="field-text-placeholder"
                >
              </div>
              <div v-if="showCreateGroupFields" class="mb-3">
                <label for="field-group-title" class="col-form-label">Название группы полей:</label>
                <input
                  v-model="field.group.groupName"
                  type="text" class="form-control"
                  id="field-group-title"
                >
              </div>
              <div v-if="showCreateGroupFields" class="mb-3">
                <label for="#" class="col-form-label">Создание группы:</label>
                <div class="row d-flex justify-content-between">
                  <div 
                    v-for="option in field.group.options" 
                    class="col-3 text-center">
                    <label for="#" class="col-form-label">Имя опции:</label>
                    <input v-model="option.optionTitle" type="text" class="form-control">
                  </div>

                  <div class="col-3 text-center">
                    <label for="#" class="col-form-label">Создать ещё:</label>
                    <ButtonMore @click="addOption" />
                  </div> 
                  
                  <div class="col-3"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="closePopup" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button
            :disabled="createBtnDisabled"
            @click="makeField"
            type="button"
            class="btn btn-success"
          >Создать поле</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMore from '@/components/UI/ButtonMore.vue';

export default {
  name: 'CreateField',

  components: {
    ButtonMore
  },

  data() {
    return {
      field: {
        name: 'anotherField',
        title: '',
        text: '',
        placeholder: '',
        type: 'text',
        target: null,
        value: '',
        required: false,
        group: {
          groupName: '',
          options: [
            { optionTitle: '' }
          ]
        },
      },
      createBtnDisabled: true,
      showPlaceholderInput: false,
      showCreateGroupFields: false,
    }
  },

  methods: {
    closePopup() {
      this.$router.push({ name: 'creation' });
    },

    makeField() {
      this.$emit('makeField', this.field);
      this.closePopup();
    },

    addOption() {
      this.field.group.options.push({ optionTitle: '' });
    },
  },

  mounted() {
    this.$store.commit('setPopupActive');
  },

  beforeUnmount() {
    this.$store.commit('setPopupHide');
  },

  computed: {
    createBtnDisabled() {
      if (['text', 'number'].includes(this.field.type)) {
        return this.field.title.length < this.$store.state.minValueLength;
      } else if (['group'].includes(this.field.type)) {
        return this.field.title.length < this.$store.state.minValueLength 
               ||
               this.field.group.groupName.length < this.$store.state.minValueLength
               || 
               this.field.group.options
                  .some((option) => option.optionTitle.length < this.$store.state.minValueLength)        
               ||
               !this.isOptionsUnique
      }
    },

    showPlaceholderInput() {
      return ['text', 'number'].includes(this.field.type);
    },

    showCreateGroupFields() {
      return ['group'].includes(this.field.type);
    },

    isOptionsUnique() {
      let isUnique = true;

      outerLoop: 
      for (let i = 0; i < this.field.group.options.length; i++) {
        for (let j = i+1; j < this.field.group.options.length; j++) {
          if (this.field.group.options[i].optionTitle 
              === 
              this.field.group.options[j].optionTitle) {
            isUnique = false;
          }
        }
      }

      return isUnique;
    }
  }
}
</script>

<style scoped>

</style>