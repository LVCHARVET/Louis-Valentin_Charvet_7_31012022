<template>
  <div class="signup">
    <h1 id="titre">Inscrivez-vous !</h1>
    <form id="form" method="put" @submit.prevent="newUser">
      <div class="form-container">
        <label for="prenom">Prenom * : </label>
        <input
          required
          type="text"
          name="prenom"
          v-model="prenom"
          id="prenom"
        />
      </div>
      <div class="form-container">
        <label for="nom">Nom * :</label>
        <input required type="text" name="nom" v-model="nom" id="nom" />
      </div>
      <div class="form-container">
        <label for="email">Adresse email * :</label>
        <input required type="text" name="email" v-model="email" id="email" />
      </div>
      <div class="form-container">
        <label for="password">Mot de passe * :</label>
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
      <button id="submit" type="submit">S'enregistrer</button>
    </form>
    <p id="mention">(* Mentions obligatoires)</p>
  </div>
</template>



<script>
import axios from "axios";
import router from "../router";
export default {
  name: "signup",
  components: {},
  data() {
    return {
      prenom: null,
      nom: null,
      email: null,
      password: null,
    };
  },
  methods: {
    newUser() {
      axios
        .put("http://localhost:8888/users", {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          router.push("/login");
        })
        .catch(() => {
          this.$store.state.invalidInfo = "Ce compte existe déjà !";
        });
    },
  },
  mounted() {
    this.$store.state.invalidInfo = null;
  },
};
</script>



<style lang="scss">
@import "../sass/color";
</style>