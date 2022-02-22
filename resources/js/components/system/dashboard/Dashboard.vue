<template>
        <div class="container-fluid mt--8">
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
    }
}
</script>
<style scoped>
.content {
    background: #fff;
}
</style>
