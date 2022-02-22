<template>
  <header class="col bg-dark">
    <div class="p-3">
      <nav class="nav nav-pills flex-column flex-sm-row">
        <router-link
          :class="{ active: path === '/' }"
          class="flex-sm-fill text-sm-center nav-link"
          to="/"
          >Home</router-link
        >
        <router-link
          :class="{ active: path === '/user' }"
          class="flex-sm-fill text-sm-center nav-link"
          to="/user"
          v-if="isLoggedIn"
          >Profil</router-link
        >
        <router-link
          :class="{ active: path === '/signup' }"
          class="flex-sm-fill text-sm-center nav-link"
          to="/signup"
          v-if="!isLoggedIn"
          >S'inscrire</router-link
        >
        <router-link
          :class="{ active: path === '/login' }"
          class="flex-sm-fill text-sm-center nav-link"
          to="/login"
          v-if="!isLoggedIn"
          >Se connecter</router-link
        >
        <button class="btn btn-danger" @click="logout" v-if="isLoggedIn">
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
</style>
