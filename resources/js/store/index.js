import Vue from "vue";
import Vuex from 'vuex'
import base from './modules/base'
import users from './modules/users'
import auth from "./modules/auth";
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    plugins:[
        createdPersistedState
    ],
    modules:{
        users,
        auth,
        base
    }
})
