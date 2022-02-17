<template>
  <div id="app">
    <div id="nav">
      <!--<img src="./assets/icon.png">-->
      <router-link to="/">Home</router-link> |
      <router-link to="/user">Profil</router-link> |
      <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/login">Se connecter</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@100&display=swap');
@import "sass/color";
body {  
  background: no-repeat url("assets/background.png");
  background-size: 100%;
  background-color: grey;
  font-size: 2em;
  color: white;
  
}

#app {
  font-family: 'Overpass', sans-serif;
  
}

#nav {
  background-color: $primary-color;
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: bold;    
    color: white;
    font-size: 50px;

    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
