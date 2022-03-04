import axios from "axios";


/* STORE STATES */
const getDefaultSate = () => {
    return {
        files:[]
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
    GET_FILES:(state,fileList) => {
        state.files = fileList
    },


    /* UPDATE FILE DATA FROM STORE STATES */
    UPDATE_FILE:(state) => {
        
    },


    /* DELETE FILE DATA FROM STORE STATES */
    DELETE_FILE:(state) => {
        
    },


    /* ADD FILE DATA FROM STORE STATES */
    ADD_FILE:(state) => {
        
    }
}

/* STORE ACTIONS */
const actions = {
    
    /* FETCH FILE DATA FROM DATABASE */
    async getFileList({commit}) {
        try {
            await axios.get('/api/filelocations').then((response) => {
                commit("GET_FILES",response.data.data)
            }).catch((err) => {
                console.log(err.response.data)
            });
        }catch(e) {
            console.log(e)
        }
    },



    /* UPDATE FILE DATA FROM DATABASE */
    async updateFile({commit}) {
        try {

        }catch(e) {
            console.log(e)
        }
    },




    /* DELETE FILE DATA FROM DATABASE */
    async deleteFile({commit}) {
        try {

        }catch(e) {
            console.log(e)
        }
    },


    
    /* ADD FILE TO DATABASE */
    async addFile({commit}) {
        try {

        }catch(e) {
            console.log(e)
        }
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
