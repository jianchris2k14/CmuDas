<template>
    <div id="app">
        <navigation/>
        <div class="main-content">
            <dashboard-header/>
            <dashboard-content/>
        </div>

    </div>
</template>

<script>
import DashboardContent from './DashboardContent.vue'
import DashboardHeader from "./DashboardHeader.vue";
import Navigation from './Navigation.vue'

export default {

    components:{
        Navigation,
        DashboardContent,
        DashboardHeader,
    },
     data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    mounted() {
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        console.log(this.token)
        if(this.token) {
            return this.$store.dispatch("getUser")
        }
        
    }
}
</script>

