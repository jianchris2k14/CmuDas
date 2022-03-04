<template>
       <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1><i class="fa fa-chalkboard-teacher"></i> File Requests</h1>
                    <request-table/>
                </div>
            </div>

        </div>
</template>
<script>
import RequestTable from './RequestTable.vue'
export default {
    components:{RequestTable}
}
</script>
