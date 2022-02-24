<template>
  <div>
    <div class="section section-hero section-shaped">
      <v-parallax height="700" class="mt-n16" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <div class="page-header">
          <div class="container shape-container align-items-center py-lg">
            <div class="row">
              <div class="col-lg-12 text-center">
                <div
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <h1 class="display-1 title">Central Mindanao</h1>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <h1 class="display-4 subtitle">University</h1>
                </div>
                <div data-aos="fade-up" data-aos-duration="3000">
                  <h2
                    class="
                      display-5
                      font-weight-normal
                      text-white
                      animate__animated animate__fadeIn
                    "
                  >
                    Digital Archiving system
                  </h2>
                  <div class="btn-wrapper mt-4">
                    <a href="" class="btn btn-bg-yellow btn-icon mt--4 mb-sm-0">
                      <span class="btn-inner--icon"
                        ><i class="fas fa-search"></i
                      ></span>
                      <span class="btn-inner--text">Search</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-parallax>

      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
  </div>
</template>
<style scoped>
.home {
  background-image: url("../../../../../public/assets/img/banner2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.btn-bg-green {
  background-color: #1e8133;
}
.btn-bg-yellow {
  background-color: #fecf14;
}
.bg-green {
  background: linear-gradient(150deg, #2dce89 15%, #4be471 70%, #1eda3d 94%);
  opacity: 0.3;
}
.bg-yellow {
  background: linear-gradient(150deg, #d4eb0d 15%, #ddbd0a 70%, #ddc409 94%);
  opacity: 0.3;
}
.title {
  color: #fecf14;
  font-family: Open Sans, sans-serif;
  text-transform: uppercase;
  font-size: 3.5rem;
  font-weight: bold;
  -webkit-text-stroke: 2px #1e8133;
  -webkit-text-fill-color: #fecf14;
}
.subtitle {
  font-family: Open Sans, sans-serif;
  color: #1e8133;
  text-transform: uppercase;
  font-size: 6rem;
  font-weight: bold;
  -webkit-text-stroke: 2px #fecf14;
  -webkit-text-fill-color: #1e8133;
}
.office-img {
  width: 450px;
  height: 250px;
}
</style>
<script>
import office from "../../../../../public/assets/img/office/office.png";
export default {
  data() {
    return {
      officeicon: office,
    };
  },
};
</script>

