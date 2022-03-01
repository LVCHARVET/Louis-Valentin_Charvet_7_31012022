<template>
  <section id="home" class="home container-fluid">
    <div id="container_home" class="container-fluid">
      <img
        class="rounded img-fluid d-block mx-auto p-100 p-5"
        src="../assets/icon-left-font-monochrome-white.svg"
        alt="logo de l'entreprise groupomania"
      />
      <h1 id="home_msg" class="text-center text-white p-5">
        Bienvenu sur le réseau social dédié aux employés de Groupomania !
      </h1>
      <p id="presentation_groupo" class="text-center text-white p-5">
        Notre entreprise, spécialisée dans la grande distribution, est en pleine
        expansion. Nous avons actuellement plus de 600 collaborateurs et avons
        beaucoup recruté depuis quelques années. Nous étions uniquement 300 il y
        a 3 ans.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
@import "../sass/color";
#home {
  background-color: grey;
}
#container_home {
  background-color: $primary-color;
}
#home_msg {
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
#presentation_groupo {
  font-size: 2em;
  @media only screen and (max-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 430px) {
    font-size: 1em;
  }
}
</style>