<template>
  <div class="container">
    <div class="row">
      <div class="row px-3">
        <a href="/upload">업로드</a>
      </div>
      <br>
      <div class="row">
        <h1><strong>UX 라이팅 퀴즈</strong></h1>
      </div>
      <div class="row justify-content-center">
        <img class="img-fluid initial-size" src="./../assets/home.png">
      </div>
      <div v-if="isLoading" class="row">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
        </div>
      </div>
      <div class="row v-else">
        <p>현재 총 {{ count }} 명이 참여했습니다.</p>
      </div>
      <div class="row d-flex justify-content-center">
        <img class="img-fluid initial-button" v-bind:class="{lowOpacity: hoverNextButton }" src="./../assets/startButton.png" @click="startButton"
             @mouseover="hoverButton()" @mouseleave="hoverButton()">
      </div>
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
      hoverNextButton: false,
    }
  },

  mounted() {
    this.getCount();
  },
  methods: {
    getCount() {
      this.isLoading = true;
      this.$axios.get('http://localhost:5000/rest/getCount')
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
    startButton() {
      this.$router.push("/game")
    },
    hoverButton() {
      this.hoverNextButton = !this.hoverNextButton;
    },
  }
}

</script>

<style scoped>

.container {
  min-height: 88.5vh;
}

.lowOpacity {
  opacity: 0.4;
}

.initial-size {
  max-width: 656px;
  height: auto;
}
.initial-button {
  max-width: 275px;
  height: auto;
}
</style>