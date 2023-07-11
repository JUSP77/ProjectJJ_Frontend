<template>
  <div class="container">
    <h1> 결과발표</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }

  },
  mounted() {
    this.getResultPage();
  },
  methods: {
    getResultPage() {
      const userId = this.$route.query.userId;

      this.$axios
          .get("http://localhost:8081/result", {
            params:{
              userId: userId,
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
    }

  },
}

</script>

<style scoped>
.container {
  min-height: 88.5vh;
}
</style>