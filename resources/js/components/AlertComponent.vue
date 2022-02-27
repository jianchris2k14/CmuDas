<template>
<div>
  <div v-show="message.status === 'Error'">
    <v-alert dense outlined prominent type="error" icon="mdi-alert-circle">
      <v-row align="center">
        <v-col class="grow">
          <h3 class="text-warning text-uppercase">{{ message.status }}</h3>
      <strong><h6 class="text-warning text-uppercase">{{ message.message.message }}</h6></strong>
      <div v-for="(item, index) in message.message.errors" :key="index.errors">
        <ul v-for="error in item" :key="error.name">
          {{
            error
          }}
        </ul>
      </div>
        </v-col>
      </v-row>
      
    </v-alert>
    
  </div>
  <div v-show="message.status === 'Success'">
      <v-alert dense outlined prominent type="success" icon="mdi-check-circle">
        <v-row align="center">
          <v-col class="grow">
          <h3 class="text-success text-uppercase">{{ message.status }}</h3>
          <div v-for="(item, i) in message.message" :key="i.sucess">
            <div class="text-uppercase" v-for="sucess in item" :key="sucess.success">
              {{
                sucess
              }}
            </div>
          </div>
          </v-col>
        </v-row>
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