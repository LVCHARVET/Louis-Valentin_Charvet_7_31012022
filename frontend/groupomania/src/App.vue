<template>
  <body id="app" class="vh-100 vw-100">
    <Nav />
    <router-view />
  </body>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
  beforeCreate() {
    this.$store.commit("initialize");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@100&display=swap");
@import "sass/color";
@import "~bootstrap/dist/css/bootstrap.css";
#app {
  size: 100v;
  font-family: "Overpass", sans-serif;
  background: grey;
  background-size: cover;
}
</style>
