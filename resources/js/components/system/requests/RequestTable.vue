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
        :items="fetchRequests"
        :search="search"
        class="elevation-1 table-striped"
      >
      <template v-slot:item.request_date="{ item }">
           <span>{{
             new Date(item.request_date).toLocaleDateString()}}</span>
         </template>
         <template v-slot:item.retention_date="{ item }">
           <span>{{
             new Date(item.retention_date).toLocaleDateString()}}</span>
         </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>List of File Requests</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>


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
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="info" dark @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="error" dark :loading="isLoading" @click="deleteItemConfirm"
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
          <v-icon color="primary" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import AlertComponent from "./../../AlertComponent.vue";
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
    load:false,

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
      { text: "Request Date", value: "request_date", class: "info text-black" },
      { text: "Retention Date", value: "retention_date", class: "info text-black" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: "info text-black",
      },
    ],

    //REQUEST PROPERTIES
    editedIndex: -1,
    item:[
      'Pending',
      'Approved',
      'Expired'
    ],

    //FORM PROPERTIES
    form: {
      request_id:null,
      status:"",
      retention_date:null
    },

    //RULES VALIDATION PROPERTIES
    rules: {
      isValid: true,
      filename: [v => !!v || "Filename is required"],
      description: [v => !!v || "Description is required"],
      file_location: [v => !!v || "File Location is required"],

    },

    //DEFAULT FORM DATA
    defaultItem: {
      request_id: null,
      status: "",
    },
    }
  },
  computed: {
    //FETCH FILE REQUESTS FROM STATE MANANGEMENT COMPUTED
    fetchRequests() {
      const files = this.$store.getters.getPendingRequests
      return this._.orderBy(files, ["created_at"], ["desc"]);
    },

    //FORM TITLE COMPUTED
    formTitle() {
      return this.editedIndex === -1 ? "New File" : "Update File";
    },

    //ISLOADING COMPUTED
    isLoading: {
      get:function(){ 
        return this.$store.state.base.isLoading
      },
      set:function(newVal) {
        return newVal
      }
    }
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
      val || this.close()
    }
  },

  methods: {

    //EDIT FILE REQUESTS DATA
    editItem(item) {
      this.editedIndex = this.fetchRequests.indexOf(item);
      this.form = Object.assign({}, item);
      console.log(this.form.retention_date)
      this.dialog = true;
    },

    //DELETE REQUESTS DATA
    deleteItem(item) {
      this.dialogDelete = true;
    },

    //CONFIRM DELETE FILE REQUEST
    async deleteItemConfirm() {
      this.msgStatus = true
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
    calculateRetentionDate() {
      const retention_date = new Date(this.form.retention_date);
      retention_date.setDate(retention_date.getDate() + 3).toString().toString()
      var converted_timestamp = new Date(retention_date),
        mnth = ("0" + (converted_timestamp.getMonth()+1)).slice(-2),
        day  = ("0" + converted_timestamp.getDate()).slice(-2),
        hours  = ("0" + converted_timestamp.getHours()).slice(-2),
        minutes = ("0" + converted_timestamp.getMinutes()).slice(-2),
        seconds = ("0"+ converted_timestamp.getSeconds()).slice(-2); 
      this.form.retention_date = converted_timestamp.getFullYear()+"-"+mnth+"-"+day+" "+hours+":"+minutes+":"+seconds
    },

  
    //CALL STORE MANANGEMENT DISPATCH FOR UPDATING DATA TO STATE MANANGEMENT
    async updateRequest() {
        try {
          this.calculateRetentionDate()
          await this.$store.dispatch('updateRequest',this.form)
        }catch(error) {
          console.log(error)
        }
    },


    //SAVE BUTTON ( SEND FORM DATA TO DATABASE)
    save() {
      this.msgStatus = true;
      this.$refs.form.validate()
      this.updateRequest()

    },
  },

};
</script>
