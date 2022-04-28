<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="16" md="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="data"
            dense
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
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="fileRequestReportsTableHeader"
            :items="filerequestreports"
            dense
            class="elevation-1 table-striped"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>File Requests Reports Table</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["period", "data", "filerequestreports"],
  data() {
    return {
      //TABLE HEADERS PROPERTIES REQUEST REPORTS
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
      //TABLE HEADERS PROPERTIES REQUEST REPORTS
      fileRequestReportsTableHeader: [
        {
          text: "Filename",
          align: "start",
          sortable: true,
          value: "filename",
          class: "info text-black",
        },
        {
          text: "Category",
          value: "category",
          class: "info text-black",
        },
        {
          text: "Total of Requests",
          value: "totalrequests",
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
};
</script>
