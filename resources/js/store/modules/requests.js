import axios from "axios";


/* STORE STATES */
const getDefaultSate = () => {
    return {
        requests:[],
        request_form:null,
        request_document:null,
    }
}

/* DEFAULT STORE STATES */
const state = getDefaultSate()


/* STORE GETTERS */
const getters = {
    getRequests(state) {
        return state.requests.filter(item => item.status === 'Pending')
    },
    getApprovedPendingRequest(state) {
        return state.requests.filter(item => item.status === 'Approved' || item.status ==='Pending')
    },
    getRequestsLog(state) {
        return state.requests.filter(item => item.status === 'Approved' || item.status === 'Expired' || item.status === 'Denied')
    },




    totalPendingApprovedRequest(state) {
        let total = 0
        let requests = state.requests.filter(item => item.status === 'Pending')
        for(const obj in requests) {
            total++
        }
        return total
    },
    totalApprovedRequest(state) {
        let total = 0
        let requests = state.requests.filter(item => item.status === 'Approved')
        for(const obj in requests) {
            total++
        }
        return total
    },
    totalExpiredRequest(state) {
        let total = 0
        let requests = state.requests.filter(item => item.status === 'Expired')
        for(const obj in requests) {
            total++
        }
        return total
    },

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
    DELETE_REQUEST:(state,data) => {
        for(let i = 0;i<data.length;i++) {
            const index = state.requests.findIndex(item => item.request_id === data[i])
            state.requests.splice(index,1)
        }
    },


    /* ADD REQUESTS DATA FROM STORE STATES */
    ADD_REQUEST:(state) => {
        
    },
    SET_REQUEST_FORM:(state,data) => {
        state.request_form = data
    },
    SET_REQUEST_DOCUMENT:(state,data) => {
        state.request_document = data
    },

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

                //Notifaction
                rootState.base.global = Object.assign({
                    message:[{sucess:"Request successfully updated"}],
                    status: "Success",
                    showMsg:true
                })
            }).catch((err) => {

                //Notification
                rootState.base.global = Object.assign({
                    message:err.response.data,
                    status: "Error",
                    showMsg:true
                })
            }).finally(function(){
                rootState.base.isLoading = false
            })
        } catch (error) {
            
        }

    },
    async showRequestDocument({commit,rootState},payload) {
        console.log(payload)
        try {
            const file_location_data = rootState.files.file_location.find(item => item.file_id === payload.file_id)
            await axios.get('/api/filelocations/'+file_location_data.file_location_id).then((response) => {
                commit('SET_REQUEST_DOCUMENT',response.data)
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response.data)
            });
        } catch (error) {
            console.log(error)
        }
    },




    /* DELETE REQUESTS DATA FROM DATABASE */
    async deleteRequest({commit,rootState},request_id) {
        rootState.base.isLoading = true
        try {
            await axios.delete('/api/requests/'+request_id).then((response) => {
                commit('DELETE_REQUEST',response.data.data)
                 //Notifaction
                 rootState.base.global = Object.assign({
                    message:[{sucess:"Request successfully deleted"}],
                    status: "Success",
                    showMsg:true
                })
            }).catch((err) => {

                  //Notification
                  rootState.base.global = Object.assign({
                    message:err.response.data,
                    status: "Error",
                    showMsg:true
                })
            }).finally(function(){
                rootState.base.isLoading = false
            });
        } catch (error) {
            console.log(error)
        }
    },

    async deleteMultipleRequest({commit,rootState},records) {
        rootState.base.isLoading = true
        try {
            await axios.post('/api/destroyrecords',records).then((response) => {

                commit('DELETE_REQUEST',records)
                 //Notifaction
                rootState.base.global = Object.assign({
                    message:[{sucess:"Request successfully deleted"}],
                    status: "Success",
                    showMsg:true
                })
            }).catch((err) => {
                 //Notification
                 rootState.base.global = Object.assign({
                    message:err.response.data,
                    status: "Error",
                    showMsg:true
                })
            }).finally(function() {
                rootState.base.isLoading = false
            });
        } catch (error) {
            console.log(error)
        }
    },


    async showRequestForm({commit,rootState},req) {
        rootState.base.isLoading = true
        try {
            await axios.get('/api/requests/'+req.request_id).then((response) => {
                console.log(response.data)
                commit('SET_REQUEST_FORM',response.data)
            }).catch((err) => {
                console.log(err.response.data)
            }).finally(function(){
                rootState.base.isLoading = false
            });  
        } catch (error) {
            console.log(error)
        }
    },

    
    
    /* ADD REQUESTS TO DATABASE */
    async addRequest({commit,rootState},data) {
        rootState.base.isLoading = true
        const req = Object.fromEntries(data)

        try {
            await axios.post('/api/requests',data,{
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then((response) => {


                 //Notifaction
                 rootState.base.global = Object.assign({
                    message:[{sucess:"Request successfully sent"}],
                    status: "Success",
                    showMsg:true
                })
            }).catch((err) => {


                 //Notification
                 rootState.base.global = Object.assign({
                    message:err.response.data,
                    status: "Error",
                    showMsg:true
                })
            }).finally(function(){
                rootState.base.isLoading = false
            });
        } catch (error) {
            console.log(error)
        }

    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
