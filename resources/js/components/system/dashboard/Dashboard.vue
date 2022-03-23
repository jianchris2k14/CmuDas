<template>
  <div class="mt-15">
    <div class="container shadow p-3 mb-5 bg-white">
      <div class="row">
        <dashboard-top-content />
      </div>
    </div>
  </div>
</template>
<script>
import DashboardTopContent from "./DashboardTopContent.vue";
export default {
  components: {
    DashboardTopContent,
  },
  created() {
    this.$store.dispatch("getFileList")
    this.$store.dispatch("getRequests")
    this.$store.dispatch("getFileLocations")
  },
};
</script>
<style scoped>
.content {
  background: #fff;
}
</style>

