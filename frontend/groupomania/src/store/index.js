import { createStore } from 'vuex'
//import axios from 'axios'
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
    getToken(state) {
      return state.userInfo.token
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
      fetch("http://localhost:8888/auth/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      })
        .then(blob => {
          if (!blob.ok) {
            throw new Error('Email ou mot de passe incorrect !')
          }
          return blob.json()
        })
        .then(res => {
          let userInfo = { user: res.user, token: res.accessToken, refreshToken: res.refreshToken }
          commit('setUser', userInfo)
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          router.push({ name: "User", params: { user: res.user } });
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
