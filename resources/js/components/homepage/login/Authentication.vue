<template>
  <div class="mt-3">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="">
      <v-col cols="12" md="6" sm="8"  class="pa-3 d-flex flex-column">
          <v-card v-if="action === 'login'">
              <login></login>
          </v-card>
          <v-card v-else-if="action === 'forgot-password'">
              <forgot-password></forgot-password>
          </v-card>
          <v-card v-else-if="action === 'reset-password'">
              <h1>Password Reset</h1>
          </v-card>
          <v-card v-else>
              <register></register>
          </v-card>


      </v-col>
      <v-col cols="12" md="6" sm="8" class="pa-3 d-flex flex-column right-container">
        <img :src="loginInfoGraphic" class="mt-5 img" width="100%" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'
import ForgotPassword from './ForgotPassword.vue'
import loginInfoGraphic from "../../../../../public/images/authentication.svg";
export default {
  components: { Login,Register,ForgotPassword },
  data() {
    return {
      loginInfoGraphic: loginInfoGraphic,
    };
  },
  computed: {
    //ISLOADING COMPUTED
    action() {
        return this.$route.params.action
    },
    isLoading: {
      get: function () {
        return this.$store.state.base.isLoading;
      },

      set: function (newVal) {
        return newVal;
      },
    },
  },
};
</script>
<style scoped>
.img {
    height: 120vh;
}
.right-container {
  background-color: #21c65e;

}
::v-deep .v-btn {
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
}
</style>
