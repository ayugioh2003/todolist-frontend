// Utils
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/token.js'

const routes = [
  {
    path: '/',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/TodoPage.vue'),
    meta: {
      isAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!getToken() && to.meta.isAuth) {
    next({ name: 'login' })
  }

  next()
})

export default router;