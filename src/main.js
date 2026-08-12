import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router/index.js'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')


