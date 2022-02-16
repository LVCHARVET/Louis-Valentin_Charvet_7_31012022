<template>
  <div class="login">
    <h1 id="titre">Connectez-vous !</h1>
    <form id="form" method="post" @submit.prevent="loginUser">
      <div class="form-container">
        <label for="email">Adresse email :</label>
        <input required type="text" name="email" v-model="email" id="email" />
      </div>
      <div class="form-container">
        <label for="password">Mot de passe :</label>
        <input
          required
          type="password"
          name="password"
          v-model="password"
          id="password"
        />
      </div>
      <p id="msg_error" v-if="this.$store.state.invalidInfo != null">
        {{ this.$store.state.invalidInfo }}
      </p>
      <button id="submit" type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
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
      axios
        .post("http://localhost:8888/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          router.push("/user");
        })
        .catch(() => {
          this.$store.state.invalidInfo = "Email ou mot de passe incorrect !";
        });
    },
  },
  mounted() {
    this.$store.state.invalideInfo = null;
  },
};
</script>

<style lang="scss">
@import "../sass/color";
.login {
  margin-top: 2%;
  color: white;
  background-color: #002a5594;
  padding-bottom: 1px;
}
</style>