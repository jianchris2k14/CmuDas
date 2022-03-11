import Vue from "vue";
import Vuex from 'vuex'
import base from './modules/base'
import users from './modules/users'
import auth from "./modules/auth";
import files from "./modules/files"
import requests from "./modules/requests"
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    plugins:[
        createdPersistedState
    ],
    modules:{
        users,
        requests,
        auth,
        files,
        base
    }
})
