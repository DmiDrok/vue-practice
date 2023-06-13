import { createRouter, createWebHistory } from 'vue-router';
import Invite from '@/components/Invite.vue';
import CreateForm from '@/components/CreateForm.vue';
import CreateField from '@/components/CreateField.vue';


const routes = [
  {
    name: 'main',
    path: '/',
    component: Invite,
  },

  {
    name: 'creation',
    path: '/create-form',
    component: CreateForm,

    children: [
      {
        name: 'create-new-field',
        path: 'new-field',
        component: CreateField
      }
    ]
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;