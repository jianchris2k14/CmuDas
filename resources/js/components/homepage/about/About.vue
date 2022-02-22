<template>
    <div class="section features-6">
        <h3 class="display-3 text-center">About Us</h3>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="info info-horizontal info-hover-primary">
              <div class="description content-bg-green pl-4 text-white p-3" data-aos="zoom-in-right">
                <h5 class="title text-white text-center">Mandate</h5>
                <p>Section 2 of Republic Act No. 4498 mandates that Central Mindanao University “shall provide programs of instruction at all levels in the arts, sciences, technical, professional, educational, and philosophical fields, and shall concern itself with “pure” and “applied” research in all branches of knowledge for the intellectual and professional growth of faculty members, for the advance instruction of students, and for increasing knowledge and understanding.”</p>
              </div>
            </div>
            <div class="info info-horizontal info-hover-primary mt-3">
              <div class="description content-bg-yellow pl-4 p-3" data-aos="zoom-in-right">
                <h5 class="title text-center">Vision</h5>
                <p>A leading ASEAN university actively committed to the total development of people for a globally sustainable environment and a humane society</p>
                <a href="#" class="text-info">Learn more</a>
              </div>
            </div>
            <div class="info info-horizontal info-hover-primary mt-3">
              <div class="description content-bg-green pl-4 text-white p-3" data-aos="zoom-in-right">
                <h5 class="title text-white text-center">Mission</h5>
                <p>To advance the frontier of knowledge through internationalization of education and equitable access to quality instruction, research, extension and production for economic prosperity, moral integrity, social and cultural sensitivity and environmental consciousness.</p>
                <a href="#" class="text-info">Learn more</a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-10 mx-md-auto" data-aos="zoom-in-left">
            <img class="ml-lg-5" :src="about" width="100%">
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
.content-bg-green {
    background-color: #1e8133;
}
.content-bg-yellow {
    background-color: #fecf14;
}

</style>
