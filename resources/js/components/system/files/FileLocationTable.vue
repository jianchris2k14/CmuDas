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

      <!-- FILES TABLE  -->
      <v-data-table
        :headers="headers"
        :items="fetchFileLocations"
        :search="search"
        class="elevation-1 table-striped"
      >
      <!-- CHANGE DATE FORMAT FROM DATABASE -->
      <template v-slot:item.created_at="{ item }">
           <span>{{
             new Date(item.created_at).toLocaleDateString()}}</span>
         </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>File Locations</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>


            <!-- FILES MANAGEMENT MODALS -->

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
                    @submit.prevent="save">
                    <v-text-field
                      v-model="form.filename"
                      disabled
                      prepend-icon="mdi-information-outline"
                      label="File Name"
                      dense
                      outlined
                      required>
                      </v-text-field>
                     <v-text-field
                      v-model="form.file_id"
                      disabled
                      prepend-icon="mdi-information-outline"
                      label="File ID"
                      dense
                      outlined
                      required>
                      </v-text-field>
                      <input type="file" ref="file" v-on:change="onChangeFile">
                     <!--  <v-file-input
                        v-show="formTitle === 'File Location'"
                        v-model="form.file_location"
                        ref="file"
                        label="Select File"
                        outlined
                        dense
                      ></v-file-input> -->
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
      file_id:null,
      selectedFile:null,



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
        text: "File ID",
        align: "start",
        sortable: true,
        value: "file_id",
        class: "info text-black",
      },
      { text: "File Name", value: "filename", class: "info text-black" },
      { text: "File Location", value: "file_location", class: "info text-black" },
      { text: "Slug", value: "slug", class: "info text-black" },
      { text: "Code", value: "code", class: "info text-black" },
      { text: "Uploaded", value: "created_at", class: "info text-black" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: "info text-black",
      },
    ],

    //FILES PROPERTIES
    editedIndex: -1,

    //FORM PROPERTIES
    form: {
      filename:"",
      file_location: null,
      file_id:null
    },


    //RULES VALIDATION PROPERTIES
    rules: {
      isValid: true,
      file_location: [v => !!v || "Select is File"],

    },

    //DEFAULT FORM DATA
    defaultItem: {
      filename:"",
      file_location: null,
      file_id:null
    },
    }
  },
  computed: {
    //FETCH FILES FROM STATE MANANGEMENT COMPUTED
    getUserId() {

      return this.$store.state.auth.user.user_id

    },
    fetchFileLocations() {

        const file_location = this.$store.state.files.file_location  

        return this._.orderBy(file_location, ["created_at"], ["desc"]);

    },

    //FORM TITLE COMPUTED
    formTitle() {

      if(this.editedIndex === 0) {
        return "Update File"
      }

      //return this.editedIndex === -1 ? "New File" : "Update File";
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


    //EDIT FILE DATA
    getUserID() {
      
      this.form.user_id = event.target.value

    },
    editItem(item) {

      this.editedIndex = this.fetchFileLocations.indexOf(item);
      this.form.file_id = item.file_id
      this.form.filename = item.file_location
      this.dialog = true;

    },
    editFileLocation(item) {

      this.dialog = true;

      this.form.file_id = item.file_id

      this.editedIndex = 1

    },


    //DELETE FILE DATA
    deleteItem(item) {
      this.selectedFile = item
      this.dialogDelete = true;
    },

    //CONFIRM DELETE FILE
    async deleteItemConfirm() {
      this.msgStatus = true
      await this.$store.dispatch("deleteFileLocation",this.selectedFile)
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

    async updateFileLocation() {
      let fd = new FormData()

      fd.append("file_id",this.form.file_id)
      fd.append("file_location",this.form.file_location)
      fd.append("filename",this.form.filename)
      fd.append("_method", "put")
      if(this.form.file_location !== null) {
        await this.$store.dispatch("updateFileLocation",fd)
      }else {
        alert("Please select file")
      }

      
      
    },
    onChangeFile() {
      this.form.file_location = this.$refs.file.files[0]
    },

    //SAVE BUTTON ( SEND FORM DATA TO DATABASE)
    save() {
      this.msgStatus = true;
      //Check if actions update or add
        this.$refs.form.validate()
        this.updateFileLocation()

    },
  },

};
</script>
