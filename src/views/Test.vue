<template>
  <div class="container">
    <div class="row">
      <div class="col-6 col-md-3">
        <img class="img-fluid" src="../assets/1_IMG_A.png" />
      </div>
      <div class="col-6 col-md-3">
        <!-- 컬럼 2의 내용 -->
        <img class="img-fluid" src="../assets/1_IMG_B.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      showContent: null,
    };
  },
  mounted() {
    this.showContent = true;
  },
};
</script>

<style scoped>
.container {
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>