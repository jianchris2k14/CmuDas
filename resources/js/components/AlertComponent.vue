<template>
<div>
  <div v-show="message.status === 'Error'">
    <v-alert shaped prominent type="error">
      <h3 class="text-white text-uppercase">{{ message.status }}</h3>
      <h6 class="text-white text-uppercase">{{ message.message.message }}</h6>
      <div v-for="(item, index) in message.message.errors" :key="index.errors">
        <ul v-for="error in item" :key="error.name">
          {{
            error
          }}
        </ul>
      </div>
    </v-alert>
  </div>
  <div v-show="message.status === 'Success'">
      <v-alert shaped prominent type="success">
      <h3 class="text-white text-uppercase">{{ message.status }}</h3>
      <div v-for="(item, i) in message.message" :key="i.sucess">
        <div v-for="sucess in item" :key="sucess.success">
          {{
            sucess
          }}
        </div>
      </div>
    </v-alert>
  </div> 
</div>

</template>
<script>
export default {
  data() {
      return {
      }
  },
  computed: {
    message() {
      const status = this.$store.state.users.status;
      const message = this.$store.state.users.message;
      return { status, message };
    },
  },
};
</script>