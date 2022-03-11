<template>
        <div class="mt-15">
            <div class="container shadow p-3 mb-5 bg-white">
                <div class="row">
                    <h1>Client Search</h1>

                    <file-list/>
                    
                </div>
            </div>

        </div>
</template>
<script>
import FileList from './FileList.vue'
export default {
    components:{FileList}
}
</script>
<style scoped>
.content {
    background: #fff;
}
</style>
