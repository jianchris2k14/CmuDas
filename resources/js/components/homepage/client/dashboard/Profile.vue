<template>
  <v-container>
    <v-row>
     
            <!-- Alert Message -->
      <div v-if="msgStatus">
        <alert-component />
      </div>
      <v-col cols="12" md="2" sm="8">
        <v-avatar size="260">
          <img :src="userlogo" />
        </v-avatar>
      </v-col>
      <v-col cols="12" md="10" sm="12">
        <v-card class="mx-auto" tile v-show="showInfo">
          <v-list flat>
            <v-subheader class="info text-uppercase text-white"
              >Personal Information</v-subheader
            >
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ getUserProfile.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ getUserProfile.email }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ getUserProfile.address }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cellphone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ getUserProfile.phone_no }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn
            color="info"
            class="mt-10"
            @click="editProfile(getUserProfile)"
          >
            <v-icon> mdi-pencil </v-icon>
            Edit Profile
          </v-btn>
          <v-btn
            color="warning"
            class="mt-10"
            @click="updatePassword(getUserProfile)"
          >
            <v-icon> mdi-pencil </v-icon>
            Update Password
          </v-btn>
        </v-card>

        <!-- User Management Modal -->
        <div v-show="showForm">
          <v-card>
            <v-toolbar color="primary" dark>
              <span class="text-uppercase">Update Profile</span>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form
                  ref="form"
                  @submit.prevent="save"
                  v-model="rules.isValid"
                  lazy-validation
                  v-show="isUpdatePassword"
                >
                  <v-row>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        label="Current Password"
                        v-model="form.password"
                        outlined
                        dense
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        @click:append="showpass = !showpass"
                        :rules="rules.updatePasswordRules.password"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        label="New Password"
                        v-model="form.newpass"
                        outlined
                        dense
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        @click:append="showpass = !showpass"
                        :rules="rules.updatePasswordRules.password"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        label="Confirm New Password"
                        v-model="form.newpass_confirmation"
                        outlined
                        dense
                        :append-icon="
                          showconfirmpass ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="showconfirmpass ? 'text' : 'password'"
                        @click:append="showconfirmpass = !showconfirmpass"
                        :rules="rules.updatePasswordRules.newpass_confirmation"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>



                <v-form
                  ref="form"
                  @submit.prevent="save"
                  v-model="rules.isValid"
                  lazy-validation
                  v-show="isEditProfile"
                >
                  <v-row>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        v-model="form.name"
                        label="Name"
                        outlined
                        dense
                        :rules="rules.editProfileRules.name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        disabled
                        outlined
                        dense
                        :rules="rules.editProfileRules.email"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col sm="8" md="6" class="mb-n7">
                      <v-text-field
                        v-model="form.address"
                        label="Address"
                        outlined
                        dense
                        :rules="rules.editProfileRules.address"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="8" md="6" class="mb-n7">
                      <v-text-field
                        v-model="form.phone_no"
                        label="Contact No."
                        outlined
                        dense
                        :rules="rules.editProfileRules.phone_no"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n7">
                      <v-text-field
                        label="Current Password"
                        v-model="form.password"
                        outlined
                        dense
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        @click:append="showpass = !showpass"
                        :rules="rules.editProfileRules.password"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <!-- Form Buttons -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" dark @click="backtoProfile"> Cancel </v-btn>
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AlertComponent from './../../../AlertComponent.vue'
import userlogo from "./../../../../../../public/assets/img/user.png";
export default {
    components:{AlertComponent},
  computed: {
    getUserProfile() {
      return this.$store.state.auth.user
    },
    isLoading() {
      return this.$store.state.base.isLoading
    },
  },
  data() {
    return {
      dialog: false,
      showForm: false,
      showInfo: true,
      showpass: false,
      showconfirmpass: false,
      isEditProfile: false,
      isUpdatePassword: false,
      userlogo: userlogo,
      msgStatus:false,

      items: [
        {
          icon: "mdi-account",
          text: "name",
        },
        {
          icon: "mdi-mail",
          text: "Email",
        },
        {
          icon: "mdi-map-marker",
          text: "Address",
        },
        {
          icon: "mdi-cellphone",
          text: "Contact No.",
        },
      ],

      //FORM PROPERTIES
      form: {
        name: "",
        email: "",
        address: "",
        phone_no: "",
        password: "",
        newpass:"",
        newpass_confirmation: "",
        user_type: "",
        user_id: null,
        updateType:"",
      },

      //RULES VALIDATION PROPERTIES
      rules: {
        isValid: true,
        updatePasswordRules: {
          password: [(v) => !!v || "Password is required"],
          newpass: [(v) => !!v || "Password is required"],
          newpass_confirmation: [
            (v) => !!v || "Password confirmation is required",
            (v) => v === this.form.newpass || "The password must be match",
          ],
        },
        editProfileRules: {
          name: [(v) => !!v || "Name is required"],
          email: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ],
          address: [(v) => !!v || "Address is required"],
          phone_no: [(v) => !!v || "Phone No. is required"],
          user_type: [(v) => !!v || "User type is required"],
          password: [(v) => !!v || "Password is required"],
        },
      },

      //DEFAULT FORM DATA
      defaultItem: {
        name: "",
        email: "",
        address: "",
        phone_no: "",
        user_type: "Client",
      },
    };
  },
  methods: {
    editProfile(user) {
        this.updateType = 'editprofile'
      this.showForm = true
      this.showInfo = false
      this.isEditProfile = true
      this.form = Object.assign({}, user)
    },
    updatePassword(user) {
        this.user_type = 'updatepassword'
      this.showForm = true
      this.isUpdatePassword = true
      this.showInfo = false
      this.form = Object.assign({}, user)
    },
    backtoProfile() {
      this.showForm = false
      this.showInfo = true
      this.isEditProfile = false,
      this.isUpdatePassword = false
    },
    //MODAL CLOSE
    close() {

      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem)
        this.editedIndex = -1;
      });
    },
    save() {
        this.msgStatus = true
        if(this.updateType === 'editprofile') {
            this.$store.dispatch("updateCurrentUser",this.form)
        }else {
            this.$store.dispatch("updateCurrentUserPassword",this.form)
        }
        

    },
  }
};
</script>
<style scoped>
</style>