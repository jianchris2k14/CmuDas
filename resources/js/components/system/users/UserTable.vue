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
            <v-dialog v-model="dialog" max-width="960px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
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
                    @submit.prevent="validate"
                    v-model="rules.isValid"
                    lazy-validation>
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
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="8" md="6">
                            <v-text-field
                            v-model="form.address"
                            label="Address"
                            outlined
                            dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" md="6">
                            <v-text-field
                            v-model="form.phone_no"
                            label="Contact No."
                            outlined
                            dense
                            ></v-text-field>
                        </v-col>
                            <v-col cols="12" v-if="formTitle === 'New User'">
                                <v-text-field
                                label="Password"
                                v-model="form.password"
                                outlined
                                type="password"
                                dense>

                                </v-text-field>
                            </v-col>
                            <v-col cols="12" v-if="formTitle === 'New User'">
                                <v-text-field
                                label="Password"
                                v-model="form.password_confirmation"
                                outlined
                                type="password"
                                dense>

                                </v-text-field>
                            </v-col>
                        <v-col cols="12">
                            <v-text-field
                            v-model="form.user_type"
                            label="User Type"
                            outlined
                            dense
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" dark @click="close"> Cancel </v-btn>
                  <v-btn type="submit" :disabled="!rules.isValid" color="success" dark @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

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
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    showpassForm:false,
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
    users: [],
    editedIndex: -1,
    form: {
        name:'',
        email:'',
        address:'',
        phone_no:'',
        password:'',
        password_confirmation:'',
        user_type:''
    },
    rules:{
        isValid:true,
        name: [v => !!v || "Name is required"],
    },
    defaultItem: {
        name:'',
        email:'',
        address:'',
        phone_no:'',
        user_type:''
    },
  }),

  computed: {
      //FETCH USER FROM STATE MANANGEMENT
    fetchUser() {
      return this.$store.state.users.fetchusers;
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

    //SAVE FORM
    updateUser() {
        console.log(this.form)
    },
    addUser() {
        this.$store.dispatch("addUser",this.form)
    },
    validate() {
        this.$refs.form.validate()
    },
    save() {
      if (this.editedIndex > -1) {
        //Object.assign(this.users[this.editedIndex], this.editedItem);
        //this.validate()
        //this.updateUser()
      } else {
          this.validate()
          this.addUser()
        //this.users.push(this.editedItem);
      }
    },
  },
  mounted() {
      //DISPATCH DATA USER
    this.$store.dispatch("getUserList");

  },
};
</script>
