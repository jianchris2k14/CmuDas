<template>
    <div>
    <section class="section section-shaped login-content">
    <div class="container pt-lg-7 pb-lg-7">
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-secondary shadow border-0">
            <div class="card-body px-lg-5 py-lg-5">
                <h5 class="display-4 text-center text-uppercase">Get in touch</h5>
              <form role="form">
                <div class="form-group mb-3">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email">
                  </div>
                </div>
                <div class="form-group focused">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="Password" type="password">
                  </div>
                </div>
                <div class="custom-control custom-control-alternative custom-checkbox">
                  <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                  <label class="custom-control-label" for=" customCheckLogin"><span>Remember me</span></label>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-sign-in my-4">Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-6">
            <register/>
        </div>
      </div>
    </div>
  </section>
    </div>
</template>
<script>
import Register from './Register.vue'
export default {
  components: { Register },

}
</script>
<style scoped>
.login-content {
    background-color: #fecf14;
    padding: 5px;
}
.btn-sign-in {
    background: #1e8133;
    color:#fecf14;
}
</style>
