<template>
  <div class="container">
    <h1>Image Upload</h1>
    <div class="row">
      <div class="col">
        <label for="numberInput">번호 입력:</label>
        <input type="number" id="numberInput" v-model="no" ref="numberInputRef" />
      </div>
      <div class="col">
        <label>A, B 중 정답을 고르세요:</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answerOption" id="answerOptionA" value="A" v-model="correctAnswer" />
          <label class="form-check-label" for="answerOptionA">A 가 정답이다</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answerOption" id="answerOptionB" value="B" v-model="correctAnswer" />
          <label class="form-check-label" for="answerOptionB">B 가 정답이다</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="fileInputA">A:</label>
        <input type="file" id="fileInputA" @change="handleFileChange($event, 'A')" ref="fileInputARef" />
      </div>
      <div class="col">
        <label for="fileInputB">B:</label>
        <input type="file" id="fileInputB" @change="handleFileChange($event, 'B')" ref="fileInputBRef" />
      </div>
    </div>
    <div class="row">
      <label for="hintInput">힌트 입력:</label>
      <input type="text" id="hintInput" v-model="hint" ref="hintInputRef" />
    </div>
    <div class="row">
      <label for="hintInput">해설 입력:</label>
      <input type="text" id="explanationInput" v-model="explanation" ref="explanationInput" />
    </div>
    <div class="row">
      <button class="btn btn-primary" @click="uploadImage">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      no: null,
      correctAnswer: 'A',
      image: {
        A: null,
        B: null
      },
      hint: '',
      explanation: '',
      files: []
    }
  },
  methods: {
    handleFileChange(event, identifier) {
      this.image[identifier] = event.target.files[0];

    },
    uploadImage() {
      const formData = new FormData();
      formData.append('no', this.no);
      formData.append('correctAnswer', this.correctAnswer);
      formData.append('imageA', this.image['A']);
      formData.append('imageB', this.image['B']);
      formData.append('hint', this.hint);
      formData.append('explanation', this.explanation);

      this.$axios.post('http://localhost:8080/upload', formData)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>

</style>
