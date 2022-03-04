<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1><i class="fa fa-user-tie"></i> Clients</h1>
                    <client-table/>
                </div>
            </div>

        </div>
</template>
<script>
import ClientTable from './ClientTable.vue'
export default {
    components:{ClientTable}
}
</script>
