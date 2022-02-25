<template>
  <section id="signup" class="signup container-fluid">
    <div id="container_home" class="container-fluid pb-1">
      <h1 id="msg_signup" class="text-center text-white p-5">Inscrivez-vous !</h1>
      <form
        id="form"
        class="
          container
          col-sm-10 col-md-8 col-lg-6
          bg-white
          mb-3
          p-4
          border border-2 border-danger
          rounded
        "
        method="put"
        @submit.prevent="newUser"
      >
        <div class="form-container">
          <label for="prenom" class="form-label">Prenom * : </label>
          <input
            required
            type="text"
            name="prenom"
            v-model="prenom"
            id="prenom"
            class="form-control mb-3 "
          />
        </div>
        <div class="form-container">
          <label for="nom" class="form-label">Nom * :</label>
          <input required type="text" name="nom" v-model="nom" id="nom" class="form-control mb-3 "/>
        </div>
        <div class="form-container">
          <label for="email" class="form-label">Adresse email * :</label>
          <input required type="text" name="email" v-model="email" id="email" class="form-control mb-3"/>
        </div>
        <div class="form-container">
          <label for="password" class="form-label">Mot de passe * :</label>
          <input
            required
            type="password"
            name="password"
            v-model="password"
            id="password"
            class="form-control mb-3 "
          />
        </div>
        <p id="msg_error" v-if="!this.$store.state.invalidInfo">
          {{ this.$store.state.invalidInfo }}
        </p>
        <button class="btn btn-primary" id="submit" type="submit">S'enregistrer</button>
      </form>
      <p id="mention" class="text-white">(* Mentions obligatoires)</p>
    </div>
  </section>
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
        .create()
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
#signup {
  background-color: grey;
}
#msg_signup {
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