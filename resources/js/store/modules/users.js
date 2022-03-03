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
    UPDATE_USER:(state,payload) => {
        const index = state.users.findIndex(item => item.user_id === payload.user_id)
        state.users.splice(index,1,payload)
    }

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
         axios.put('/api/users/'+payload.user_id,payload).then((response) => {
            if(response.status === 200) {
                commit('UPDATE_USER',payload)
                rootState.base.isLoading = false
                rootState.base.message = [{sucess:"Successfully Updated"}]
                rootState.base.status = "Success"
                rootState.base.showMsg = true
            }else if(response.status === 500) {
                rootState.base.isLoading = false
                rootState.base.message = ({error:"Ops! The email already taken"})
                rootState.base.status = "Error"
                rootState.base.showMsg = true
            }else {
                rootState.base.isLoading = false
                rootState.base.message = ({error:"Ops! The email already taken"})
                rootState.base.status = "Error"
                rootState.base.showMsg = true
            }
        }).catch((err) => {
            rootState.base.isLoading = false
            rootState.base.message = ({error:"Ops! The email already taken"})
            rootState.base.status = "Error"
            rootState.base.showMsg = true
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
