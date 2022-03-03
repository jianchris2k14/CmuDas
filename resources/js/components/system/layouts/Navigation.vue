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
        </li>
      </ul>
      <!-- Collapse -->
      <div class="collapse navbar-collapse bg-dark" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a href="">
                <!-- <img src="./assets/img/brand/blue.png"> -->
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
        
        <ul class="navbar-nav ml-n11" v-if="auth.user.user_type === 'Admin' || auth.user.user_type === 'Staff'">
          <li class="nav-item"
          v-for="(item,i) in navigation.adminNavigation" :key="i">
            <router-link class="nav-link" :to="item.itemPath">
              <i :class="[item.itemIcon,item.itemIconColor]"></i> <span class="link">{{item.itemText}}</span>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-n11" v-if="auth.user.user_type === 'Client'">
          <li class="nav-item"
          v-for="(item,i) in navigation.clientNavigation" :key="i">
            <router-link class="nav-link" :to="item.itemPath">
              <i :class="[item.itemIcon,item.itemIconColor]"></i> <span class="link">{{item.itemText}}</span>
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
import logo from '../../../../../public/assets/img/brand/cmu.png'
import userlogo from '../../../../../public/assets/img/user.png'
import AccountSettings from './AccountSettings.vue'
export default {
  components: { AccountSettings },
    data() {
        return {
            logo:logo,
            userlogo:userlogo,
            navigation:{
              adminNavigation:[
                 {
                    itemText:'Dashboard',
                    itemIcon:'fa fa-tachometer-alt',
                    itemIconColor:'text-warning',
                    itemPath:'/system/dashboard'
                },
                {
                    itemText:'Files',
                    itemIcon:'fa fa-archive',
                    itemIconColor:'text-green',
                    itemPath:'/system/files'
                },
                {
                    itemText:'Requests',
                    itemIcon:'fa fa-chalkboard-teacher',
                    itemIconColor:'text-red',
                    itemPath:'/system/requests'
                },
                {
                    itemText:'Clients',
                    itemIcon:'fa fa-user-tie',
                    itemIconColor:'text-primary',
                    itemPath:'/system/clients'
                },
                {
                    itemText:'Users',
                    itemIcon:'fa fa-users',
                    itemIconColor:'text-white',
                    itemPath:'/system/user'
                }
              ],
              clientNavigation:[
                 {
                    itemText:'Dashboard',
                    itemIcon:'fa fa-tachometer-alt',
                    itemIconColor:'text-warning',
                    itemPath:'/system/client/dashboard'
                },
                {
                    itemText:'Requests',
                    itemIcon:'fa fa-chalkboard-teacher',
                    itemIconColor:'text-red',
                    itemPath:'/system/client/requests'
                },
                {
                    itemText:'Search',
                    itemIcon:'fa fa-search',
                    itemIconColor:'text-primary',
                    itemPath:'/system/client/clientsearch'
                },

              ]
            },
            /* navigation:[
                {
                    itemText:'Dashboard',
                    itemIcon:'fa fa-tachometer-alt',
                    itemIconColor:'text-warning',
                    itemPath:'/system/dashboard'
                },
                {
                    itemText:'Files',
                    itemIcon:'fa fa-archive',
                    itemIconColor:'text-green',
                    itemPath:'/system/files'
                },
                {
                    itemText:'Requests',
                    itemIcon:'fa fa-chalkboard-teacher',
                    itemIconColor:'text-red',
                    itemPath:'/system/requests'
                },
                {
                    itemText:'Clients',
                    itemIcon:'fa fa-user-tie',
                    itemIconColor:'text-primary',
                    itemPath:'/system/clients'
                },
                {
                    itemText:'Users',
                    itemIcon:'fa fa-users',
                    itemIconColor:'text-white',
                    itemPath:'/system/user'
                }
            ] */
        }
    },
    computed: {
      auth() {
        return this.$store.state.auth
      }
    },
}
</script>
<style scoped>
.link {
    color:#fff;
}
.nav-item {
  width:100%
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
