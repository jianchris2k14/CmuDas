import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* HOMEPAGE COMPONENTS */
import homepage from './components/homepage/home/Home.vue'
import HomepageLayout from './components/homepage/layouts/HomepageLayout.vue'


/* CLIENT COMPONENTS */

import clientdashboardlayout from './components/homepage/client/layouts/ClientDashboardLayout.vue'
import clientdashboard from './components/homepage/client/dashboard/Dashboard.vue'
import clientrequests from './components/homepage/client/clientrequests/ClientRequest.vue'
import clientsearch from './components/homepage/client/clientsearch/ClientSearch.vue'

/* ERROR 404 PAGE NOT FOUND COMPONENT */
import NotFound from './components/404.vue'


/* ADMIN COMPONENTS */
import DashboardLayout from './components/system/layouts/DashboardLayout.vue'
import dashboard from './components/system/dashboard/Dashboard'
import requests from './components/system/requests/Requests.vue'
import files from './components/system/files/Files.vue'
import users from './components/system/users/Users.vue'
import clients from './components/system/clients/Clients.vue'

const routes = [
    {
        path:'*',
        component:NotFound
    },
    {
        path:'/client/dashboard',
        component:clientdashboardlayout,
        children:[
            {
                path:'/client/dashboard',
                component:clientdashboard,
            },
            {
                path:'/client/requests',
                component:clientrequests
            },
            {
                path:'/client/clientsearch',
                component:clientsearch
            }

        ]

    },
    {
        path:'/',
        component:HomepageLayout,
        children:[
            {
                path:'/',
                component:homepage,
            },

        ]

    },
    {
        path:'/system/dashboard',
        component:DashboardLayout,
        children:[
            {
                path:'/system/dashboard',
                component:dashboard
            },
            {
                path:'/system/requests',
                component:requests
            },
            {
                path:'/system/files',
                component:files
            },
            {
                path:'/system/requests',
                component:requests
            },
            {
                path:'/system/users',
                component:users
            },
            {
                path:'/system/clients',
                component:clients
            }

        ]
    },


]

export default new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
