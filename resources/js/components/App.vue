<template>
<v-app>
    <router-view></router-view>
</v-app>
</template>
<script>
export default {
  data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    mounted() {
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        if(this.token) {
            return this.$store.dispatch("getUser")
        }
    }
};
</script>

