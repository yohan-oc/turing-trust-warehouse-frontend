import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/global.css';

createApp(App).use(router).mount('#app')
