<template>
  <div class="home">
    <img
      id="logo_home"
      src="../assets/icon-above-font.png"
      alt="Logo de Groupomania"
    />
    <h1 id="home_msg">
      Bienvenu sur le réseau social dédié aux employés de Groupomania !
    </h1>
    <p id="presentation_groupo">
      Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. 
      Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. 
      Nous étions uniquement 300 il y a 3 ans.
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
.home {
  margin-top: 2%;
  color: white;
  background-color: #002a5594;
  padding-bottom: 1px;
}

#logo_home {
  width: 20%;  
  text-align: center;
  margin: auto;
  display: flex;
  padding-top: 2%;
  @media screen and (max-width: 750px) {
    width: 40%;
  }
}

#home_msg {
  font-size: 1.5em;
  text-align: center;
  text-decoration: underline red;
}

#presentation_groupo {
  font-style: italic;
  text-align: center;
  padding: 3%;
}
</style>