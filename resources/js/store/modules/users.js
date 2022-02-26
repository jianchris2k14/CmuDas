import axios from "axios";
import router from './../../router'

const getDefaultState = () => {
    return {
        users:[],
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
    },

}
const actions = {
    loginAccount({commit,rootState},payload) {

    },
    getUserList({commit}) {
        axios.get('/api/users').then((response) => {
            let userList = response.data.data
            commit('GET_USER_LIST',userList)
        }).catch((err) => {
            console.log(err)
        });
    },
    updateUser({commit,rootState},payload) {
         axios.put('/api/users/'+payload.user_id).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err.response.data)
        });
    },
    addUser({commit,rootState},payload) {
        rootState.base.isLoading = true
        axios.post('/api/register',payload).then((response) => {
            commit('ADD_USER',response.data)
            if(response.status === 201) {
                rootState.base.isLoading = false
                rootState.base.message = [{sucess:"Successfully registered"}]
                rootState.base.status = "Success"
                rootState.base.showMsg = true
            }else {
                rootState.base.isLoading = false
                console.log("Error")
            }
        }).catch((err) => {
            rootState.base.isLoading = false
            rootState.base.message = err.response.data
            rootState.base.status = "Error"
            rootState.base.showMsg = true
        }).finally(function() { rootState.base.isLoading = false});
    },
}
export default {
    state,
    actions,
    mutations,
    getters
}
