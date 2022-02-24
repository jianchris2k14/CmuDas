import axios from "axios";
import Vue from "vue";

const getDefaultState = () => {
    return {
        fetchusers:[]
    }
}
const state = getDefaultState()

const getters = {

}
const mutations = {
    GET_USER_LIST:(state,userList) => {
        state.fetchusers = userList
    }

}
const actions = {
    getUserList({commit}) {
        axios.get('/api/users').then((response) => {
            let userList = response.data.data
            commit('GET_USER_LIST',userList)
            console.log(response.data.data)
        }).catch((err) => {
            console.log(err)
        });
    },
    addUser({commit},payload) {
        axios.post('/api/register',payload).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err.response.data)
        });
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}
