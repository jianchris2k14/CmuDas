import axios from "axios";
import router from './../../router'

const getDefaultSate = () => {
    return {
        authenticated:false,
        permission:null,
        user:{},
    }
}
const state = getDefaultSate()

const getters = {
    authenticated(state) {
        return state.authenticated
    },
    permission() {
        return state.permission
    },
    user(state) {
        return state.user
    }
}
const mutations = {
    SET_AUTHENTICATED: (state,value) => {
        state.authenticated = value
    },
    SET_USER: (state,value) => {
        state.user = value
    },
    SET_PERMISSION: (state,value) => {
        state.permission = value
    },
}
const actions = { 
    getUser({commit,rootState}) {
        axios.get('/api/user').then((response) => {
            commit('SET_USER',response.data)
            commit('SET_AUTHENTICATED',true)
            commit('SET_PERMISSION',response.data.user_type)
            rootState.base.status = "Success"
            rootState.base.showMsg = true
        }).catch((err) => {
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        });
    },
    userLogout({commit,rootState}) {
        localStorage.removeItem('token')
        localStorage.removeItem('user_type')
        commit('SET_USER',{})
        commit('SET_AUTHENTICATED',false)
        commit('SET_PERMISSION',null)
        rootState.base.showMsg = false
        rootState.base.message = []
        rootState.base.status = ""

    },
    
}

export default {
    state,
    getters,
    mutations,
    actions
}