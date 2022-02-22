<template>
<div class="dashboard text-center">
  <div class="header pb-5 pt-2">
    <div class="container-fluid">
      <div class="header-body">
        <!-- Card stats -->
        <div class="row">
            <div class="col-6 col-md-6 p-2"
            :key="items"
            v-for="items in dashboard">
                <div class="card card-stats mb-3 mb-xl-0" :class="items.bgColor">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h3 class="card-title text-uppercase text-muted mb-0 text-white">
                      {{items.title}}
                    </h3>
                    <span class="counter font-weight-bold text-white">{{items.subtitle}}</span>
                  </div>
                  <div class="mx-auto">
                    <div
                      class="
                        icon icon-shape
                        bg-danger
                        text-white
                        rounded-circle
                        shadow
                      "
                    >
                      <span>
                          <i class="text-center" :class="items.icon"></i>
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            dashboard:[
                {
                    title:'Files',
                    subtitle:'2000',
                    bgColor: 'bg-primary',
                    icon:'fa fa-folder'
                },
                {
                    title:'Requests',
                    subtitle:'1995',
                    bgColor: 'bg-success',
                    icon:'fa fa-chalkboard-teacher'
                },
                {
                    title:'Clients',
                    subtitle:'2500',
                    bgColor: 'bg-danger',
                    icon:'fa fa-user-tie'
                },
                {
                    title:'Users',
                    subtitle:'1001',
                    bgColor: 'bg-info',
                    icon:'fa fa-users'
                }
            ]
        }
    }
}
</script>
<style scoped>
.dashboard h2,span,p,h5 {
    color: #fff;
}
.counter {
    font-size: 3rem;
}
.icon-center {
    text-align: center;
    width: 100%;
}
</style>
