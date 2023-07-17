<template>
  <div class="container">
    <div class="row">
      <div v-if="!isDataLoaded" class="row justify-content-center align-items-center">
        <div class="text-center">
          <div class="spinner-container">
            <div class="spinner-border spinner-custom" role="status"></div>
            <p v-if="whichSpinner='showResult'" class="spinner-font">결과 도출 중입니다.</p>
            <p v-else class="spinner-font"> loading </p>
          </div>
        </div>
      </div>
      <!-- 시작  -->

      <div class="row my-2 justify-content-center" v-if="isDataLoaded">
        <!--progress bar -->
        <div class="row justify-content-center">
          <div class="col-4 ">
            <p class="text-end" style="font-size: 15px; margin-bottom: 0; color: #3182F7">
              <strong>{{ questionIndex + 1 }} / {{ quizArray.length }}</strong></p>
            <div class="progress" style="height: 10px;">
              <div class="progress-bar" role="progressbar" style="background-color: #3182F7; border-radius: 10px;"
                   :style="{width: ((questionIndex+1)/quizArray.length)*100 + '%'}"
                   :aria-valuenow="((questionIndex+1)/quizArray.length)*100" aria-valuemin="0"
                   aria-valuemax="100">
              </div>
            </div>
          </div>
        </div>

        <!-- 글씨 부분 -->
        <div class="row my-1 justify-content-center" style="height: 100px">
          <p class="quizNo"> Quiz {{ questionIndex + 1 }} </p>
          <img class="img-fluid my-1" v-if="!isClickHint" src="../assets/hintButton.png"
               style="width: 137px; height: 40px"
               @click="clickHint()">
          <p class="hint" v-if="isQuizPage && isClickHint"> 힌트 : {{ quizArray[questionIndex].hint }}</p>
          <p class="explanation" v-if="!isQuizPage">{{
              quizArray[questionIndex].explanation
            }}</p>
        </div>

        <!-- 퀴즈 부분 -->
        <div class="row justify-content-center my-2">
          <div class="col-6 main1 col-md-3" :class="{ lowOpacity: correctAnswer === 'B'}"
               style="background-color: lightgray; border-radius: 25px 0 0 25px">
            <img class="img-fluid my-3 initial-quiz" v-bind:class="{ viewBorder : isBorderA }"
                 src="./../assets/A.png"
                 @click="selectAnswer('B')"
                 @mouseover="viewBorder('A')" @mouseleave="viewBorder('A')">
            <br>
            <img class="img-fluid initial-quiz" v-bind:class="{ viewBorder : isBorderA }"
                 :src="quizArray[questionIndex].imageA"
                 @click="selectAnswer('A')"
                 @mouseover="viewBorder('A')" @mouseleave="viewBorder('A')" style="margin-bottom: 11px"/>
          </div>
          <div class="col-6 main2 col-md-3" :class="{ lowOpacity: correctAnswer === 'A'}"
               style="background-color: lightgray; border-radius: 0 25px 25px 0">
            <img class="img-fluid my-3 initial-quiz" v-bind:class="{ viewBorder : isBorderB }"
                 src="./../assets/B.png"
                 @click="selectAnswer('B')"
                 @mouseover="viewBorder('B')" @mouseleave="viewBorder('B')">
            <br>
            <img class="img-fluid initial-quiz" v-bind:class="{ viewBorder : isBorderB }"
                 :src="quizArray[questionIndex].imageB"
                 @click="selectAnswer('B')"
                 @mouseover="viewBorder('B')" @mouseleave="viewBorder('B')"/>
          </div>
        </div>
        <div class="col my-1" v-if="!isQuizPage" :key="questionIndex" style="margin-top: 0">
          <br>
          <img v-bind:class="{lowOpacity: hoverNextButton }" src="../assets/nextButton.png" @click="nextRound()"
               @mouseover="hoverButton()" @mouseleave="hoverButton()">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      quizArray: [],
      quizAnswers: [],
      questionIndex: 0,
      countAllQuiz: 0,
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
      whichSpinner: 'loading',
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
      this.$axios.get('https://projectjj.shop/rest/getQuiz')
          .then(res => {
            const quizData = res.data.item;
            console.log(quizData)
            this.countAllQuiz = quizData.length;
            console.log(this.userId)

            for (let i = 0; i < this.countAllQuiz; i++) {
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
        const answer = {
          quizNo: quizNo,
          userAnswer: userAnswer,
          userId: this.userId,
        };
        this.quizAnswers.push(answer);
        this.isQuizPage = false;

        if (this.questionIndex + 1 === this.countAllQuiz) {
          this.$axios
              .post('https://projectjj.shop/rest/userAnswer', this.quizAnswers)
              .then(res => {
                this.countCorrectAnswer = res.data.data;
                console.log(this.countCorrectAnswer)
              })
              .catch(err => {
                console.log(err)
              })
        }
      }
    },
    async nextRound() {
      if (this.questionIndex < this.quizArray.length - 1) {
        this.questionIndex++;
        this.isQuizPage = true;
        this.correctAnswer = '';
        this.isClickHint = false;
        this.isBorderA = false;
        this.isBorderB = false;
        this.whichSpinner = 'showResult';

      } else {
        this.isDataLoaded = false; // 스피너 표시
        await this.delay(3000);
        this.isDataLoaded = true;

        try {
          await this.$router.push({
            path: '/result',
            query: {userId: this.userId, countCorrectAnswer: this.countCorrectAnswer}
          });
        } catch (error) {
          console.log(error)
        }
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
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  watch: {},
}

</script>

<style scoped>

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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.initial-quiz {
  max-width: 100%;
  height: auto;
}

.initial-AB {
  max-width: 63px;
  max-height: 56px;
  width: auto;
  height: auto;
}

.hint {
  color: black;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.explanation {
  color: #3182F7;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.quizNo {
  color: black;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

@media (max-width: 992px) {
  .main1,
  .main2 {
    margin-top: 40px;
  }
}

@media (max-width: 450px) {
  .main1,
  .main2 {
    margin-top: 50px;
  }
}
.spinner-custom {
  width: 130px;
  height: 130px;
  border-width: 15px;
  color: #3182F7;
}
.spinner-font {
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>