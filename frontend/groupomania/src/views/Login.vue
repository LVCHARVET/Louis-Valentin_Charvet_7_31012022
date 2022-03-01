<template>
  <section id="login" class="login container-fluid">
    <div id="container_home" class="container-fluid pb-5">
      <h1 id="msg_login" class="text-center text-white p-5">
        Connectez-vous !
      </h1>
      <form
        id="form"
        method="post"
        class="
          container
          col-sm-10 col-md-8 col-lg-6
          bg-white
          mb-5
          p-4
          border border-2 border-danger
          rounded
        "
        @submit.prevent="loginUser"
      >
        <div class="form-container">
          <label for="email" class="form-label">Adresse email :</label>
          <input
            required
            type="text"
            name="email"
            v-model="email"
            id="email"
            class="form-control mb-3"
          />
        </div>
        <div class="form-container">
          <label for="password" class="form-label">Mot de passe :</label>
          <input
            required
            type="password"
            name="password"
            v-model="password"
            id="password"
            class="form-control mb-3"
          />
        </div>
        <p id="msg_error" v-if="getInvalidInfo">
          {{ getInvalidInfo }}
        </p>
        <button id="submit" type="submit" class="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    ...mapGetters(["getInvalidInfo"]),
  },
};
</script>

<style lang="scss">
@import "../sass/color";
#login {
  background-color: grey;
}
#msg_login {
  font-size: 4em;
  text-decoration: underline red;
  font-weight: bolder;
  @media only screen and (max-width: 600px) {
    font-size: 3em;
  }
  @media only screen and (max-width: 430px) {
    font-size: 2em;
  }
}
</style>