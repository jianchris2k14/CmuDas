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

      <!-- User Table -->
      <v-data-table
        :headers="headers"
        :items="fetchUser"
        :search="search"
        sort-by="calories"
        class="elevation-1 table-striped"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>List of Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>


            <!-- User Management Modal -->

            <v-dialog v-model="dialog" max-width="960px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark> mdi-plus-circle </v-icon>
                  New User
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="primary" dark>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-toolbar>
                <v-card-title> </v-card-title>
                <v-card-text>
                  <v-container>
                    {{isLoading}}
                    <v-form
                      ref="form"
                      @submit.prevent="save"
                      v-model="rules.isValid"
                      lazy-validation
                    >
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.name"
                            label="Name"
                            outlined
                            dense
                            :rules="rules.name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="form.email"
                            label="Email"
                            outlined
                            dense
                            :rules="rules.email"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="8" md="6">
                          <v-text-field
                            v-model="form.address"
                            label="Address"
                            outlined
                            dense
                            :rules="rules.address"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" md="6">
                          <v-text-field
                            v-model="form.phone_no"
                            label="Contact No."
                            outlined
                            dense
                            :rules="rules.phone_no"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" v-if="formTitle === 'New User'">
                          <v-text-field
                            label="Password"
                            v-model="form.password"
                            outlined
                            dense
                            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpass ? 'text' : 'password'"
                            @click:append="showpass = !showpass"
                            :rules="rules.password"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" v-if="formTitle === 'New User'">
                          <v-text-field
                            label="Password"
                            v-model="form.password_confirmation"
                            outlined
                            dense
                            :append-icon="
                              showconfirmpass ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="showconfirmpass ? 'text' : 'password'"
                            @click:append="showconfirmpass = !showconfirmpass"
                            :rules="rules.password_confirmation"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            :items="usertype"
                            label="User Type"
                            v-model="form.user_type"
                            :rules="rules.user_type"
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
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
  data: () => ({
    search: "",
    //Dialog Property
    dialog: false,
    dialogDelete: false,
    //Password Property
    showpassForm: false,
    showpass: false,
    showconfirmpass: false,

    //Error Handlings Property
    error: "",
    msgStatus: false,

    //Table Headers
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "user_id",
        class: "info text-black",
      },
      { text: "Name", value: "name", class: "info text-black" },
      { text: "Email", value: "email", class: "info text-black" },
      { text: "Address", value: "address", class: "info text-black" },
      { text: "Contact No.", value: "phone_no", class: "info text-black" },
      { text: "User Type", value: "user_type", class: "info text-black" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: "info text-black",
      },
    ],
    //Users Property
    users: [],
    editedIndex: -1,
    usertype: ["Admin", "Staff", "Client"],

    //Form Properties
    form: {
      name: "",
      email: "",
      address: "",
      phone_no: "",
      password: "",
      password_confirmation: "",
      user_type: "",
    },

    //Rules Validation Property
    rules: {
      isValid: true,
      name: [(v) => !!v || "Name is required"],
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      address: [(v) => !!v || "Address is required"],
      phone_no: [(v) => !!v || "Phone No. is required"],
      user_type: [(v) => !!v || "User type is required"],
      password: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 5) || "Passowrd must atleast 10 characters",
        //(v) => (v && /\d/.test(v)) || "Password must have atleast one number",
        //(v) => (v && /[A-Z]{1}/.test(v) || "Password must have atleast one capital letter"),
        //(v) => (v && /[^A-Za-z0-9]/.test(v) || "Password must have atleast one special character")
      ],
      password_confirmation: [
        (v) => !!v || "Password confirmation is required",
        v => v === this.form.password || "Password must be match"
      ],
    },
    defaultItem: {
      name: "",
      email: "",
      address: "",
      phone_no: "",
      user_type: "",
    },
  }),
  computed: {
    //FETCH USER FROM STATE MANANGEMENT
    fetchUser() {
      const users = this.$store.state.users.users;
      return this._.orderBy(users, ["created_at"], ["desc"]);
    },
    isLoading() {
      return this.$store.state.base.isLoading
    },
    //FORM TITLE
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Update User";
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
  },

  methods: {
    //EDIT USER DATA
    editItem(item) {
      this.editedIndex = this.fetchUser.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    //DELETE USER DATA
    deleteItem(item) {
      this.editedIndex = this.fetchUser.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialogDelete = true;
    },

    //CONFIRM DELETE USER
    deleteItemConfirm() {
      this.fetchUser.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    //MODAL CLOSE
    close() {
      this.dialog = false;
    },

    //CLOSE DELETE CONFIRMATION
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //SAVE FORM
    async updateUser() {
    },

    async addUser() {
      try {
        await this.$store.dispatch("addUser", this.form);
        console.log(this.form)
      } catch (error) {
        console.log(error)
      }
    },
    save() {
      this.msgStatus = true;

      //Check if actions update or add

      if (this.editedIndex > -1) {
        
        //this.validate()
        this.updateUser()
      } else {
        this.$refs.form.validate();
        this.addUser();
        this.close();
      }

    },
  },
  mounted() {
    //DISPATCH DATA USER
    this.$store.dispatch("getUserList");
  },
};
</script>
