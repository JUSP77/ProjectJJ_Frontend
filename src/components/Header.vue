<template>
  <header class="mb-auto">
    <div class="container">
      <h3 class="float-md-start mb-0" @click="toHome">Home</h3>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    toHome(){
      this.$router.push({
        path: "/"
      })
    },
  }
}
</script>

<style scoped>

</style>