<template>
  <div class="mt-15">
    <div class="container shadow p-3 mb-5 bg-white">
      <div class="row">
        <h1><i class="fa fa-folder"></i> Files</h1>
        <v-card>
          <v-toolbar flat>

            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs v-model="tabs">
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#mobile-tabs-5-1" class="primary--text">
                  <v-icon>mdi-folder </v-icon> Documents
                </v-tab>

                <v-tab href="#mobile-tabs-5-2" class="primary--text">
                  <v-icon>mdi-file-cabinet </v-icon> File Locations
                </v-tab>

              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="i in 2" :key="i" :value="'mobile-tabs-5-' + i">
              <v-card flat v-if="i === 1">
                  <file-table />
              </v-card>
              <v-card flat v-if="i === 2">
                  <file-location-table/>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        
      </div>
    </div>
  </div>
</template>

<script>
import FileTable from "./FilesTable.vue";
import FileLocationTable from "./FileLocationTable.vue"
export default {
  components: { FileTable,FileLocationTable },
  data() {
      return {
          tabs:null,
      }
  },
  created() {
    this.$store.dispatch("getFileList")
    this.$store.dispatch("getFileLocations")
  }
};
</script>
