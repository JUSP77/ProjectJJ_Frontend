<template>
  <div class="container">
    <div class="row">
      <div v-if="!isDataLoaded" class="row justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="text-center">
          <div class="spinner-container">
            <div class="spinner-border spinner-custom" role="status"></div>
              <p class="spinner-font">결과 도출 중입니다.</p>
          </div>
        </div>
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