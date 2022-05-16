<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="16" md="12">

        <v-card>
            <v-row>
          <v-col cols="12" sm="16" id="buttons">
            <v-btn-toggle v-model="icon" borderless>
              <v-btn value="left" color="error" small @click="downloadRequestReportPDF('requestreports')">
                <v-icon class="text-white"> mdi-file-pdf-box </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
          <v-data-table
            :headers="headers"
            :items="data"
            dense
            class="elevation-1 table-striped"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{table_title}}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card v-show="report == 'request_reports'">
            <v-row>
          <v-col cols="12" sm="16" id="buttons">
            <v-btn-toggle v-model="icon" borderless id="button">
              <v-btn value="left" color="error" small @click="downloadRequestReportPDF('filerequestreport')">
                <v-icon class="text-white"> mdi-file-pdf-box </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  props: ["period", "data", "filerequestreports","report"],
  data() {
    return {
        table_title:"",
        icon:"justify",
      //TABLE HEADERS PROPERTIES REQUEST REPORTS
      headers: [],
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
  methods: {
    downloadRequestReportPDF(type) {
      var request
      var head = []
      var reports = []
      var name
      if(type === 'requestreports') {
          request = this.data
          if(this.report === 'upload_reports ') {
              request.map(function (item) {
                reports.push([
                    item.total_uploaded,
                    item.total_dispose,
                    item.total_archive
                ]);
            });
             head = [
                [
                    "Date",
                    "Total of Requests"
                ]
            ]
          }else {
              request.map(function (item) {
                reports.push([
                    item.total_uploaded,
                    item.total_dispose,
                    item.total_archive
                ]);
            });
             head = [
                [
                    "Date",
                    "Total Archived",
                    "Total Disposed",
                    "Total Uploaded"
                ]
            ]
          }


      }else {
          request = this.filerequestreports
           request.map(function (item) {
                reports.push([
                    item.category,
                    item.filename,
                    item.totalrequests,
                ]);
            });
            head = [
                [
                    "File Name",
                    "Category",
                    "Total of Requests"
                ]
            ]
      }

      var sorted = reports.sort(function (a, b) {
        if (a[1] === b[1]) {
          return 0;
        } else {
          return a[1] < b[1] ? -1 : 1;
        }
      });

      var doc = new jsPDF("p", "mm", "a4")
       doc.setFontSize(20)
  doc.setTextColor(100)
  var pageSize = doc.internal.pageSize
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
  var text = doc.splitTextToSize("Central Midanao University", pageWidth - 35, {})
  doc.text(text, 14, 50)
      doc.autoTable({
        head: head,
        body: sorted,
        theme: "grid",
        tableWidth: 180,
        margin: { horizontal: 10 },
        styles: {
          overflow: "linebreak",
          backg: 0.5,
        },
        bodyStyles: { valign: "top" },
      });
      doc.setFontSize(18)
      doc.text('Digital Archiving System', 0, 10)
      doc.text(text, 14, doc.lastAutoTable.finalY + 10)
      doc.save(type);
    },
  },
  created() {
      if(this.report === 'request_reports') {
          this.table_title = 'Request Reports'
          this.headers.push({
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
        })
      }else {
           this.table_title = 'Upload Document Reports'
           this.headers.push({
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
          class: "info text-black",
        },
         {
          text: "Total Uploaded",
          value: "total_uploaded",
          class: "info text-black",
        },
        {
          text: "Total Archived",
          value: "total_archive",
          class: "info text-black",
        },
        {
          text: "Total Disposed",
          value: "total_dispose",
          class: "info text-black",
        },)
      }
  }
};
</script>
