<template>
  <div class="container">
    <div class="row">
      <div class="row">
        <div v-if="!isDataLoaded" class="spinner-container">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
        </div>
      </div>
      <!-- 시작  -->

      <div class="row my-3 justify-content-center" v-if="isDataLoaded">
        <!--progress bar -->
        <div class="row justify-content-center">
          <div class="col-4 ">
            <p class="text-end" style="font-size: 15px; margin-bottom: 0; color: #3182F7">
              <strong>{{ questionIndex + 1 }} / {{ quizArray.length }}</strong></p>
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
        <div class="row my-3 justify-content-center">
          <h1> Quiz {{ questionIndex + 1 }} </h1>
          <img class="img-fluid my-2" v-if="!isClickHint" src="../assets/hintButton.png" style="width: 137px; height: 40px"
               @click="clickHint()">
          <p v-if="isQuizPage && isClickHint" style="font-family:'나눔 고딕'; height: 40px"> 힌트 : {{ quizArray[questionIndex].hint }}</p>
          <p v-if="!isQuizPage" style="font-family:'맑은 고딕';height: 40px; color: #3182F7">{{
              quizArray[questionIndex].explanation
            }}</p>
        </div>

        <!-- 퀴즈 부분 -->
        <div class="row justify-content-center my-2">
          <div class="col-6 main1 col-md-3" :class="{ lowOpacity: correctAnswer === 'B'}" style="background-color: lightgray; border-radius: 25px 0 0 25px">
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
          <div class="col-6 main2 col-md-3" :class="{ lowOpacity: correctAnswer === 'A'}" style="background-color: lightgray; border-radius: 0 25px 25px 0">
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
        <div class="col" v-if="!isQuizPage" :key="questionIndex" style="margin-top: 0">
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
              })
              .catch(err => {
                console.log(err)
              })
        }
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

</style>