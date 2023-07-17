<template>
  <div class="container">
    <div class="row" style="margin-top: 80px;">
      <p class="title">UX 라이팅 퀴즈</p>
      <div class="row justify-content-center" style="margin-top: 70px">
        <img class="img-fluid initial-size" src="./../assets/home.png">
      </div>
      <div v-if="isLoading" class="row">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
        </div>
      </div>
      <div class="row v-else" style="margin-top: 60px">
        <p class="userCount">총<span style="color: #3182F7">{{ count }}</span>명이 참여했습니다.</p>
      </div>
      <div class="row d-flex justify-content-center">
        <img class="img-fluid initial-button" v-bind:class="{lowOpacity: hoverNextButton }"
             src="./../assets/startButton.png" @click="startButton"
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
      this.$axios.get('https://projectjj.shop/rest/getCount')
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

.title {
  color: #000;
  font-family: Pretendard;
  font-size: 70px;
  font-style: normal;
  font-weight: bolder;
  line-height: normal;
}

.userCount {
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 545;
  line-height: normal;
}
</style>