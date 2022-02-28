import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

Vue.use(VueRouter)

/* HOMEPAGE COMPONENTS */
import homepage from './components/homepage/home/Home.vue'
import HomepageLayout from './components/homepage/layouts/HomepageLayout.vue'


/* CLIENT COMPONENTS */

import clientdashboardlayout from './components/homepage/client/layouts/DashboardLayout'
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
/*     {
        path:'*',
        component:NotFound
    }, */
    {
        path:'/client/dashboard',
        component:clientdashboardlayout,
        meta:{
            middleware:true,
            user:true,
            title:"portal"
        },
        children:[
            {
                path:'/client/dashboard',
                component:clientdashboard,
                meta:{
                    user:true,
                    title:"Client Dashboard"
                }
            },
            {
                path:'/client/requests',
                component:clientrequests,
                meta:{
                    user:true,
                    title:"Client Request"
                }
            },
            {
                path:'/client/clientsearch',
                component:clientsearch,
                meta:{
                    user:true,
                    title:"Client Search File"
                }
            }

        ]

    },
    {
        path:'/',
        component:HomepageLayout,
        meta:{
            guest: true,
            title:"portal"
        },
        children:[
            {
                path:'/',
                component:homepage,
                meta:{
                    guest: true,
                    title:"Landing Page"
                }
            },

        ]

    },
    {
        path:'/system/dashboard',
        component:DashboardLayout,
        meta:{
            middleware:true,
            user:true,
            title:"system"
        },
        children:[
            {
                path:'/system/dashboard',
                component:dashboard,
                meta:{
                    user:true,
                    title:"System Dashboard"
                }
            },
            {
                path:'/system/files',
                component:files,
                meta:{
                    user:true,
                    title:"System Files"
                }
                
            },
            {
                path:'/system/requests',
                component:requests,
                meta:{
                    user:true,
                    title:"System Client Requests"
                }
            },
            {
                path:'/system/user',
                component:users,
                meta:{
                    user:true,
                    title:"System Users"
                }
            },
            {
                path:'/system/clients',
                component:clients,
                meta:{
                    user:true,
                    title:"System Clients"
                }
            }

        ]
    },


]

export default new VueRouter({
    routes,
    mode:'history',
    routes:routes,
    linkActiveClass: 'active',
    scrollBehavior(to,from,savedPosition) {
        return {x:0,y:0}
    }
})

