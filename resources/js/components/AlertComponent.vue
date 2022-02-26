<template>
<div>
  <div v-show="message.status === 'Error'">
    <v-alert shaped text prominent type="error" icon="mdi-alert-circle">
      <h3 class="text-warning text-uppercase">{{ message.status }}</h3>
      <h6 class="text-warning text-uppercase">{{ message.message.message }}</h6>
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
      <v-alert shaped text prominent type="success" icon="mdi-check-circle">
      <h3 class="text-green text-uppercase">{{ message.status }}</h3>
      <div v-for="(item, i) in message.message" :key="i.sucess">
        <div class="text-uppercase" v-for="sucess in item" :key="sucess.success">
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
      const status = this.$store.state.base.status;
      const message = this.$store.state.base.message;
      return { status, message };
    },
  },
};
</script>