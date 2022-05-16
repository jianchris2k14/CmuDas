<template>
  <div>
    <!-- REQUEST REPORT CHART TAB -->
    <v-row class="mt-2">
      <v-col cols="12" md="6" sm="8">
        <v-select
          :items="selection"
          v-model="selectionDefault"
          @change="onChangeSelection"
          outlined
          dense
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="6" sm="8">
        <div v-if="documentid === 'requestreports'">
          <v-select
            :items="items"
            v-model="period"
            @change="onChangePeriod"
            outlined
            dense
          >
          </v-select>
        </div>

        <div v-else>
          <v-select
            :items="uploadperioditems"
            v-model="uploadperiod"
            @change="onChangePeriodUploads"
            outlined
            dense
          >
          </v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="16" id="buttons">
        <v-btn-toggle v-model="icon" borderless>
          <v-btn value="left" color="info" small @click="printRequestReport">
            <v-icon class="text-white"> mdi-printer </v-icon>
          </v-btn>

          <v-btn
            value="center"
            color="success"
            small
            @click="downloadChartImage"
          >
            <v-icon class="text-white"> mdi-image </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  props: ["documentid","reportsdata"],
  computed: {
    getDocumentId() {
      let doc_id = this.documentid;
      if (doc_id === "requestreports") {
        return "#generaterequestreports";
      } else {
        return "#generateuploadreports";
      }
    },
  },
  data() {
    return {
      items: ["Daily", "Weekly", "Monthly"],
      period: "Daily",

      uploadperioditems: ["Monthly", "Yearly"],
      uploadperiod: "Monthly",

      selection: ["Chart", "Table", "Chart And Table"],
      selectionDefault: "Chart",
      icon: "justify",
    };
  },
  methods: {
    onChangePeriod(e) {
      this.period = e;
      this.$emit("selectperiod", e);
    },
    onChangePeriodUploads(e) {
      this.uploadperiod = e;
      this.$emit("selectperiod", e);
    },
    onChangeSelection(e) {
      this.selectionDefault = e;
      this.$emit("selection", e);
    },

    downloadChartImage() {
      const content = document.querySelector(this.getDocumentId);
      html2canvas(content, {
        scale: 0.8,
        backgroundColor: "#ffffff",
        useCORS: false,
      })
        .then((canvas) => {
          canvas.style.display = "none";
          canvas.getContext("2d");
          document.body.appendChild(canvas);
          return canvas;
        })
        .then((canvas) => {
          const image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          const a = document.createElement("a");
          a.setAttribute("download", "requestreports.png");
          a.setAttribute("href", image);
          a.click();
          canvas.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    printRequestReport() {


      let buttons = document.getElementById("buttons")
      buttons.style.visibility = "hidden"
      let options = document.getElementById("options")
      options.style.visibility = "hidden"
      const content = document.querySelector(this.getDocumentId);

      html2canvas(content, {
        scale: 0.8,
        backgroundColor: "#ffffff",
        useCORS: false,
      })
        .then((canvas) => {
          canvas.style.display = "none";
          canvas.getContext("2d");
          document.body.appendChild(canvas);
          return canvas;
        })
        .then((canvas) => {
          let width = screen.width;
          const image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          var windowContent = "<!DOCTYPE html>";
          windowContent += "<html>";
          windowContent += "<head><title>Print Request Report</title>";
          windowContent +=
            '<link href="http://localhost:8000/css/app.css" rel="stylesheet"></head>';
          windowContent += "<body>";
          windowContent +=
            "<h1> CENTRAL MINDANAO DIGITAL ARCHVING SYSTEM REPORTS</h1>";
          windowContent += '<img src="' + image + '">';
          windowContent += "</body>";
          windowContent += "</html>";
          var printWin = window.open("", "", "width=" + width + ",height=900");
          printWin.document.open();
          printWin.document.write(windowContent);
          printWin.document.close();
          printWin.focus();
          printWin.print();
          buttons.style.visibility = "visible"
          options.style.visibility = "visible"

           canvas.remove()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
<style scoped>
@media print {
  .hidden-print {
    display: none !important;
  }
}
</style>
