import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

const app = createApp(App);

// axios.interceptors.request.use(request => {
//     const token = localStorage.getItem("token");
//     //console.log(token);
//     if (request.url.includes('/auth/login')) {
//         return request
//     }
//     if (token) {
//         request.headers["Authorization"] = 'Bearer ' + token;
//     }
//     return
// });

app.use(store).use(router).mount('#app')