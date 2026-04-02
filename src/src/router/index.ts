import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('../views/CameraView.vue'),
    },
    {
      path: '/drag',
      name: 'drag',
      component: () => import('../views/DragView.vue'),
    },
  ],
});

export default router;
