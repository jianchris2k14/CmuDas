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
    login({commit}) {

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}