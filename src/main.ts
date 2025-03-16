import pinia from '@/store/index';
import { createApp } from 'vue';

import JsonViewer from 'vue3-json-viewer';
import App from './App.vue';
import router from './router';

// 样式相关
import './tailwindcss.css';
import 'normalize.css';
import 'ant-design-vue/dist/reset.css';
import 'nprogress/nprogress.css';
import './assets/styles/index.scss';
import 'vue3-json-viewer/dist/index.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(JsonViewer);

app.mount('#app');
