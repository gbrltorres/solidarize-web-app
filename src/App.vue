<template>
  <router-view />
</template>

<style>
@media (min-width: 768px) {
  #app {
    background-image: linear-gradient(to bottom, #8c52ff, #a578ff);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.separator-line {
  height: 1px;
  background-color: #cccccc;
}
</style>
