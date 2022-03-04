<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1><i class="fa fa-folder"></i> Files</h1>
                    <file-table/>
                </div>
            </div>

        </div>
</template>

<script>
import FileTable from './FilesTable.vue'
export default {
    components:{FileTable}
}
</script>
