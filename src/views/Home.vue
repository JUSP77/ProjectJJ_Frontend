<template>
  <div class="container">
    <div class="px-3">
      <button class="btn btn-primary" @click="goPage">회원가입</button>
      <a href="/upload">업로드</a>
      <br>
      <h1>UX 라이팅 퀴즈</h1>
      <br>
      <p> 내 라이팅 실력은 ?</p>
      <img src="./../assets/home.png">
      <div v-if="isLoading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">로딩 중...</span>
        </div>
      </div>
      <p v-else>현재 총 {{ count }} 명이 참여했습니다.</p>
      <img src="./../assets/startButton.png" @click="startButton">
    </div>
  </div>
</template>


<script>

export default {
  name: "Home",

  data() {
    return {
      count: 0,
      isLoading: false,

    }
  },

  mounted() {
    this.getCount();
  },
  methods: {
    getCount() {
      this.isLoading = true;
      this.$axios.get('http://localhost:8081/rest/getCount')
          .then(res => {
            this.count = res.data.count;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });

    },
    goPage() {
      this.$router.push("/registerForm")
    },
    startButton() {
      this.$router.push("/game")
    }
  }
}

</script>

<style scoped>

.container {
  min-height: 88.5vh;
}
</style>