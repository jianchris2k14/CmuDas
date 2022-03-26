<template>
  <div class="mt-15">
    <div class="container shadow p-3 mb-5 bg-white">
      <div class="row">
        <h1><i class="fa fa-chart-bar"></i> Reports</h1>

        <v-card>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs v-model="tabs">
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#mobile-tabs-5-1" class="primary--text">
                  <v-icon>mdi-chart-bar </v-icon> Requests Reports Chart
                </v-tab>

                <v-tab href="#mobile-tabs-5-2" class="primary--text">
                  <v-icon>mdi-table </v-icon> Requests Reports Table
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="i in 2" :key="i" :value="'mobile-tabs-5-' + i">
              <v-card flat v-if="i === 1">

                  <request-chart/>

              </v-card>
              <v-card flat v-if="i === 2">

                  <reports-table/>

              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import RequestChart from './RequestChart.vue'
import ReportsTable from './ReportsTable.vue'
export default {
  components:{RequestChart,ReportsTable},
  data() {
      return {
          tabs:null
      }
  },
  created() {
    this.$store.dispatch('getRequestReportsDaily')
    this.$store.dispatch('getRequestReportsWeekly')
  }
};
</script>
