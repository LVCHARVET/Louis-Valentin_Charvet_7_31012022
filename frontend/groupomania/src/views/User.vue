<template>
  <section class="user" v-if="user">
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
        <input
          required
          type="email"
          name="email"
          v-model="newEmail"
          id="email"
        />
      </div>
      <div
        id="msg_error"
        v-if="this.$store.state.invalidInfo"
        class="alert alert-danger"
        role="alert"
      >
        {{ this.$store.state.invalidInfo }}
      </div>
      <button id="submit" type="submit">Enregistrer</button>
    </form>
    <button @click="deleteUser">Supprimer le compte</button>
  </section>
</template>

<script>
import { axiosApiInstance } from "../_helpers/index";
import { mapGetters } from "vuex";
export default {
  name: "User",
  data() {
    return {
      user: null,
      show: false,
      newPrenom: "",
      newNom: "",
      newEmail: "",
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
      axiosApiInstance
        .patch("http://localhost:8888/users/" + this.user.id, {
          prenom: this.newPrenom,
          nom: this.newNom,
          email: this.newEmail,
        })
        .then((res) => {
          this.user = res.data.user;
          this.$store.state.invalidInfo = "Utilisateur modifié !";
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$store.state.invalidInfo = "Token incorrect ou expiré";
          } else {
            this.$store.state.invalidInfo = "Erreur de modification";
          }
        });
    },
    deleteUser() {
      axiosApiInstance
        .delete("http://localhost:8888/users/" + this.user.id)
        .then(() => {
          this.$store.dispatch("logout");
        })
        .catch(() => {
          this.$store.state.invalidInfo =
            "Vous ne pouvez pas supprimer ce compte";
        });
    },
  },
  mounted() {
    this.$store.state.invalidInfo = null;
  },
  computed: {
    ...mapGetters(["getUser", "getToken", "logout"]),
  },
};
</script>

<style lang="scss">
</style>