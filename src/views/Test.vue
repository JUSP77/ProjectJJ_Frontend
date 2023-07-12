<template>
  <transition name="fade">
    <div class="container-sm w-50 p-3" v-if="showContent">
      <transition name="fade">
        <div class="row">
          <div class="row justify-content-center">
            <transition name="fade">
              <div class="col-xl-6 px-3 main1">
                <img src="./../assets/A.png" />
              </div>
            </transition>
            <transition name="fade">
              <div class="col-xl-6 px-3 main2">
                <img src="./../assets/B.png" />
              </div>
            </transition>
          </div>
          <div class="row">
            <div class="col">
              <br>
              <img src="../assets/nextButton.png" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
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