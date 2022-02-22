<template>
     <div class="section section-hero section-shaped">
         <h3 class="display-3 text-center">Search Files</h3>
      <div class="shape shape-style-3 search">
      </div>
      <div class="page-header">
        <div class="container shape-container align-items-center py-lg">
            <div class="row">
                <div class="col-md-8" data-aos="zoom-in-right">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control form-control-lg" placeholder="Search Files" aria-label="Search Files" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-success" type="button">Search</button>
                        </div>
                    </div>
                    <div class="container mt--20">
                        <img :src="officeicon" class="office-img">
                    </div>
                </div>
                <div class="col-md-4" data-aos="zoom-in-left">
                    <div class="row justify-content-center">
                        <div class="icon icon-lg icon-shape content-bg-green text-white shadow rounded-circle">
                                <i class="fa fa-search"></i>
                        </div>
                        <div class="icon icon-lg icon-shape bg-primary text-white shadow rounded-circle">
                                <i class="fa fa-folder"></i>
                        </div>
                        <div class="info text-center">
                            <h6 class="info-title text-uppercase text-white">Search Archive Files</h6>
                            <p class="description opacity-8 text-black">We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
</template>
<script>
import office from '../../../../../public/assets/img/office/office.png'
export default {
    data() {
        return {
            officeicon:office
        }
    }
}
</script>
<style scoped>
.office-img {
    width: 570px;
    height: 300px;
}
.search {
    background-color: #fecf14;
}
.content-bg-green {
    background-color: #1e8133;
}
.content-bg-yellow {
    background-color: #fecf14;
}
</style>
