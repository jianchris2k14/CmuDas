<template>
  <div class="container">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-alert text dense color="teal" icon="mdi-information" border="left">
            Note: Enter the exact filename
          </v-alert>
          <v-col cols="12" md="6" sm="8">
            <v-text-field
            v-model="search"
            label="Search File Name"
            prepend-inner-icon="mdi-magnify"
            dense
          ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" sm="8">
            <select-file-category @selectcategory="getCategory"></select-file-category>
          </v-col>
          
        </v-row>
      </v-col>
    </v-row>

    <!-- SEARCH NOTIFACTION -->
    <v-alert v-show="showMsg" outlined type="warning" prominent border="left">
      Filename {{ this.search }} {{ this.msg }}
    </v-alert>
    <!-- Alert Message -->
    <div v-if="msgStatus">
      <alert-component />
    </div>
       <!-- DOCUMENTS LIST -->
    <div>
      <v-row class="ma-2">
        <v-col
          md="4"
          class="pa-3 d-flex flex-column"
          v-for="(items, index) in pageOfItems"
          :key="index.file_id"
        >
          <v-card class="elevation-5 flex d-flex flex-column">
            <v-card-text class="flex">
              <v-img
              class="white--text align-end"
              height="400px"
              :src="folderSvg"
            >
              <v-card-title class="text-black text-h4">{{
                items.filename
              }}</v-card-title>
              <v-card-title class="text-black text-h4">{{
                items.category
              }}</v-card-title>
            </v-img>
            </v-card-text>
            

            <v-card-text class="flex">
              <div class="body-1">{{ items.description }}</div>
            </v-card-text>
            <v-card-subtitle
              >Uploaded:
              {{
                new Date(items.created_at).toLocaleDateString()
              }}</v-card-subtitle
            >

            <v-card-actions>
              <v-col cols="auto">
                <!-- REQUEST FORM MODAL -->
                <v-dialog
                  transition="dialog-top-transition"
                  max-width="600"
                  v-model="formDialog"
                  :retain-focus="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="getItem(items)"
                      >Request Document</v-btn
                    >
                  </template>
                  <template>
                    <v-card>
                      <v-toolbar color="primary" dark>Request File</v-toolbar>
                      <v-container>
                        <!-- REQUEST FORM -->
                        <v-form ref="form" @submit.prevent="save">
                          <v-text-field
                            v-model="form.file_name"
                            prepend-icon="mdi-file"
                            label="File Name"
                            dense
                            disabled
                            outlined
                          >
                          </v-text-field>
                          <v-textarea
                            v-model="form.description"
                            :rules="rules.description"
                            prepend-icon="mdi-text"
                            filled
                            name="input-7-4"
                            label="Purpose"
                          >
                          </v-textarea>
                          <v-alert
                            text
                            dense
                            color="warning"
                            icon="mdi-information"
                            border="left"
                          >
                            Note: Request Form must be .pdf format
                          </v-alert>
                          <input
                            type="file"
                            name="request_file_form"
                            @change="onChangeFile"
                            required
                          />
                        </v-form>
                      </v-container>

                      <!--  FORM BUTTONS -->
                      <v-card-actions class="justify-end">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save(getUserId)"
                        >
                          Send Request
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- PAGINATION -->
    <jw-pagination
      :labels="customLabels"
      :items="fetchFiles"
      @changePage="onChangePage"
    ></jw-pagination>
  </div>
</template>
<script>
import SelectFileCategory from './../../../system/files/SelectFileCategory.vue'
import folderSvg from "./../../../../../../public/assets/img/folder2.jpg";
import AlertComponent from "./../../../AlertComponent.vue";
export default {
  components: { AlertComponent,SelectFileCategory },
  data() {
    return {
      folderSvg: folderSvg,

      category_id:0,

      /* PAGINATION LABLES PROPERTY */
      customLabels: {
        first: "<<",
        last: ">>",
        previous: "<",
        next: ">",
      },

      /* FILE REQUEST PROPERTIES */
      pageOfItems: [],
      search: null,
      msg: "",
      showMsg: false,

      //Dialog Property
      formDialog: false,
      dialogDelete: false,

      //NOTIFY PROPERTIES
      error: "",
      msgStatus: false,
      load: false,

      //FILES PROPERTIES
      editedIndex: -1,

      //FORM PROPERTIES
      form: {
        user_id: null,
        file_id: null,
        description: "",
        status: "Pending",
        expiration_date: null,
        request_date: null,
        request_form: null,
        file_name: null,
      },

      //RULES VALIDATION PROPERTIES
      rules: {
        isValid: true,
      },
      count: null,

      //DEFAULT FORM DATA
      defaultItem: {
        user_id: null,
        file_id: null,
        description: "",
        status: "Pending",
        retention_date: null,
        request_date: null,
        request_form: null,
      },
    };
  },
  computed: {
    /* FETCH DOCUMENTS RECORDS FROM STORE STATES */
    fetchFiles() {
      let files = {}
      if(this.category_id === 0) {
        files = this.$store.getters.getDocuments
      }else {
         files = this.$store.getters.filterFilesByCategory(this.category_id)
      }
      console.log(files)
      if (this.search) {
        let result = files.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.filename.toLowerCase().includes(v));
        });
        var count = Object.keys(result).length;
        if (count === 0) {
          this.showMsg = true;
          this.msg = "no match in our records. Please enter the exact filename";
          return result;
        } else {
          this.showMsg = false;
          return result;
        }
      } else {
        this.showMsg = false;
        return this._.orderBy(files, ["created_at"], ["desc"]);
      }
    },

    /* GET CURRENT USER ID */
    getUserId() {
      return this.$store.state.auth.user.user_id;
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
    fetchFiles(val) {},
    //CLOSE MODAL

    formDialog(val) {
      val || this.close();
    },

    // DELETE MODAL
    dialogDelete(val) {
      val || this.closeDelete();
    },

    // LOADING
    isLoading(val) {
      val || this.close();
    },
  },

  methods: {
    getCategory(category) {
      this.category_id = category
    },
    /* PAGINATION ITEMS */
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },

    //EDIT FILE DATA
    getItem(item) {
      this.form.file_id = item.file_id;
      this.form.file_name = item.filename;
    },

    //MODAL CLOSE
    close() {
      this.formDialog = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
      });
    },

    /* CALCULATE DATE FOR EXPIRATION DATE */
    calculateDate() {
      const now = new Date();
      now.setDate(now.getDate()).toString();
      var converted_timestamp = new Date(now),
        mnth = ("0" + (converted_timestamp.getMonth() + 1)).slice(-2),
        day = ("0" + converted_timestamp.getDate()).slice(-2),
        hours = ("0" + converted_timestamp.getHours()).slice(-2),
        minutes = ("0" + converted_timestamp.getMinutes()).slice(-2),
        seconds = ("0" + converted_timestamp.getSeconds()).slice(-2);
      this.form.expiration_date =
        converted_timestamp.getFullYear() +
        "-" +
        mnth +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      this.form.request_date =
        converted_timestamp.getFullYear() +
        "-" +
        mnth +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },

    /* ADD FILE REQUEST TO DATABASE */
    async addRequest(getUserId) {
      this.calculateDate();
      this.form.user_id = getUserId;
      let fd = new FormData();
      fd.append("description", this.form.description);
      fd.append("request_date", this.form.request_date);
      fd.append("status", "Pending");
      fd.append("expiration_date", this.form.expiration_date);
      fd.append("request_form", this.form.request_form);
      fd.append("user_id", this.form.user_id);
      fd.append("file_id", this.form.file_id);
      await this.$store.dispatch("addRequest", fd);
    },

    /* ON CHANGE FILE FOR FILE INPUT */
    onChangeFile(e) {
      this.form.request_form = e.target.files[0];
    },

    /* SAVE BUTTON ( SEND FORM DATA TO DATABASE) */
    save(getUserId) {
      this.msgStatus = true;
      this.addRequest(getUserId);
    },
  },
};
</script>