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

      <!-- Alert Message -->
      <div v-if="msgStatus">
        <alert-component />
      </div>

      <!-- REQUESTS TABLE -->
      <v-data-table
        :headers="headers"
        v-model="selected"
        :items="fetchRequests"
        :search="search"
        item-key="request_id"
        :single-select="singleSelect"
        show-select
        class="elevation-1 table-striped"
      >
        <template v-slot:item.request_date="{ item}">
          <span>{{ new Date(item.request_date).toLocaleDateString() }}</span>
        </template>
        <template v-slot:item.expiration_date="{ item }">
          <span>{{ new Date(item.expiration_date).toLocaleDateString() }}</span>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single Select" class="pa-3">
          </v-switch>
          <v-toolbar flat>
            <v-toolbar-title>List of File Requests</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="error"
            :loading="isLoading"
             @click="deleteItem()">
        Delete
        <v-icon right dark> mdi-delete </v-icon>
      </v-btn>

            <!-- REQUEST FILE MANANGEMENT MODAL -->

            <v-dialog v-model="dialog" max-width="960px">
              <v-card>
                <v-toolbar color="primary" dark>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-toolbar>
                <v-card-title> </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      @submit.prevent="save"
                      v-model="rules.isValid"
                      lazy-validation
                    >
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.request_id"
                            label="Name"
                            outlined
                            disabled
                            dense
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-select
                            :items="item"
                            label="Status"
                            v-model="form.status"
                            required
                            dense
                            outlined
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <!-- Form Buttons -->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" dark @click="close"> Cancel </v-btn>
                  <v-btn
                    :disabled="!rules.isValid"
                    color="success"
                    dark
                    @click="save"
                    :loading="isLoading"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            

            <!-- Delete Confirmation Modal -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-toolbar color="error" dark>
                  <v-toolbar-title class="text-h6">
                    Confirmation
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item(s)?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="info" dark @click="closeDelete">Cancel</v-btn>
                  <v-btn
                    color="error"
                    dark
                    :loading="isLoading"
                    @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- Table Actions Buttons -->
        <template v-slot:item.actions="{ item }">
          <v-icon color="error" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import AlertComponent from "../../AlertComponent.vue";
export default {
  components: { AlertComponent },
  data() {
    return {
      //TABLE SEARCH PROPERTY
      search: "",

      //Dialog Property
      dialog: false,
      dialogDelete: false,

      //NOTIFY PROPERTIES
      error: "",
      msgStatus: false,
      load: false,

      singleSelect: false,
      selected: [],

      //TABLE HEADERS PROPERTIES
      headers: [
        {
          text: "Request ID",
          align: "start",
          sortable: true,
          value: "request_id",
          class: "info text-black",
        },
        { text: "Client Name", value: "name", class: "info text-black" },
        { text: "Client Email", value: "email", class: "info text-black" },
        { text: "File Name", value: "filename", class: "info text-black" },
        { text: "Code", value: "code", class: "info text-black" },
        { text: "Status", value: "status", class: "info text-black" },
        {
          text: "Request Date",
          value: "request_date",
          class: "info text-black",
        },
        {
          text: "Expiration Date",
          value: "expiration_date",
          class: "info text-black",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          class: "info text-black",
        },
      ],

      //REQUEST PROPERTIES
      editedIndex: -1,
      selectedItem: null,
      item: ["Pending", "Approved", "Expired"],

      //FORM PROPERTIES
      form: {
        request_id: null,
        status: "",
      },

      //RULES VALIDATION PROPERTIES
      rules: {
        isValid: true,
        filename: [(v) => !!v || "Filename is required"],
        description: [(v) => !!v || "Description is required"],
        file_location: [(v) => !!v || "File Location is required"],
      },

      //DEFAULT FORM DATA
      defaultItem: {
        request_id: null,
        status: "",
      },
    };
  },
  computed: {
    //FETCH FILE REQUESTS FROM STATE MANANGEMENT COMPUTED
    fetchRequests() {
      const files = this.$store.getters.getRequestsLog;
      return this._.orderBy(files, ["created_at"], ["desc"]);
    },
    selectedRequest() {
      let request_id = this.selected.map((item) => {
        return item.request_id;
      });
      return request_id;
    },


    //FORM TITLE COMPUTED
    formTitle() {
      return this.editedIndex === -1 ? "New File" : "Update File";
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
    //CLOSE MODAL
    dialog(val) {
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
    getColor(status) {
      if (status === "Approved") return "green";
      else if (status === "Denied") return "red";
      else return "orange";
    },
    //EDIT FILE REQUESTS DATA
    editItem(item) {
      this.editedIndex = this.fetchRequests.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    //DELETE REQUESTS DATA
    deleteItem() {
      /* this.selectedItem = item; */
      if(this.selected.length<= 0) {
        alert("Select Request to delete")
      }else {
        this.dialogDelete = true
      }
      
    },

    //CONFIRM DELETE FILE REQUEST
    async deleteItemConfirm() {
      this.msgStatus = true;
      await this.$store.dispatch("deleteMultipleRequest",this.selectedRequest)
      //await this.$store.dispatch("deleteRequest", this.selectedItem.request_id);
      this.closeDelete();
    },

    //MODAL CLOSE
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //CLOSE DELETE CONFIRMATION
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //CALL STORE MANANGEMENT DISPATCH FOR ADDING DATA TO STATES
    async addFile() {},

    //SAVE BUTTON ( SEND FORM DATA TO DATABASE)
    save() {
      this.msgStatus = true;

      //Check if actions update or add
      if (this.editedIndex > -1) {
      } else {
        /* this.$refs.form.validate(); */
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
::v-deep .v-data-table-header {
  background-color: #1e88e5;
}
</style>
