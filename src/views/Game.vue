<template>
  <div class="container" v-if="isDataLoaded">
    <div class="row">
      <h1> Quiz {{ questionIndex + 1 }} </h1>
      <p v-if="isQuizPage"> {{ quizArray[questionIndex].hint }}</p>
      <p v-else>{{ quizArray[questionIndex].explanation }}</p>
    </div>
    <div class="row">
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
  <br>
  <br>
  <br>
  <br>
  <br>

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
    }
  },
  components: {},

  mounted() {
    this.getAllQuiz();
  },

  methods: {
    getAllQuiz() {
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
          });
    },
    selectAnswer(selectedAnswer) {
      // 서버로 보낼 정답 여부를 저장하는 변수 선언
      let result = null;
      let no = this.questionIndex + 1;
      if (selectedAnswer === this.quizArray[this.questionIndex]) {
        result = "O";
      } else {
        result = "X";
      }
      this.correctAnswer = this.quizArray[this.questionIndex].correctAnswer;
      this.isQuizPage = false;
      this.$axios
          .post('http://localhost:8081/score', {
            no: no,
            result: result,
          })
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
  opacity: 0.4;
}


</style>