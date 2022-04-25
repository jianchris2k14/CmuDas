<template>
  <div class="mt-15">
    <div class="container shadow p-3 mb-5 bg-white">
      <v-row>
        <v-col cols="12" md="6" sm="8">
          <dashboard-top-content />
        </v-col>
        <v-col cols="12" md="6" sm="8">
          <request-reports-table :period="period" :data="fetchRequestReports"/>
        </v-col>
        
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="8">
          <request-reports-chart :chartData="requestReport" :options="options"/>
        </v-col>
        <v-col cols="12" md="6" sm="8">
          <upload-chart :chartData="uploadReport" :options="options"/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import DashboardTopContent from "./DashboardTopContent.vue";
import RequestReportsChart from './../reports/RequestChart.vue'
import RequestReportsTable from './../reports/ReportsTable.vue'
import UploadChart from './../reports/UploadChart.vue'
export default {
  components: {
    DashboardTopContent,
    RequestReportsChart,
    RequestReportsTable,
    UploadChart
  },
  data() {
    return {
      period:'Daily'
    }
  },
  computed:{
    fetchRequestReports() {
      return this.$store.state.requests.request_report
    },
    fetchUploadReports() {
      return this.$store.state.files.upload_reports_monthly
    },
    requestReport() {
      return this.requestReportChart()
    },
    uploadReport() {
      return this.uploadReportChart()
    },
       //CHART OPTIONS
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Reports",
        },
      };
    },

  },

  methods:{
    requestReportChart() {
      let request_reports = this.fetchRequestReports
      let daily_date = request_reports.map((item) => item.date);
        let daily_total = request_reports.map((item) => item.total);
        let chartData = {
          labels: daily_date,
          datasets: [
            {
              label: "Upload Documents",
              backgroundColor: "#FFB74D",
              data: daily_total,
            },
          ],
        };
        return chartData
      },
      uploadReportChart() {
      
      let request_reports = this.fetchUploadReports;
        let daily_date = request_reports.map((item) => item.date);
        let daily_total = request_reports.map((item) => item.total);
        let chartData = {
        labels: daily_date,
        datasets: [
          {
            label: "Upload Documents",
            backgroundColor: ["#FFB74D",'#F44336','#9C27B0','#3F51B5','#009688','#8BC34A','#795548','#FF8A80','#4A148C','#004D40','#9E9E9E','#B3E5FC'],
            data: daily_total,
          },
        ],
      };
      return chartData;
      
    },
  },
  created() {
    this.$store.dispatch("getFileList")
    this.$store.dispatch("getRequests")
    this.$store.dispatch("getFileLocations")
    this.$store.dispatch("getRequestReportsDaily")
    this.$store.dispatch("getUploadReportsMonthly")
  },
};
</script>
<style scoped>
.content {
  background: #fff;
}
</style>

