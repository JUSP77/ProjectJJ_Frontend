<template>
  <div class="container">
    <div class="row my-5">
      <div class="row">
        <p class="thanks">참여해주셔서 감사합니다.</p>
      </div>
      <div class="row my-3 justify-content-center image-container">
        <img class="img-fluid" src="../assets/result.png" style="max-width: 656px; height: auto">
        <div class="caption">
          <p class="result">{{ countCorrectAnswer / 10 * 100 }}</p>
          <p class="point">점</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <img class="img-fluid" style="max-width: 251px; height: auto" src="../assets/backToHome.png" @click="goHome()">
      </div>
    </div>
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
      this.isDataLoaded = true;
      const userId = this.$route.query.userId;
      this.countCorrectAnswer = this.$route.query.countCorrectAnswer;
      console.log(userId, this.countCorrectAnswer)

      this.$axios
          .get("https://projectjj.shop/result", {
            params: {
              userId: userId,
              countCorrectAnswer: this.countCorrectAnswer,
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
    },
    goHome() {
      this.$router.push({
        path: "/"
      })
    }

  },
}

</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;

}

.caption {
  position: absolute; /* 절대적인 위치 설정 */
  bottom: 80px; /* 이미지 하단에 배치 */
  left: 20px; /* 이미지 좌측에 배치 */
  color: #fff; /* 글씨 색상 설정 */
  padding: 8px; /* 내부 여백 설정 */
}

.thanks {
  color: black;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.result {
  display: inline;
  color: white;
  font-family: Montserrat;
  font-size: 10vw; /* 화면 너비의 10% 크기로 설정 */
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
}

.point {
  display: inline;
  margin: 4px;
  color: #FFF;
  font-family: Montserrat;
  font-size: 4vw; /* 화면 너비의 4% 크기로 설정 */
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>