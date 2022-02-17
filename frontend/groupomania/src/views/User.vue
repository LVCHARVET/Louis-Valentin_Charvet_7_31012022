<template>
  <div class="user" v-if="user">
    <h1>Hello : {{ user.prenom }}</h1>
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
      { immediate: true }
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