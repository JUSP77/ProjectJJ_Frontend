<template>
  <div v-if="!isDataLoaded" class="container text-center spinner-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">로딩 중...</span>
    </div>
  </div>
  <div class="container" v-else>
    <div class="row justify-content-center">
      <div class="col-4 ">
        <p class="text-end" style="margin-bottom: 0;">{{questionIndex + 1}} / {{quizArray.length}}</p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="background-color: #CCE490"
               :style="{width: ((questionIndex+1)/quizArray.length)*100 + '%'}"
               :aria-valuenow="((questionIndex+1)/quizArray.length)*100" aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </div>
      <div class="row">
        <h1> Quiz {{ questionIndex + 1 }} </h1>
        <p v-if="isQuizPage"> 힌트 : {{ quizArray[questionIndex].hint }}</p>
        <p v-else>{{ quizArray[questionIndex].explanation }}</p>
      </div>
      <div class="row">
        <div class="row">
          <div class="col main1" :class="{ lowOpacity: correctAnswer === 'B'}">
            <img src="./../assets/A.png" @click="selectAnswer('B')">
            <br>
            <img :src="quizArray[questionIndex].imageA" @click="selectAnswer('A')"/>
            <br>
          </div>
          <div class="col main2" :class="{ lowOpacity: correctAnswer === 'A'}">
            <img src="./../assets/B.png" @click="selectAnswer('B')"/>
            <br>
            <img :src="quizArray[questionIndex].imageB" @click="selectAnswer('B')"/>
          </div>
        </div>
        <div class="row" v-if="!isQuizPage">
          <div class="col">
            <br>
            <button class="btn btn-primary" @click="nextRound()">다음</button>
          </div>
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
      questionIndex: 0,
      isQuizPage: true,
      correctAnswer: '',
      isDataLoaded: false,
      progressPercentage: 0
    }
  },
  components: {},

  mounted() {
    this.getAllQuiz();
  },

  methods: {
    getAllQuiz() {
      this.isLoading = true;
      this.$axios.get('http://localhost:8081/rest/getQuiz')
          .then(res => {
            const quizData = res.data.item;


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
      this.isQuizPage = false;

      const formData = new FormData();
      formData.append('no', quizNo);
      formData.append('answer', userAnswer);

      this.$axios
          .post('http://localhost:8081/rest/userAnswer', formData)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
          .then(() => {

          })
    },
    nextRound() {
      if (this.questionIndex < this.quizArray.length - 1) {
        this.questionIndex++;
        this.isQuizPage = true;
        this.correctAnswer = '';
      } else {
        this.$router.replace("/result");
      }
    }
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
  opacity: 0.4;
}

.progress-bar{
  width: 50%;
}
.spinner-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
}
</style>