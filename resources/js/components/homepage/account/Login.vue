<template>
  <div class="container">
    <v-card>

      <!-- Alert Message -->
      <div v-if="msgStatus">
        <alert-component />
      </div>
              <v-card>
                  <h5 class="display-1 text-center text-uppercase">Signin</h5>
                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      @submit.prevent="save"
                      v-model="rules.isValid"
                      lazy-validation
                    >
                      <v-row class="mt-n6">
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.email"
                            label="Email"
                            outlined
                            dense
                            prepend-inner-icon="mdi-email"
                            :rules="rules.email"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n6">
                        <v-col cols="12">
                          <v-text-field
                            label="Password"
                            v-model="form.password"
                            outlined
                            dense
                            prepend-inner-icon="mdi-lock"
                            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpass ? 'text' : 'password'"
                            @click:append="showpass = !showpass"
                            :rules="rules.password"
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
                  <v-btn
                    :disabled="!rules.isValid"
                    color="success"
                    dark
                    @click="save"
                  >
                    Login
                  </v-btn>
                </v-card-actions>
              </v-card>
    </v-card>
  </div>
</template>
<script>
import AlertComponent from "./../../AlertComponent.vue";
export default {
  components: { AlertComponent },
  data: () => ({

    //Password Property
    showpassForm: false,
    showpass: false,
    showconfirmpass: false,
    //Error Handlings Property
    error: "",
    msgStatus: false,

    //Form Properties
    form: {
      email: "",
      password: "",

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
      ],
    },
  }),
  methods: {

    //SAVE FORM
    async loginUser() {
      try {
        await this.$store.dispatch("addUser", this.form);
        console.log(this.form)
      } catch (error) {
        console.log(error)
      }
    },
    save() {
      this.msgStatus = true;
        this.$refs.form.validate();
        console.log(this.form)
    },
  },
  mounted() {
    //DISPATCH DATA USER
    this.$store.dispatch("getUserList");
  },
};
</script>
