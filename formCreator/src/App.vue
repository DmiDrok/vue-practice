<template>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

</template>

<script>
import Invite from '@/components/Invite.vue';
import CreateForm from '@/components/CreateForm.vue';

export default {
  components: {
    Invite, CreateForm,
  }
}
</script>

<style>

/* Container */
.container {
  max-width: 1024px;
}

/* Router animations */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

/* Modal */
.modal {
  background-color: rgba(0, 0, 0, .5);
  display: block;
  z-index: 100000;
}
</style>