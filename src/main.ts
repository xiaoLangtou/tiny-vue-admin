import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store/index';
import router from './router';

// 样式相关
import './tailwindcss.css';
import './assets/styles/base.css';
import './assets/styles/index.scss';
import 'normalize.css';

const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount('#app');
