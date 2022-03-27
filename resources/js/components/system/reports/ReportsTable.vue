<template>
  <div class="container">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="fetchRequestReport"
        :search="search"
        class="elevation-1 table-striped"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Request Reports Table</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import AlertComponent from "./../../AlertComponent.vue";
export default {
  components: { AlertComponent },
  props: ['period'],
  data() {
    return {
      //TABLE SEARCH PROPERTY
      search: "",

      //Dialog Property
      dialog: false,
      dialogDelete: false,

      //Password Property
      showpassForm: false,
      showpass: false,
      showconfirmpass: false,

      //NOTIFY PROPERTIES
      error: "",
      msgStatus: false,
      load: false,

      //TABLE HEADERS PROPERTIES
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
          class: "info text-black",
        },
        {
          text: "Total of Requests",
          value: "total",
          class: "info text-black",
        },
      ],

      //USERS PROPERTIES
      users: [],
      selectedUser: null,
      editedIndex: -1,
      usertype: ["Chief", "Staff"],
    };
  },
  computed: {
    //FETCH USER FROM STATE MANANGEMENT COMPUTED
    fetchRequestReport() {
      switch(this.period) {
        case 'Daily':
          return this.$store.state.requests.request_report
          break;
          case 'Weekly':
            return this.$store.state.requests.request_report_weekly
            break;
            case 'Monthly':
              return this.$store.state.requests.request_report_monthly
              break;
      }
    },
    generateWeekly() {
      let request_report = this.$store.state.requests.request_report_weekly;
      let weekly = Object.keys(request_report);
      let temp = [];
      //console.log(Object.values(request_report))
      for (let i = 0; i < Object.values(request_report).length; i++) {
        temp.push(Object.values(request_report)[i].length);
      }

      return temp + weekly;
    },

    //ISLOADING COMPUTED
    isLoading: {
      get: function () {
        return this.$store.state.base.isLoading;
      },
      set: function (newVal) {
        return newVal;
      },
    },
  },

  watch: {
    // LOADING
    isLoading(val) {
      val || this.close();
    },
  },

  methods: {},
};
</script>
