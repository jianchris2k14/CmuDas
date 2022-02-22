<template>
    <!-- Navbar -->
  <nav id="navbar-main" class="navbar fixed-top navbar-expand-lg navbar-dark navbg py-2" :class="{scrolled: scrollPosition > 400}">
    <div class="container">
      <a class="navbar-brand mr-lg-5" href="">
        <img :src="logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbar_global">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a href="">
                <img :src="logo">
              </a>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav navbar-nav-hover align-items-lg-center"
        v-scroll-spy-active="{class:'active'}" v-scroll-spy-link>
          <li class="nav-item"
          :key="items"
          v-for="items in navLink">
            <a class="nav-link" role="button">
              <i class="ni ni-collection d-lg-none"></i>
              <span class="nav-link-inner--text">{{items}}</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav align-items-lg-center ml-lg-auto" v-if="isLogin">
          <li class="nav-item dropdown">
                <a class="nav-link nav-link-icon dropdown-toggle" href="javascript:;" id="navbar-default_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user"></i>
                  Geiizanityy@gmail.com
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
                  <router-link to="/client/dashboard" class="dropdown-item">
                      <i class="fa fa-tachometer-alt"></i> Dashboard
                    </router-link>
                  <a class="dropdown-item" href="javascript:;">
                      <i class="fa fa-sign-out-alt"></i> Logout</a>
                  <div class="dropdown-divider"></div>
                </div>
              </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
<script>
import logo from '../../../../../public/assets/img/brand/cmu.png'
export default {
    data() {
        return {
            logo:logo,
            scrollPosition:null,
            scrolled:false,
            isLogin:true,
            navLink:[
                'Home',
                'About',
                'Search',
                'Contact',
                'Signin'
            ],
        }
    },
  methods: {
      //Update Navigation when scroll
    updateScroll() {
      this.scrollPosition = window.scrollY
      if(window.scrollY > 700) {
        this.scrolled = true
      }
    },
    //Filter Navigation if isLoggedIn
    filterNav() {
        if(this.isLogin) {
            this.navLink.splice(this.navLink.indexOf("Signin"))
        }
    }
  },
    mounted() {
    window.addEventListener('scroll',this.updateScroll)
    this.filterNav()
  }
}
</script>
<style scoped>
  .navbg {
      background: transparent !important;
  }
  .navbg.scrolled {
      background-color: #1e8133 !important;
      transition: ease-in-out 0.6s;
  }
  </style>
