<template>
  <v-container>
    <h1>Request Chart</h1>
    <report-charts :chartData="generateRequestReport" :options="options"></report-charts>
  </v-container>
</template>

<script>
import ReportCharts from "./ReportsChart.vue";
export default {
  components: { ReportCharts },
  data() {
      return {
          period:'weekly'
      }
  },
  computed:{
      generateRequestReport() {
          if(this.period === 'daily') {
            let request_reports = this.$store.state.requests.request_report
            let request_date = request_reports.map((item) => item.request_date)
            let request_total = request_reports.map((item) => item.request_total)

            let chartData = {
                labels:request_date,
                    datasets: [
                        {
                            label: "Request Documents",
                            backgroundColor: "#FFB74D",
                            data: request_total
                        },
                    ],
                }
                return chartData
          }else if(this.period === 'weekly') {

          let request_report = this.$store.state.requests.request_report_weekly
          let weekly = Object.keys(request_report)
          let weeklyTotal = []
            for(let i = 0; i<Object.values(request_report).length;i++) {
                weeklyTotal.push(Object.values(request_report)[i].length)
                
            }
            let chartData = {
                labels:weekly,
                    datasets: [
                        {
                            label: "Request Documents",
                            backgroundColor: "#FFB74D",
                            data: weeklyTotal
                        },
                    ],
                }
                return chartData
          }else {

          }
          

      },
      options() {
          return {
            responsive: true,
            maintainAspectRatio: false,
          }
      }
  },
};
</script>