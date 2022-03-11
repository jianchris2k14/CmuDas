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
        :items="fetchFiles"
        :search="search"
        class="elevation-1 table-striped"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>List of Files</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>


            <!-- FILES MANAGEMENT MODALS -->

            <v-dialog v-model="dialog" max-width="960px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark> mdi-plus-circle </v-icon>
                  New File
                </v-btn>
              </template>
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
                      v-show="formTitle === 'New File' || formTitle === 'Update File'"
                      v-model="form.filename"
                      :rules="rules.filename"
                      @input="generateFileCode"
                      prepend-icon="mdi-file"
                      label="Filename"
                      dense
                      outlined
                      required>
                      </v-text-field>
                       <v-text-field
                       v-show="formTitle === 'New File' || formTitle === 'Update File'"
                      v-model="form.code"
                      :rules="rules.code"
                      prepend-icon="mdi-file-code"
                      label="File Code"
                      dense
                      outlined
                      required>
                      </v-text-field>
                      <v-text-field
                      v-show="formTitle === 'New File' || formTitle === 'Update File'"
                      v-model="form.slug"
                      :rules="rules.slug"
                      prepend-icon="mdi-information-outline"
                      label="Slug"
                      dense
                      outlined
                      required>
                      </v-text-field>
                      <v-textarea
                      v-show="formTitle === 'New File' || formTitle === 'Update File'"
                      v-model="form.description"
                      :rules="rules.description"
                      prepend-icon="mdi-text"
                      filled
                      name="input-7-4"
                      label="File Description"
                      >

                      </v-textarea>
                       <v-text-field
                      v-show="formTitle === 'File Location'"
                      v-model="form.file_id"
                      disabled
                      prepend-icon="mdi-information-outline"
                      label="File ID"
                      dense
                      outlined
                      required>
                      </v-text-field>
                      <input type="file" :rules="rules.file_location" ref="file" v-on:change="onChangeFile" required>
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
          <v-icon color="primary" small class="mr-2" @click="editFileLocation(item)">
            mdi-upload
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
      { text: "Description", value: "description", class: "info text-black" },
      { text: "Slug", value: "slug", class: "info text-black" },
      { text: "Code", value: "code", class: "info text-black" },
      { text: "Date Created", value: "created_at", class: "info text-black" },
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
      filename: "",
      description: "",
      slug: "",
      file_location: null,
      code: "",
      file_id:null
    },


    //RULES VALIDATION PROPERTIES
    rules: {
      isValid: true,
      filename: [v => !!v || "Filename is required"],
      slug: [v => !!v || "Filename is required"],
      description: [v => !!v || "Description is required"],
      file_location: [v => !!v || "Select is File"],

    },

    //DEFAULT FORM DATA
    defaultItem: {
      filename: "",
      slug: "",
      description: "",
      file_location: null,
      code: "",
      file_id:null
    },
    }
  },
  computed: {
    //FETCH FILES FROM STATE MANANGEMENT COMPUTED
    getUserId() {

      return this.$store.state.auth.user.user_id

    },
    fetchFiles() {

        const files = this.$store.state.files.files  

        return this._.orderBy(files, ["created_at"], ["desc"]);

    },

    //FORM TITLE COMPUTED
    formTitle() {

      if(this.editedIndex === -1) {
        return "New File"
      }else if(this.editedIndex === 0) {
        return "Update File"
      }else {
        return "File Location"
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
    getUserID(event) {
      
      this.form.user_id = event.target.value

    },
    editItem(item) {

      this.editedIndex = this.fetchFiles.indexOf(item);

      this.form = Object.assign({}, item);

      this.dialog = true;
      this.editedIndex = -1

    },
    editFileLocation(item) {

      this.dialog = true;

      this.form.file_id = item.file_id
      this.editedIndex = 1

    },

    //GENERATE FILE CODE
    generateFileCode(event) {
      if(event) {
        let filename = this.form.filename

        let generatedcode = filename.toUpperCase().slice(0,3) + Math.floor(Math.random() * 100000000000)

        if(filename === "") {
          this.form.code = ""
        }else {
          this.form.code = generatedcode
        }

        
      }
    },

    //DELETE FILE DATA
    deleteItem(item) {
      this.selectedFile = item
      this.dialogDelete = true;

    },

    //CONFIRM DELETE FILE
    async deleteItemConfirm() {
      this.msgStatus = true
      await this.$store.dispatch("deleteFile",this.selectedFile)
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

  
    //CALL STORE MANANGEMENT DISPATCH FOR UPDATING DATA TO STATE MANANGEMENT
    async updateFile() {

        await this.$store.dispatch("updateFile",this.form)
        
    },

    //CALL STORE MANANGEMENT DISPATCH FOR ADDING DATA TO STATES
    async addFile() {

      await this.$store.dispatch("addFile",this.form)

    },
    async addFileLocation() {
      let fd = new FormData()

      fd.append("file_id",this.form.file_id)

      fd.append("file_location",this.form.file_location)
      if(this.form.file_location !== null) {
        await this.$store.dispatch("addFileLocation",fd)
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
      if (this.editedIndex === -1) {
        this.$refs.form.validate()
        this.generateFileCode()
        this.updateFile()

      }else if(this.editedIndex === 0) {
        this.$refs.form.validate()
        this.addFile()
        /* this.$refs.form.validate(); */

      }else {
        this.$refs.form.validate()

        this.addFileLocation()
      }

    },
  },

};
</script>
