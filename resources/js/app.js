/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;
import Vue from 'vue'
import router from './router'

/** ANIMATE ON SCROLL */
import AOS from 'aos'
import 'aos/dist/aos.css'


/** ANIMATE CSS */
import 'animate.css'


/* VUEX STORE */
import store from './store/index'


/**DATA TABLES */

import "datatables.net-bs5"
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"
import "jszip"
import "pdfmake"
import "datatables.net-buttons-bs5/js/buttons.bootstrap5"
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"
import "datatables.net-buttons-bs5/node_modules/datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons-bs5/node_modules/datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons-bs5/node_modules/datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons-bs5/node_modules/datatables.net-buttons/js/buttons.print"

import "datatables.net-buttons-bs5/node_modules/datatables.net-buttons/js/dataTables.buttons"



/** SCROLL SPY */
import scrollSpy, { Easing } from 'vue2-scrollspy';

Vue.use(scrollSpy, {
  easing: Easing.Cubic.In
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-component', require('./components/App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    mounted() {
        AOS.init({
            duration: 1200,
        })
    },
}).$mount('#app');
