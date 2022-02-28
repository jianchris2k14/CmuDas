import axios from "axios";
import router from './../../router'

const getDefaultSate = () => {
    return {
        authenticated:false,
        user:{}
    }
}
const state = getDefaultSate()

const getters = {
    authenticated(state) {
        return state.authenticated
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
    }
}
const actions = { 
    getUser({commit,rootState}) {
        axios.get('/api/user').then((response) => {
            commit('SET_USER',response.data)
            commit('SET_AUTHENTICATED',true)
            rootState.base.status = "Success"
            rootState.base.showMsg = true
        }).catch((err) => {
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        });
    },
    userLogout({commit,rootState}) {
        localStorage.removeItem('token')
        commit('SET_USER',{})
        commit('SET_AUTHENTICATED',false)
        rootState.base.showMsg = false
        rootState.base.message = []
        rootState.base.status = ""

    }
    
}

export default {
    state,
    getters,
    mutations,
    actions
}