<template>
  <div class="container">
    <div>
      <div class="row g-5">
        <div class="col-md-7 col-lg-8">
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">아이디</label>
                <input type="text" class="form-control" v-model="state.form.id">
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
            </div>
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">비밀번호</label>
                <input type="password" class="form-control" v-model="state.form.password">
                <div class="invalid-feedback">
                </div>
              </div>
            </div>

            <hr class="my-4">

            <button class="w-100 btn btn-primary btn-lg" @click="submit()">Continue to checkout</button>
          </form>
        </div>
      </div>
    </div>

  </div>


</template>

<style>

</style>

<script>
import {reactive} from "vue";

export default {
  setup() {
    const state = reactive({
      form: {
        id: "",
        password: ""
      }
    })

    const submit = () => {

      this.$axios.post("https://projectjj.shop/rest/member/register",
          {
            id: this.form.id,
            password: this.form.password
          }).then((res) => {
        console.log(res);
        window.alert("회원가입 완료")
      })

    }
    return {state, submit}
  }

}

</script>