<template>
<v-app>
    <router-view></router-view>
</v-app>
</template>
<script>

export default {
    data() {
        return {
            currentUser: {},
            token: localStorage.getItem('token')
        }
    },
    methods:{
        getUserData() {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            this.$store.dispatch("getUser")
        }
    },
    mounted() {
        this.getUserData();
    },
} 
</script>

