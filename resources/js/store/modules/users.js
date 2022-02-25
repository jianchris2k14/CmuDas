import axios from "axios";
import Vue from "vue";

const getDefaultState = () => {
    return {
        users:[],
        status:'',
        message:[],
        showMsg:false
    }
}
const state = getDefaultState()

const getters = {

}
const mutations = {
    GET_USER_LIST:(state,userList) => {
        state.users = userList
    },
    ADD_USER:(state,payload) => {   
        state.users.push(payload)
    }

}
const actions = {
    getUserList({commit}) {
        axios.get('/api/users').then((response) => {
            let userList = response.data.data
            commit('GET_USER_LIST',userList)
        }).catch((err) => {
            console.log(err)
        });
    },
    async addUser({commit,state},payload) {
        await axios.post('/api/register',payload).then((response) => {
            commit('ADD_USER',response.data)
            if(response.status === 201) {
                state.isSuccess = true
                state.message = [{sucess:"Successfully registered"}]
                state.status = "Success"
                state.showMsg = true
            }
        }).catch((err) => {
            console.log(err.response.data)
            state.message = err.response.data
            state.status = "Error"
            state.showMsg = true
        });
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}
