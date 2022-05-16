import { createRouter, createWebHistory } from 'vue-router';
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
