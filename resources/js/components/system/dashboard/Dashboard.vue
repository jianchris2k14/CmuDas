<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <dashboard-top-content/>
                </div>
            </div>

        </div>
</template>
<script>
import DashboardTopContent from './DashboardTopContent.vue'
export default {
    components:{
        DashboardTopContent
    },
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    mounted() {
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.$store.dispatch("getUser")
    }
}
</script>
<style scoped>
.content {
    background: #fff;
}
</style>

