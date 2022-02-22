<template>
        <div class="container-fluid mt--8">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <div class="col-md-6">
                        <h3>List of Users</h3>
                    </div>
                    <div class="col-md-6">
                         <button class="btn btn-info mb-3 float-right"><i class="fa fa-users"></i> New User</button>
                    </div>

                    <!-- USER DATA TABLE -->
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
