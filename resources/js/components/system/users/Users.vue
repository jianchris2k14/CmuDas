<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1><i class="fa fa-users"></i> Users</h1>
                    <user-table/>
                </div>
            </div>

        </div>
</template>
<script>
import UserTable from './UserTable.vue'
export default {
    components:{UserTable}
}
</script>
