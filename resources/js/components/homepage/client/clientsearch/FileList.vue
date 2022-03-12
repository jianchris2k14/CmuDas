<template>
  <div class="container">
    <v-row justify="center">
      <v-col
        cols="12"
        v-for="(items, index) in pageOfItems"
        :key="index.file_id"
        class="mb-5"
      >
        <v-card color="#385F73" dark>
          <v-card-title class="text-h5">
            <h1 class="text-white">{{ items.filename }}</h1>
          </v-card-title>
          <v-card-subtitle>Code: {{ items.code }}</v-card-subtitle>
          <v-card-subtitle>Slug: {{ items.slug }}</v-card-subtitle>

          <v-card-subtitle
            >Description: {{ items.description }}</v-card-subtitle
          >
          <v-card-subtitle
            >Uploaded:
            {{
              new Date(items.created_at).toLocaleDateString()
            }}</v-card-subtitle
          >
          <v-card-actions>


            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="editItem(items)">
                  Request File
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Request File</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form
                    ref="form"
                    @submit.prevent="save">
                      <v-text-field
                      v-model="form.file_id"
                      prepend-icon="mdi-file"
                      label="File ID"
                      dense
                      disabled
                      outlined
                      required>
                      </v-text-field>
                      <v-textarea
                      v-model="form.description"
                      :rules="rules.description"
                      prepend-icon="mdi-text"
                      filled
                      name="input-7-4"
                      label="Request Description"
                      >

                      </v-textarea>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <jw-pagination
      :labels="customLabels"
      :items="fetchFiles"
      @changePage="onChangePage"
    ></jw-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customLabels: {
        first: "<<",
        last: ">>",
        previous: "<",
        next: ">",
      },
      pageOfItems: [],

      //Dialog Property
      dialog: false,
      dialogDelete: false,

      //NOTIFY PROPERTIES
      error: "",
      msgStatus: false,
      load: false,

      //FILES PROPERTIES
      editedIndex: -1,

      //FORM PROPERTIES
      form: {
        user_id:this.getUserId,
        file_id: null,
        description:"",
      },

      //RULES VALIDATION PROPERTIES
      rules: {
        isValid: true,
        file_location: [(v) => !!v || "Select is File"],
      },

      //DEFAULT FORM DATA
      defaultItem: {
        user_id:this.getUserId,
        file_id: null,
        description:"",
      },
    };
  },
  computed: {
    fetchFiles() {
      const files = this.$store.state.files.file_location;

      return this._.orderBy(files, ["created_at"], ["desc"]);
    },
    getUserId() {
      return this.$store.state.auth.user.user_id
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
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },

    //EDIT FILE DATA
    getUserID() {
      this.form.user_id = event.target.value;
    },

    editItem(item) {
      this.editedIndex = this.fetchFiles.indexOf(item);
      this.form.file_id = item.file_id
      this.dialog = true;
    },
    editFileLocation(item) {
      this.dialog = true;

      this.form.file_id = item.file_id;

      this.editedIndex = 1;
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
      let fd = new FormData();

      fd.append("file_id", this.form.file_id);
      fd.append("file_location", this.form.file_location);
      fd.append("filename", this.form.filename);
      fd.append("_method", "put");
      if (this.form.file_location !== null) {
        await this.$store.dispatch("updateFileLocation", fd);
      } else {
        alert("Please select file");
      }
    },
    onChangeFile() {
      this.form.file_location = this.$refs.file.files[0];
    },

    //SAVE BUTTON ( SEND FORM DATA TO DATABASE)
    save() {
      this.msgStatus = true;
      //Check if actions update or add
      this.$refs.form.validate();
      this.updateFileLocation();
    },
  },
};
</script>