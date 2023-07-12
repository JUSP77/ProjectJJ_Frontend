<template>
  <div class="container">
    <h1> 결과발표</h1>
    <p>correctCount: {{countCorrectAnswer}} url: {{result.url}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      result: {},
      countCorrectAnswer: 0,
    }

  },
  mounted() {
    this.getResultPage();
  },
  methods: {
    getResultPage() {
      const userId = this.$route.query.userId;
      this.countCorrectAnswer = this.$route.query.countCorrectAnswer;

      this.$axios
          .get("http://localhost:8081/result", {
            params:{
              userId: userId,
              countCorrectAnswer: this.countCorrectAnswer,
            }
          })
          .then(res => {
            console.log(res);
            this.result = {
              url: res.data.result.url
            }
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