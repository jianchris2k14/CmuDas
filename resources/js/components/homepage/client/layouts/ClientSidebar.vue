<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-dark" id="sidenav-main">
    <div class="container-fluid">
      <!-- Toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <a class="navbar-brand pt-0" href="#">
        <img :src="logo" class="navbar-brand-img logo" alt="...">
      </a>
      <!-- User -->
      <ul class="nav align-items-center d-md-none">
        <li class="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" :src="userlogo">
              </span>
            </div>
          </a>

            <!-- Account settings component -->

        </li>
      </ul>
      <!-- Collapse -->
      <div class="collapse navbar-collapse bg-dark" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a href="">
                <img :src="logo" class="navbar-brand-img logo" alt="...">
              </a>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item"
          v-for="items in navigation"
          :key="items.id">
            <router-link class="nav-link" :to="items.itemPath">
              <i :class="[items.itemIcon,items.itemIconColor]"></i> <span class="link">{{items.itemText}}</span>
            </router-link>
          </li>
        </ul>
        <!-- Divider -->
        <hr class="my-3">
        <!-- Navigation -->
      </div>
    </div>
  </nav>
</template>
<script>
import logo from '../../../../../../public/assets/img/brand/cmu.png'
import userlogo from '../../../../../../public/assets/img/user.png'

import AccountSettings from './AccountSettings.vue'
export default {
  components: { AccountSettings },
    data() {
        return {
            logo:logo,
            userlogo:userlogo,
            navigation:[
                {
                    itemText:'Home',
                    itemIcon:'fa fa-home',
                    itemIconColor:'text-warning',
                    itemPath:'/client/dashboard'
                },
                {
                    itemText:'Search Files',
                    itemIcon:'fa fa-folder',
                    itemIconColor:'text-red',
                    itemPath:'/client/clientsearch'
                },
                {
                    itemText:'Request',
                    itemIcon:'fa fa-table',
                    itemIconColor:'text-white',
                    itemPath:'/client/requests'
                }
            ]
        }
    }
}
</script>
<style scoped>
.link {
    color:#fff;
}
.nav-item:hover {
    background:#fcf825;
    color:#000;
    transition:0.6s ease-in-out;
}
.active {
    background:#fcf825;

}
.active span {
    color :#000;
}
.active li {
    cursor: not-allowed !important;
}
</style>
