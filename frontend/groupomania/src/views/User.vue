<template>
  <section id="user" class="user container-fluid" v-if="user">
    <div id="container_home" class="container-fluid">
      <h1 id="hello_name" class="text-center text-white p-5">
        Hello {{ user.prenom + " " + user.nom }}
      </h1>
      <p id="wellcome_msg" class="text-center text-white p-5">
        Bienvenu sur votre page de profil !
      </p>
      <button class="btn btn-warning m-3" @click="toggle">
        Modifier le profil
      </button>
      <form
        id="form_edit_user"
        v-show="show"
        class="
          container
          col-sm-10 col-md-8 col-lg-6
          bg-white
          mb-3
          p-4
          border border-2 border-danger
          rounded
        "
        @submit.prevent="editUser"
      >
        <div class="form-container">
          <label for="prenom" class="form-label">Nouveau prenom : </label>
          <input
            required
            type="text"
            name="prenom"
            v-model="newPrenom"
            id="prenom"
            class="form-control mb-3 w-50"
          />
        </div>
        <div class="form-container">
          <label for="nom" class="form-label">Nouveau nom :</label>
          <input
            required
            type="text"
            name="nom"
            v-model="newNom"
            id="nom"
            class="form-control mb-3 w-50"
          />
        </div>
        <div class="form-container">
          <label for="email" class="form-label">Nouvelle adresse email :</label>
          <input
            required
            type="email"
            name="email"
            v-model="newEmail"
            id="email"
            class="form-control mb-3 w-75"
          />
        </div>
        <div
          id="msg_error"
          v-if="this.$store.state.invalidInfo"
          class="alert alert-danger text-center"
          role="alert"
        >
          {{ this.$store.state.invalidInfo }}
        </div>
        <div
          id="msg_modify"
          v-if="this.$store.state.validInfo"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ this.$store.state.validInfo }}
        </div>
        <button id="submit" type="submit" class="btn btn-primary">
          Enregistrer
        </button>
      </form>
      <button class="btn btn-danger m-3" @click="deleteUser">
        Supprimer le compte
      </button>
    </div>
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
    this.$store.state.invalidInfo = null;
    this.$store.state.validInfo = null;
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
        .then(() => {
          this.user = {
            prenom: this.newPrenom,
            nom: this.newNom,
            email: this.newEmail,
          };
          this.$store.state.validInfo = "Utilisateur modifié !";
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
      let res = confirm("Êtes vous sûr de vouloir supprimer ce compte ?")
      if (res) {
        axiosApiInstance
          .delete("http://localhost:8888/users/" + this.user.id)
          .then(() => {
            this.$store.dispatch("logout");
          })
          .catch(() => {
            this.$store.state.invalidInfo =
              "Vous ne pouvez pas supprimer ce compte";
          });
      }
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
#user {
  background-color: grey;
}
#hello_name {
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
#wellcome_msg {
  font-size: 2em;
  @media only screen and (max-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 430px) {
    font-size: 1em;
  }
}
</style>