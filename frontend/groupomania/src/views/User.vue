<template>
  <div class="user" v-if="user">
    <h1 id="hello_name">Hello {{ user.prenom + " " + user.nom }}</h1>
    <p id="wellcome_msg">Bienvenu sur votre page de profil !</p>
    <button @click="toggle">Modifier le profil</button>
    <form v-show="show" @submit.prevent="editUser">
      <div class="form-container">
        <label for="prenom">Nouveau prenom : </label>
        <input
          required
          type="text"
          name="prenom"
          v-model="newPrenom"
          id="prenom"
        />
      </div>
      <div class="form-container">
        <label for="nom">Nouveau nom :</label>
        <input required type="text" name="nom" v-model="newNom" id="nom" />
      </div>
      <div class="form-container">
        <label for="email">Nouvelle adresse email :</label>
        <input required type="text" name="email" v-model="newEmail" id="email" />
      </div>  
      <p id="msg_error" v-if="this.$store.state.invalidInfo != null">
        {{ this.$store.state.invalidInfo }}
      </p>
      <button id="submit" type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapGetters } from "vuex";
export default {
  name: "User",
  data() {
    return {
      user: null,
      show: false,
      newPrenom: "",
      newNom: "",
      newEmail: ""
    };
  },
  created() {
    this.user = this.getUser;
  },
  components: {},
  methods: {
    toggle() {
      this.show = !this.show;
    },
    fetchData() {
      this.user = this.getUser;
    },
    editUser() {
      axios.patch('http://localhost:8888/users/' + this.user.id, {
        prenom: this.newPrenom,
        nom: this.newNom,
        email: this.newEmail
      }, {
        headers: {
          Authorization: `Bearer ${this.getToken}`
        }
      })
      .then((res) => {
        this.user = res.data
        router.push("/user")
      })
      .catch(() => {
        this.$store.state.invalidInfo = "Erreur de modification"
      })
    }
  },
  mounted() {
    this.$store.state.invalidInfo = null;
  },
  computed: {
    ...mapGetters(["getUser", "getToken"])
  },
};
</script>

<style lang="scss">
</style>