<template>
    <div id="app">
        <navigation/>
                <div v-scroll-spy="{time:100,steps:30}">
                    <section>
                        <home/>
                    </section>
                    <section>
                        <about/>
                    </section>
                    <section>
                        <search/>
                    </section>
                    <section>
                        <contact/>
                    </section>
                    <section>
                        <account/>
                    </section>
                </div>
        <footer-layout/>
    </div>
</template>
<script>
import Navigation from './Navigation.vue'
import FooterLayout from './Footer.vue'
import About from '../about/About.vue'
import Contact from '../contact/Contact.vue'
import Search from '../search/Search.vue'
import Home from '../home/Home.vue'
import Account from '../account/AccountManagement.vue'
export default {
    components:{
        Navigation,
        FooterLayout,
        Home,
        About,
        Contact,
        Search,
        Account

    },
    data() {
        return {
            options:{
                afterLoad:this.afterLoad
            },
            scrollSpy: {
                section:0
            }
        }
    },
    methods:{
        afterLoad() {
            console.log("Emitted 'after load' event")
        }
    }
}
</script>
<style scoped>
.scroll-spy-container {
    position:relative;
}
</style>

