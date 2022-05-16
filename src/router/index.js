// Utils
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/token.js'
// Components
import HomePage from '../views/HomePage';
import TodoPage from '../views/TodoPage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
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
    next({ name: 'home' })
  }

  next()
})

export default router;