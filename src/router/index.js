// Utils
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/token.js'
// Components
import TodoPage from '../views/TodoPage';
import RegisterPage from '../views/RegisterPage';
import LoginPage from '../views/LoginPage';

const routes = [
  {
    path: '/',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoPage,
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