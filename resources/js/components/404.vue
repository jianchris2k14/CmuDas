<template>
    <div class="notfound-container">
        <v-container>
            <div class="row mt-15">
                <div class="text-center mt-20">
                    <img :src="notfound" class="notfound">
                </div>
                <div class="text-center">
                    <v-btn @click="$router.go(-1)" dark color="info">
                        Return to page
                    </v-btn>
                </div>
                    
                    
            </div>
            
        </v-container>
    </div>
</template>
<script>
import notfound from './../../../public/images/404.png'
export default {
    data() {
        return {
            notfound:notfound
        }
    },
}
</script>
<style scoped>
.notfound {
    width: 720px;
    height: 580;
}
.notfound-container {
    background: #000;
    height: 100%;
}
</style>
