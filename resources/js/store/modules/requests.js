import axios from "axios";


/* STORE STATES */
const getDefaultSate = () => {
    return {
        requests:[]
    }
}

/* DEFAULT STORE STATES */
const state = getDefaultSate()


/* STORE GETTERS */
const getters = {
    getPendingRequests(state) {
        return state.requests.filter(item => item.status === 'Pending')
    },
    getRequestsLog(state) {
        return state.requests.filter(item => item.status === 'Approved' || item.status === 'Expired')
    }
}

/* STORE MUTATIONS */
const mutations = {
    /* FETCH FILE DATA FROM STORE STATES */
    GET_REQUESTS:(state,data) => {
        state.requests = data
    },


    /* UPDATE REQUESTS DATA FROM STORE STATES */
    UPDATE_REQUEST:(state,data) => {
        const index = state.requests.findIndex(item => item.request_id === data.request_id)
        state.requests.splice(index,1,data)
    },


    /* DELETE REQUESTS DATA FROM STORE STATES */
    DELETE_REQUEST:(state) => {
        
    },


    /* ADD REQUESTS DATA FROM STORE STATES */
    ADD_REQUEST:(state) => {
        
    }
}

/* STORE ACTIONS */
const actions = {
    
    /* FETCH REQUESTS DATA FROM DATABASE */
    async getRequests({commit}) {

        try {
            
            await axios.get('/api/requests').then((response) => {
                commit('GET_REQUESTS',response.data.data)
            }).catch((err) => {
                console.log(err.response.data)
            });

        } catch (error) {
            console.log(error)
        }

    },



    /* UPDATE REQUESTS DATA FROM DATABASE */
    async updateRequest({commit,state,rootState},payload) {
        rootState.base.isLoading = true
        try {
            axios.put('/api/requests/'+payload.request_id,payload).then((response) => {
                const data = Object.assign(response.data.data,payload)
                commit('UPDATE_REQUEST',data)
                rootState.base.global = Object.assign({
                    message:[{sucess:"Request successfully updated"}],
                    status: "Success",
                    showMsg:true
                })
            }).catch((err) => {
                rootState.base.global = Object.assign({
                    message:err.response.data,
                    status: "Success",
                    showMsg:true
                })
            }).finally(function(){
                rootState.base.isLoading = false
            })
        } catch (error) {
            
        }

    },




    /* DELETE REQUESTS DATA FROM DATABASE */
    async deleteRequest({commit}) {

        try {
            
        } catch (error) {
            
        }
    },

    
    
    /* ADD REQUESTS TO DATABASE */
    async addRequest({commit}) {

        try {
            
        } catch (error) {
            
        }

    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
