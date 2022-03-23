<template>
  <div class="mt-15">
    <div class="container shadow p-3 mb-5 bg-white">
      <div class="row">
        <h1><i class="fa fa-archive"></i> Archive Documents</h1>
        <archive-table/>
      </div>
    </div>
  </div>
</template>
<script>
import ArchiveTable from './ArchiveTable.vue'
export default {
  components:{
    ArchiveTable
  },
  data() {
      return {
          tabs:null
      }
  },
  created() {
    this.$store.dispatch("getFileList")
    this.$store.dispatch("getFileLocations")
  }
};
</script>
