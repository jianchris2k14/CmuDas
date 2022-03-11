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

}

/* STORE MUTATIONS */
const mutations = {
    /* FETCH FILE DATA FROM STORE STATES */
    GET_REQUESTS:(state,data) => {
        state.requests = data
    },


    /* UPDATE REQUESTS DATA FROM STORE STATES */
    UPDATE_REQUEST:(state) => {
        
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
                console.log(response.data.data)
            }).catch((err) => {
                console.log(err.response.data)
            });

        } catch (error) {
            console.log(error)
        }

    },



    /* UPDATE REQUESTS DATA FROM DATABASE */
    async updateRequest({commit}) {

        try {
            
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
