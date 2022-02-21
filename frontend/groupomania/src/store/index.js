import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

export default createStore({
  state: {
    invalidInfo: null,
    userInfo: null,    
  },
  getters: {
    getUser(state) {
      return state.userInfo.user
    },
    getInvalidInfo(state) {
      return state.invalidInfo
    },
    isLoggedIn(state) {
      return !!state.userInfo
    }
  },
  mutations: {
    initialize(state) {
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    setUser(state, user) {
      state.userInfo = user
    },
    setInvalidInfo(state, invalidInfo) {
      state.invalidInfo = invalidInfo
    },
    logout(state) {
      state.userInfo = null
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
          let userInfo = { user: res.data.user, token: res.data.access_token }
          commit('setUser', userInfo)
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          router.push({name: "User", params: {user: res.data.user}});
        })
        .catch(() => {
          commit('setInvalidInfo', "Email ou mot de passe incorrect !")
        });
    },
    logout({ commit }) {
      localStorage.removeItem("userInfo")
      commit('logout')
      router.push('/')
    }
  },
  modules: {
  }
})
