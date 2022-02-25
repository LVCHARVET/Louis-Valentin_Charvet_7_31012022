<template>
  <header>
    <div class="p-3">
      <nav class="nav nav-pills flex-column flex-sm-row space-between">
        <router-link
          :class="{ active: path === '/' }"
          class="flex-sm-fill text-sm-center nav-link text-center border border-primary m-1"
          to="/"
          >Home</router-link
        >
        <router-link
          :class="{ active: path === '/user' }"
          class="flex-sm-fill text-sm-center nav-link text-center border border-primary m-1"
          to="/user"
          v-if="isLoggedIn"
          >Profil</router-link
        >
        <router-link
          :class="{ active: path === '/signup' }"
          class="flex-sm-fill text-sm-center nav-link text-center border border-primary m-1"
          to="/signup"
          v-if="!isLoggedIn"
          >S'inscrire</router-link
        >
        <router-link
          :class="{ active: path === '/login' }"
          class="flex-sm-fill text-sm-center nav-link text-center border border-primary m-1"
          to="/login"
          v-if="!isLoggedIn"
          >Se connecter</router-link
        >
        <button id="logout_btn" class="btn btn-danger m-1" @click="logout" v-if="isLoggedIn">
          déconnexion
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      path: "/",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {
    this.$watch(
      () => this.$route.path,
      (path) => {
        console.log(path);
        this.path = path;
      }
    );
  },
};
</script>

<style lang="scss">
@import "../sass/color";
nav {
  font-size: 2em;
  font-weight: bold;
}
</style>
