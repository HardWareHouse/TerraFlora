<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "./components/UI/header.vue";
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
#app {
  font-family: "Roboto", sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
</style>
