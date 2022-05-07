<template>
  <div class="mt-3">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="8">
          <div v-if="action === 'login'">
              <login></login>
          </div>
          <div v-else>
              <register></register>
          </div>
          

      </v-col>
      <v-col cols="12" md="6" sm="8" class="right-container">
        <img :src="loginInfoGraphic" class="mt-5" height="100%" width="100%" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Login from './Login.vue'
import Register from './Register.vue'
import loginInfoGraphic from "../../../../../public/images/authentication.svg";
export default {
  components: { Login,Register },
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
.right-container {
  /* background-image:url('../../../../../public/images/authentication.svg'); */
  background-color: #21c65e;
  height: 100vh;
}
::v-deep .v-btn {
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
}
</style>
