<template>
  <div class="user" v-if="user">
    <h1 id="hello_name">Hello {{ user.prenom + " " + user.nom }}</h1>
    <p id="wellcome_msg">Bienvenu sur votre page de profil !</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "User",
  created() {
    this.$watch(
      () => this.$route,
      () => {
        this.fetchData();
      },
      { immediate: true },
    );
  },
  components: {},
  methods: {
    fetchData() {
      this.user = this.getUser;
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style lang="scss">
.user {
  margin-top: 2%;
  color: white;
  background-color: #002a5594;
  padding-bottom: 1px;
}

#hello_name {
  text-align: center;
  padding-top: 2%;
}

#wellcome_msg {
  text-align: center;
}
</style>