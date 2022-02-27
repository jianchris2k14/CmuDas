import axios from "axios";

const getDefaultSate = () => {
    return {
        status:'',
        message:[],
        showMsg:false,
        isLoading:false
    }
}
const state = getDefaultSate()

const getters =  {

}
const mutations = {
    UPDATE_MESSAGE:(state,value) => {
        state.message = value.message
        state.status = value.status
        state.showMsg = value.show
        state.isLoading = value.loading
    }
}
const actions = {

}

export default {
    state,
    actions,
    mutations,
    getters
}