<template>
  <div id="app">
    <Header @toggle-search="toggleSearch" />
    <router-view></router-view>
    <SearchOverlay v-if="showSearch" @close="toggleSearch"/>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/UI/header.vue'
import Footer from './components/UI/footer.vue'
import SearchOverlay from './components/homePage/searchBar.vue';

const showSearch = ref(false);

function toggleSearch() {
  showSearch.value = !showSearch.value;
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
@import url('https://fonts.googleapis.com/css2?family=Yesteryear&display=swap');
#app {
  font-family: "Roboto", sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
.container {
    max-width: 1200px;
}

label {
  margin-bottom: 0px !important;
}
</style>
