<template>
    <div class="section features-6 content-bg-green about-content">
        <h3 class="display-3 text-center">About Us</h3>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="info-horizontal">
              <div class="description content-bg-green pl-4 text-white p-3" data-aos="zoom-in-right">
                <p class="p-about">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."<br><br>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-10 mx-md-auto" data-aos="zoom-in-left">
            <div class="row">
              <div class="col-md-12 content-bg-yellow">
                 <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."<br><br></p>
              </div>
              
              <div class="col-md-12 content-bg-yellow mt-5">
                 <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."<br><br></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import about from '../../../../../public/assets/img/about2.png'
export default {
    data() {
        return {
            about:about
        }
    }
}
</script>
<style scoped>
.p-about {
  text-indent: 50px;
   line-height: 2;
}
.about-content {
  height: 100%;
}
.content-bg-green {
    background-color: #1e8133;
}
.content-bg-yellow {
    background-color: #fecf14;
}

</style>
