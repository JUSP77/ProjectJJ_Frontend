<template>
  <div class="px-3">
    <br>
    <br>
    <br>
    <br>
    <br>
    <button class="btn btn-primary" @click="goPage">회원가입</button>
    <a href="/upload">업로드</a>
    <br>
    <h1>UX 라이팅 퀴즈</h1>
    <br>
    <p> 내 라이팅 실력은 ?</p>
    <img src="./../assets/home.png">
    <p>현재 총 xxx,xxx 명이 참여했습니다.</p>
    <img src="./../assets/startButton.png" @click="startButton">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>

export default {
  name: "Home",
  methods: {
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

</style>