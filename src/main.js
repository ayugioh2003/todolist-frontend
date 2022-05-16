import { createApp } from 'vue';
import App from './App';
import router from './router';
import './style/tailwindcss.css'
import './style/main.scss'

createApp(App).use(router).mount('#app');
