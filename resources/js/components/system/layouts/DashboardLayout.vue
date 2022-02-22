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
    }
}
</script>

