<template>
  <v-container>
    <h5>Request Chart</h5>
    <report-charts :chartData="chartData" :options="options"></report-charts>

  </v-container>
</template>

<script>
import ReportCharts from "./ReportsChart.vue";
export default {
  components: { ReportCharts },
  props:['chartData','options'],
 
};
</script>