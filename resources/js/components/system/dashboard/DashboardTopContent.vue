<template>
  <div class="dashboard text-center">
    <div class="header pb-5 pt-2">
      <div class="container-fluid">
        <div class="header-body">
          <!-- Card stats -->
          <div class="row">
            <div
              class="col-6 col-md-6 p-2"
              v-for="(items, i) in totalDashboard"
              :key="i"
            >
              <div class="card card-stats mb-3 mb-xl-0" :class="items.bgColor">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h3
                        class="
                          card-title
                          text-uppercase text-muted
                          mb-0
                          text-white
                        "
                      >
                        {{ items.title }}
                      </h3>
                      <span class="counter font-weight-bold text-white">{{
                        items.subtitle
                      }}</span>
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
      dashboard:null,
      user_type:localStorage.getItem("user_type"),
      totalDocs:null,

    };
  },
  computed:{
    auth() {
      return this.$store.state.auth.user
    },
    totalDashboard() {
      let data = []
        return data = [
          {
            title: "Archive",
            subtitle: this.$store.getters.totalArchiveDocuments,
            bgColor: "bg-warning",
            icon: "fa fa-archive",
          },
          {
            title: "Documents",
            subtitle: this.$store.getters.totalDocuments,
            bgColor: "bg-success",
            icon: "fa fa-folder",
          },
          {
             title: "Pending Requests",
            subtitle: this.$store.getters.totalPendingApprovedRequest,
            bgColor: "bg-info",
            icon: "fa fa-table",
          },
          {
            title: "Approved Requests",
            subtitle: this.$store.getters.totalApprovedRequest,
            bgColor: "bg-primary",
            icon: "fa fa-thumbs-up",
          },
          {
            title: "Denied Requests",
            subtitle: this.$store.getters.totalDeniedRequest,
            bgColor: "bg-primary",
            icon: "fa fa-thumbs-down",
          },
          {
            title: "Expired Requests",
            subtitle: this.$store.getters.totalExpiredRequest,
            bgColor: "bg-default",
            icon: "fa fa-hourglass-end",
          }


        ]
      
    },
    fetchRequests() {
      const files = this.$store.getters.getPendingRequests
      return this._.orderBy(files, ["created_at"], ["desc"]);
    },
  },
  watch:{
    totalDashboard:function() {
      
    }
  },
   
  
};
</script>
<style scoped>
.dashboard h2,
span,
p,
h5 {
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
