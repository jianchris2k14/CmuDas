<template>
  <div class="container">
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
  </div>
</template>
<script>
export default {
  props: ['period','data'],
  data() {
    return {

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
}
</script>
