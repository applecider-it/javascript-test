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
    {
      path: '/three',
      name: 'three',
      component: () => import('../views/ThreeView.vue'),
    },
    {
      path: '/pixi',
      name: 'pixi',
      component: () => import('../views/PixiView.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue'),
    },
    {
      path: '/tiptap',
      name: 'tiptap',
      component: () => import('../views/TipTapView.vue'),
    },
    {
      path: '/microphone',
      name: 'microphone',
      component: () => import('../views/MicrophoneView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
  ],
});

export default router;
