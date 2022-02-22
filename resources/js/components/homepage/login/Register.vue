<template>
    <div class="card bg-secondary shadow border-0">

              <div class="card-body px-lg-5 py-lg-5">
                  <h5 class="display-4 text-center text-uppercase">Create Account</h5>
                <form role="form">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                      </div>
                      <input class="form-control" placeholder="Name" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                      </div>
                      <input class="form-control" placeholder="Email" type="email">
                    </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                            <div class="input-group input-group-alternative mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                            </div>
                            <input class="form-control" placeholder="Address">
                            </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                                <div class="input-group input-group-alternative mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                </div>
                                <input class="form-control" placeholder="Contact No.">
                                </div>
                            </div>
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
                  <div class="form-group focused">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input class="form-control" placeholder="Re-enter password" type="password">
                    </div>
                  </div>
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input class="custom-control-input" id="customCheckRegister" type="checkbox">
                        <label class="custom-control-label" for="customCheckRegister"><span>I agree with the <a href="#">Privacy Policy</a></span></label>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn btn-sign-up mt-4">Create account</button>
                  </div>
                </form>
              </div>
            </div>
</template>
<style scoped>
.btn-sign-up {
    background: #1e8133;
    color:#fecf14;
}
</style>

