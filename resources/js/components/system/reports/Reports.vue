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
          <v-row class="mt-2">
            <v-col cols="12" md="6" sm="8">
              <v-select
                :items="items"
                v-model="period"
                @change="onChangeSelect"
                outlined
                dense
              >
              </v-select>
            </v-col>
          </v-row>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="i in 2" :key="i" :value="'mobile-tabs-5-' + i">
              <v-card flat v-if="i === 1">
                <request-chart
                  :chartData="generateRequestReport"
                  :options="options"
                />
              </v-card>
              <v-card flat v-if="i === 2">
                <reports-table :period="period" />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import RequestChart from "./RequestChart.vue";
import ReportsTable from "./ReportsTable.vue";
export default {
  components: { RequestChart, ReportsTable },
  data() {
    return {
      tabs: null,
      items: ["Daily", "Weekly", "Monthly"],
      period: "Daily",
    };
  },
  computed: {
    generateRequestReport() {
      if (this.period === "Daily") {
        let request_reports = this.$store.state.requests.request_report;
        let daily_date = request_reports.map((item) => item.date);
        let daily_total = request_reports.map((item) => item.total);
        let chartData = {
          labels: daily_date,
          datasets: [
            {
              label: "Request Documents",
              backgroundColor: "#FFB74D",
              data: daily_total,
            },
          ],
        };
        return chartData;
      } else if (this.period === "Weekly") {
        let request_report = this.$store.state.requests.request_report_weekly;
        let weekly_date = request_report.map((item) => item.date);
        let weekly_total = request_report.map((item) => item.total);
        let chartData = {
          labels: weekly_date,
          datasets: [
            {
              label: "Request Documents",
              backgroundColor: "#FFB74D",
              data: weekly_total,
            },
          ],
        };
        return chartData;
      } else {
        let request_report = this.$store.state.requests.request_report_monthly;
         let monthly_date = request_report.map((item) => item.date);
        let monthly_total = request_report.map((item) => item.total);
        let chartData = {
          labels: monthly_date,
          datasets: [
            {
              label: "Request Documents",
              backgroundColor: "#FFB74D",
              data: monthly_total,
            },
          ],
        };
        return chartData;
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
  methods: {
    onChangeSelect(e) {
      this.period = e;
    },
  },
  created() {
    this.$store.dispatch("getRequestReportsDaily");
    this.$store.dispatch("getRequestReportsWeekly");
    this.$store.dispatch("getRequestReportsMonthly");
  },
};
</script>
