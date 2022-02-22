<template>
    <div id="app">
        <client-sidebar/>
        <div class="main-content">
            <client-header/>
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
import Dashboard from './../dashboard/Dashboard.vue'
import ClientSidebar from './ClientSidebar.vue'
import ClientHeader from './ClientHeader.vue'
export default {
    components:{
        Dashboard,
        ClientSidebar,
        ClientHeader
    }
}
</script>
