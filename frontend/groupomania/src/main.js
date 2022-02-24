import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
// import { jwtInterceptor, errorInterceptor } from './_helpers'


const app = createApp(App);

// jwtInterceptor()
// errorInterceptor()

app.use(store).use(router).mount('#app')