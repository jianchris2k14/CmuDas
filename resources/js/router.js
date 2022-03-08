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

/* import clientdashboardlayout from './components/homepage/client/layouts/DashboardLayout'
import clientdashboard from './components/system/client/clientdashboard/ClientDashboard.vue'
import clientrequests from './components/system/client/clientrequests/ClientRequests.vue'
import clientsearch from './components/system/client/clientsearch/ClientSearch.vue' */

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
        path:'/404',
        component:NotFound,
        name:"404"
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
                name:'homepage',
                meta:{
                    guest: true,
                    title:"Landing Page"
                }
            },

        ]

    },
    {
        path:'/client/dashboard',
        component:clientdashboardlayout,
        meta:{
            middleware:true,
            title:"system",
        },  
        children:[
            {
                path:'/client/dashboard',
                component:clientdashboard,
                name:'clientdashboard',
                meta:{
                    middleware:true,
                    isAdmin:false,
                    title:"Client Dashboard"
                },
            },
            {
                path:'/client/requests',
                component:clientrequests,
                name:'clientrequests',
                meta:{
                    middleware:true,
                    isAdmin:false,
                    title:"Client Request"
                },
            },
            {
                path:'/client/clientsearch',
                component:clientsearch,
                name:'clientsearch',
                meta:{
                    middleware:true,
                    isAdmin:false,
                    title:"Client Search File"
                },

            },

        ]
    },
    {
        path:'/system/',
        component:DashboardLayout,
        meta:{
            middleware:true,
            title:"system",
        },  
        children:[
            {
                path:'/system/dashboard',
                component:dashboard,
                name:'systemdashboard',
                meta:{
                    isAdmin:true,
                    middleware:true,
                    title:"System Dashboard"
                },
                /* beforeEnter:(to,from,next) => {
                    store.dispatch("getUserList")
                    next()
                }, */

                
            },
            {
                path:'/system/files',
                component:files,
                name:'systemfiles',
                meta:{
                    isAdmin:true,
                    middleware:true,
                    title:"System Files"
                },
                },
                
            {
                path:'/system/requests',
                component:requests,
                name:'systemrequests',
                meta:{
                    isAdmin:true,
                    middleware:true,
                    title:"System Client Requests"
                },

            },
            {
                path:'/system/user',
                component:users,
                name:'systemusers',
                meta:{
                    isAdmin:true,
                    middleware:true,
                    title:"System Users"
                },
                beforeEnter:(to,from,next) => {
                    if(store.state.auth.user.user_type === 'Staff') {
                        next(false)
                    }else {
                        next()
                    }
                }
            },
            {
                path:'/system/clients',
                component:clients,
                name:'systemclients',
                meta:{
                    isAdmin:true,
                    middleware:true,
                    title:"System Clients"
                },
            }

        ]
    },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this,location).catch(err =>err)
}
const router = new VueRouter({
    routes,
    mode:'history',
    linkActiveClass: 'active',
    scrollBehavior(to,from,savedPosition) {
        return {x:0,y:0}
    }
})

function loggedIn() {
    return localStorage.getItem('token');
}
router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.middleware)) {
        if (!loggedIn() && !store.state.auth.authenticated) {
          next({
            path: '/',
            query: {redirect: to.fullPath }
          })
        }else {
            let user_type = localStorage.getItem("user_type")
            if(to.matched.some(record => record.meta.isAdmin)) {
                if(user_type === 'Client') {
                    next({
                        name:'404'
                    })
                }else {
                    store.dispatch("getUserList")
                    store.dispatch("getFileList")
                    store.dispatch("getFileLocations")
                    next()
                }
            }else {
                if(user_type === 'Client') {
                    next()
                }else {
                    next({
                        name:'404'
                    })
                }
            }
            next()

        }
      }
      else {
        next() // make sure to always call next()!
      }
    })

export default router

