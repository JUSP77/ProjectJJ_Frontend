<template>
  <body class="d-flex h-100 text-center" id="body">

  <div class="container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <RouterView/>
    <Footer/>
  </div>


  </body>
</template>

<script>

import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

.container {
  min-height: 90vh;
}
</style>
