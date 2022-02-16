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
        <label for="email">Adresse mail * :</label>
        <input required type="text" name="email" v-model="email" id="email" />
      </div>
      <div class="form-container">
        <label for="password">Mot de passe * :</label>
        <input
          required
          type="text"
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
.signup {
  margin-top: 2%;
  color: white;
  background-color: #002a5594;
  padding-bottom: 1px;
}

#titre {
  display: flex;
  justify-content: center;
  padding-top: 1%;
}

#form {
  margin-bottom: 100px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
}

input {
  width: 20%;
  height: 20px;
}

#submit {
  font-size: 1.5rem;
  width: 10%;
  padding: 10px;
  border-radius: 20px;
  border: none;
  position: absolute;
  left: 45%;
  &:hover {
    transform: scale(1.1);
    font-weight: bold;
    background-color: white;
    color: red;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
}

#msg_error {
  display: flex;
  justify-content: center;
  color: red;
  font-weight: bold;
  font-size: 1.5em; 
}

#mention {
  font-size: 0.5em;
  margin-left: 1%;
}
</style>