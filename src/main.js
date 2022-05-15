import { createApp } from 'vue';
import App from './App';
import router from './router';
import './style/tailwindcss.css'

createApp(App).use(router).mount('#app');
