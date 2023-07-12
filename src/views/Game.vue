<template>
  <div>
    <div v-if="!isDataLoaded" class="container text-center spinner-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">로딩 중...</span>
      </div>
    </div>
  </div>
  <!-- 시작  -->
  <div class="container-sm w-50 p-3" v-if="isDataLoaded">
    <!--progress bar -->
    <div class="row justify-content-center">
      <div class="col-9 ">
        <p class="text-end" style="font-size: 15px; margin-bottom: 0; color: #3182F7"><strong>{{ questionIndex + 1 }}
          / {{ quizArray.length }}</strong></p>
        <div class="progress" style="height: 10px;">
          <div class="progress-bar" role="progressbar" style="background-color: #3182F7"
               :style="{width: ((questionIndex+1)/quizArray.length)*100 + '%'}"
               :aria-valuenow="((questionIndex+1)/quizArray.length)*100" aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
    <!-- 글씨 부분 -->
    <div class="row py-3 justify-content-center">
      <h1> Quiz {{ questionIndex + 1 }} </h1>
      <img v-if="!isClickHint" src="../assets/hintButton.png" style="width: 137px; height: 40px"
           @click="clickHint()">
      <p v-if="isQuizPage && isClickHint" style="font-family:'나눔 고딕';"> 힌트 : {{ quizArray[questionIndex].hint }}</p>
      <p v-if="!isQuizPage" style="font-family:'맑은 고딕'; color: #3182F7">{{
          quizArray[questionIndex].explanation
        }}</p>
    </div>

    <!-- 퀴즈 부분 -->
    <div class="row justify-content-center py-4 px-1" style="background-color: #F2F3F5; border-radius: 25px;">
      <div class="col-xl-6 px-3 main1" :class="{ lowOpacity: correctAnswer === 'B'}">
        <img v-bind:class="{ viewBorder : isBorderA }" src="./../assets/A.png"
             @click="selectAnswer('B')"
             class="d-block mx-auto"
             style="margin-bottom: 26px;" @mouseover="viewBorder('A')" @mouseleave="viewBorder('A')">
        <img v-bind:class="{ viewBorder : isBorderA }" :src="quizArray[questionIndex].imageA"
             @click="selectAnswer('A')"
             @mouseover="viewBorder('A')" @mouseleave="viewBorder('A')"/>
        <br>
      </div>
      <div class="col-xl-6 px-3 main2" v-bind:class="{ lowOpacity: correctAnswer === 'A'}">
        <img v-bind:class="{ viewBorder : isBorderB }" src="./../assets/B.png"
             @click="selectAnswer('B')"
             class="d-block mx-auto"
             style="margin-bottom: 26px;" @mouseover="viewBorder('B')" @mouseleave="viewBorder('B')">
        <img v-bind:class="{ viewBorder : isBorderB }" :src="quizArray[questionIndex].imageB"
             @click="selectAnswer('B')"
             @mouseover="viewBorder('B')" @mouseleave="viewBorder('B')"/>
      </div>
    </div>
    <div class="col" v-if="!isQuizPage" :key="questionIndex">
      <br>
      <img v-bind:class="{lowOpacity: hoverNextButton }" src="../assets/nextButton.png" @click="nextRound()"
           @mouseover="hoverButton()" @mouseleave="hoverButton()">
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      quizArray: [],
      questionIndex: 0,
      isQuizPage: true,
      correctAnswer: '',
      isDataLoaded: false,
      progressPercentage: 0,
      userId: null,
      countCorrectAnswer: null,
      isClickHint: false,
      isBorderA: false,
      isBorderB: false,
      hoverNextButton: false,
      showP: false,
    }
  },
  components: {},

  mounted() {
    this.getAllQuiz();
  },

  methods: {
    getAllQuiz() {
      this.isLoading = true;
      const timestamp = Date.now();
      this.userId = 'session-' + timestamp;
      this.$axios.get('http://localhost:8081/rest/getQuiz')
          .then(res => {
            const quizData = res.data.item;
            console.log(this.userId)


            for (let i = 0; i < quizData.length; i++) {
              const quiz = {
                no: quizData[i].no,
                hint: quizData[i].hint,
                explanation: quizData[i].explanation,
                correctAnswer: quizData[i].correctAnswer,
                imageA: quizData[i].imageAUrl,
                imageB: quizData[i].imageBUrl
              };
              this.quizArray.push(quiz);
              this.isDataLoaded = true;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    selectAnswer(selectedAnswer) {
      // 서버로 보낼 정답 여부를 저장하는 변수 선언
      let userAnswer = null;
      let quizNo = this.questionIndex + 1;
      if (selectedAnswer === this.quizArray[this.questionIndex].correctAnswer) {
        userAnswer = "O";
      } else {
        userAnswer = "X";
      }
      this.correctAnswer = this.quizArray[this.questionIndex].correctAnswer;

      this.isClickHint = true;
      this.hoverNextButton = false;

      if (this.isQuizPage) {

        const formData = new FormData();
        formData.append('no', quizNo);
        formData.append('answer', userAnswer);
        formData.append('userId', this.userId);
        console.log(formData.get('answer'));

        this.$axios
            .post('http://localhost:8081/rest/userAnswer', formData)
            .then(res => {
              if (this.questionIndex + 1 === 10) {
                this.countCorrectAnswer = res.data.item[0];
              }
            })
            .catch(err => {
              console.log(err)
            })
        this.isQuizPage = false;
      }
    },
    nextRound() {
      if (this.questionIndex < this.quizArray.length - 1) {
        this.questionIndex++;
        this.isQuizPage = true;
        this.correctAnswer = '';
        this.isClickHint = false;
        this.isBorderA = false;
        this.isBorderB = false;
      } else {
        this.$router.replace({
          path: '/result',
          query: {userId: this.userId, countCorrectAnswer: this.countCorrectAnswer}
        });
      }
    },
    clickHint() {
      this.isClickHint = true;
    },
    viewBorder(selectedAnswer) {
      if (this.isQuizPage) {
        if (selectedAnswer === 'A') {

          this.isBorderA = !this.isBorderA;
        } else {
          this.isBorderB = !this.isBorderB;
        }
      }
    },
    hoverButton() {
      this.hoverNextButton = !this.hoverNextButton;
    },
  },
  watch: {},
}

</script>

<style scoped>

.container {
  min-height: 88.5vh;
}

.main1,
.main2 {
  opacity: 1;
  transition: opacity 0.3s;
}

.lowOpacity {
  opacity: 0.3;
}

.progress-bar {
  width: 50%;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
}

.container-sm {
  max-width: 1663px; /* 원하는 최대 너비로 설정 */
  margin-left: auto;
  margin-right: auto;
}

.viewBorder {
  box-shadow: 0 0 0 5px #3182F7;
  border-radius: 13px;
  transition: 0.2s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>