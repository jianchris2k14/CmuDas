import axios from "axios";
import router from './../../router'

const getDefaultSate = () => {
    return {
        authenticated:false,
        permission:null,
        user:{}
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
    async getUser({commit,rootState}) {
        try {
            await axios.get('/api/user').then((response) => {
                commit('SET_USER',response.data)
                commit('SET_AUTHENTICATED',true)
                commit('SET_PERMISSION',response.data.user_type)
            }).catch((err) => {

                 //Notification
                 rootState.base.global = Object.assign({
                    message: err.response.data,
                    status: 'Error',
                    showMsg: true,
                })

                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
            });
        } catch (error) {
            console.log(error)
        }
        
    },
    async userLogout({commit,rootState}) {
        localStorage.removeItem('token')
        localStorage.removeItem('user_type')
        commit('SET_USER',{})
        commit('SET_AUTHENTICATED',false)
        commit('SET_PERMISSION',null)
        rootState.base.global.showMsg = false
        rootState.base.global.status = ""
        rootState.base.global.message = []
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