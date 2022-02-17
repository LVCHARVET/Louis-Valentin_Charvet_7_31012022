import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

export default createStore({
  state: {
    invalidInfo: null,
    user: null
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getInvalidInfo(state) {
      return state.invalidInfo
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setInvalidInfo(state, invalidInfo) {
      state.invalidInfo = invalidInfo
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      axios
        .post("http://localhost:8888/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          commit('setUser', res.data.user)
          localStorage.setItem('token', res.data.access_token)
          router.push("/user");
        })
        .catch(() => {
          commit('setInvalidInfo', "Email ou mot de passe incorrect !")
        });
    }
  },
  modules: {
  }
})
