<template>
  <main class="main">
    <div class="create-form">
      <div class="container create-form__container">
        <div class="create-form__row py-3">

          <div
            v-for="field in fields"
            :key="field.id"
            class="create-form-field-title create-form-field card border border-success rounded-1 border-3">
            <div class="create-form-field__header card-header p-3 mb-2">
              <h3 class="create-form-field__title card-title">{{ field.title }} <sup class="required-field">{{ field.required ? '*' : '' }}</sup></h3>
              <p class="create-form-field__text card-text">{{ field.text }}</p>
            </div>

            <div class="create-form-field__body card-body">
              <div class="row">
                <div class="col">
                  <FieldInput 
                  :autofocus="!$store.state.showPopup"
                  :placeholder="field.placeholder"
                  v-model="field.value"
                  ref="lastField"
                  @keyup.ctrl="clearActiveInput"
                  @focus="onActiveInputFocus($event, field)"
                  @blur="onActiveInputBlur"
                  :field="field"
                  />
                </div>

                <div :class="field.id !== 1 ? 'col-md-2' : 'col-md-1'" class="col-12 d-flex justify-content-center align-items-center py-3 py-md-0">
                  <div class="row flex-nowrap">
                    <div class="col">
                      <ButtonClear
                        @click="field.value = ''"
                        :disabled="field.value.length === 0" />
                    </div>

                    <div v-if="field.id !== 1" class="col">
                      <button @click="deleteField(field)" class="btn btn-danger">
                        <img src="@/assets/icons/trash-icon.svg" alt="" aria-hidden="true">
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ButtonMore
            :disabled="disabledMoreButton"
            :showTooltip="showTooltip"
            @click="goToCreateField"
            class="my-3"
            />
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component
          @makeField="appendNewField"
          :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import ButtonMore from '@/components/UI/ButtonMore.vue';
import ButtonClear from '@/components/UI/ButtonClear.vue';
import FieldInput from '@/components/FieldInput.vue';


export default {
  name: 'CreateForm',

  components: {
    ButtonMore, ButtonClear, FieldInput,
  },

  data() {
    return {
      title: '',
      disabledClearButton: true,
      disabledMoreButton: true,
      showTooltip: false,
      activeField: null,
      
      // Массив всех полей
      fields: [
        { 
          id: 1,
          name: 'title',
          title: 'Выберите название создаваемой формы:', text: 'Это название будет видно остальным пользователям, которые будут проходить вами составленный опрос.',
          placeholder: 'Любое название',
          type: 'text',
          target: null,
          value: '',
          required: true,
          group: {
            groupName: '',
            options: [
              { optionTitle: '' }
            ]
          },
        },
      ]
    }
  },

  methods: {
    // Показываем тултип только при блюре инпута
    onActiveInputBlur() {
      if (this.$store.state.userIntro) {
        this.showTooltip = !this.disabledMoreButton;
      }
    },

    onActiveInputFocus(event, field) {
      this.activeField = field;

      this.activeField.target = event.target;
      this.activeField.value = event.target.value;

    },

    clearActiveInput(event) {
      const delBtnKeyCode = 46;
      if ([delBtnKeyCode, undefined].includes(event.keyCode)) {
        this.activeField.value = '';
      }
    },

    goToCreateField() {
      this.$router.push({ name: 'create-new-field' });
    },

    appendNewField(field) {
      field.id = this.fields.at(-1).id + 1;
      this.fields.push(field);
      
      this.$store.commit('setUserOutIntro');
      this.showTooltip = false;
      this.setFocusToLastField();
    },

    deleteField(fieldToDel) {
      this.fields = this.fields.filter((field) => field.id !== fieldToDel.id);

      this.setFocusToLastField();
    },

    setFocusToLastField() {
      setTimeout(() => {
        this.$refs.lastField.at(-1).$el.focus?.()
      }, 0);
    }
  },

  watch: {
    activeField: {
      // Помещаем слежение за activeField сюда - и получаем выгоду x2
      // Поскольку: activeField - последнее поле, а также - мы его и проверяем
      // Не будь такого - кнопка "Ещё" - горела бы при вводе на любом, а не на последнем
      handler() {
        if (this.$store.state.userIntro) {
          this.disabledMoreButton = this.fields.at(-1).value.length < this.$store.state.minValueLength || this.$store.state.showPopup;
          this.showTooltip = !this.disabledMoreButton;        
        }
      },
      deep: true,
    }
  },

  mounted() {
    if (!this.$store.state.userIntro) {
      this.disabledMoreButton = false;
      this.showTooltip = true;
    }
  }
}
</script>

<style scoped>

/* Field */
.create-form-field {
  margin-bottom: 30px;
}

.required-field {
  color: red;
  font-size: 40px;
  top: 0;
}

</style>