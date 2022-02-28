<template>
    <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right account-settings">
              <a href="#" class="dropdown-item">
                <i class="fa fa-cog"></i>
                <span>Settings</span>
              </a>
              <div class="dropdown-divider"></div>
              <a @click="logout()" class="dropdown-item">
                <i class="fa fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
    </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods:{
    async logout() {
      await axios.post('/api/logout').then((response) => {
        this.$store.dispatch("userLogout")
        this.$router.push('/')
        console.log(response.data)
      }).catch((err) => {
        console.log(err.response.data)
      });
    }
  }
}
</script>
<style scoped>

</style>
