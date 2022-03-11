<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1>Client Request</h1>
                    <client-requests-table/>
                </div>
            </div>

        </div>
</template>

<script>
import ClientRequestsTable from './ClientRequestsTable.vue'
export default {
  components: { ClientRequestsTable },
    comments:{ClientRequestsTable}
}
</script>

<style scoped>
.content {
    background: #fff;
}
</style>
