<template>
  <div class="container">
    <v-card>
      <h5 class="display-1 text-center text-uppercase">Signin</h5>
      <!-- Alert Message -->
      <div v-if="msgStatus">
        <alert-component />
      </div>
      <v-card>
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
            :loading="isLoading"
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
  data() {
    return {
      //Password Property
      showpassForm: false,
      showpass: false,
      showconfirmpass: false,
      isLoading: false,
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
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    //SAVE FORM
    async loginUser() {
      this.isLoading = true;
      await axios.get("/sanctum/csrf-cookie");
      await axios
        .post("/api/login", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          var user_type = response.data.user.user_type;
          if (user_type === "Admin" || user_type === "Staff") {
            this.$router.push("/system/dashboard");
          } else {
            this.$router.push("client/dashboard");
          }
        })
        .catch((err) => {
          var error = Object.assign({
            message: err.response.data,
            status: "Error",
            show: true,
            loading: false,
          });
          this.$store.commit("UPDATE_MESSAGE", error);
        })
        .finally(() => {
          this.isLoading = false;
        });

      /* await axios.get('/sanctum/csrf-cookie')
        await axios.post('/api/login',this.form).then((response) => {
        localStorage.setItem("token", response.data);
        this.$router.push('/system/dashboard')
        console.log(response.data) */
      /* }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isLoading = false
      }) */
    },
    save() {
      this.msgStatus = true;
      this.$refs.form.validate();
      this.loginUser();
    },
  },
};
</script>
