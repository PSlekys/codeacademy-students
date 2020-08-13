<template>
  <div id="app">
    <Navigation />
    <Header />
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Header from "./components/Header";
export default {
  components: { Navigation, Header },
};
</script>
