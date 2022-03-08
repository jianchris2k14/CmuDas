import axios from "axios";


/* STORE STATES */
const getDefaultSate = () => {
    return {
        files:[],
        file_location:[],
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
    GET_FILES:(state,fileList,user) => {
        state.files = fileList
    },


    /* UPDATE FILE DATA FROM STORE STATES */
    UPDATE_FILE:(state,file) => {
        const index = state.files.findIndex(item => item.file_id === file.file_id)
        state.files.splice(index,1,file)
    },


    /* DELETE FILE DATA FROM STORE STATES */
    DELETE_FILE:(state) => {
        
    },


    /* ADD FILE DATA FROM STORE STATES */
    ADD_FILE:(state,file) => {
        delete file.file_location
        state.files.push(file)
    },

    GET_FILE_LOCATIONS:(state,file) => {
        state.file_location = file
    },
    ADD_FILE_LOCATIONS:(state,file) => {
        state.file_location.push(file)
    }

}

/* STORE ACTIONS */
const actions = {
    
    /* FETCH FILE DATA FROM DATABASE */
    async getFileList({commit,rootState}) {
        try {
            await axios.get('/api/files').then((response) => {
                commit("GET_FILES",response.data.data)
            }).catch((err) => {

                console.log(err.response.data)

            });
            
            
            
        }catch(e) {

            console.log(e)

        }
    },



    /* UPDATE FILE DATA FROM DATABASE */
    async updateFile({commit,rootState},payload) {
        rootState.base.isLoading = true
        try {
            await axios.put('/api/files/'+payload.file_id,payload).then((response) => {
                commit("UPDATE_FILE",payload)
                //Notification
                rootState.base.global = Object.assign({
                    message:[{success:"File successfulyy updated"}],
                    status:'Success',
                    showMsg:true,
                })


            }).catch((err) => {


                //Notification
                rootState.base.global = Object.assign({
                    message:err.response.data,
                    status:'Error',
                    showMsg:true,
                })
            }).finally(function(){

                    rootState.base.isLoading = false

            });

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
    async addFile({commit,rootState},payload) {
        rootState.base.isLoading = true
        try {
            axios.post('/api/files',payload).then((response) => {
                commit("ADD_FILE",response.data.data)
                console.log(response.data)
            }).catch((err) => {
                console.log(err.response.data)
            }).finally(function(){

                rootState.base.isLoading = false
            })

        }catch(e) {

            console.log(e)

        }
    },



     /* FETCH FILE lOCATION DATA FROM DATABASE */
     async getFileLocations({commit,rootState}) {
        try {
            await axios.get('/api/filelocations').then((response) => {

                commit("GET_FILE_LOCATIONS",response.data.data)

            }).catch((err) => {

                console.log(err.response.data)

            });
            
            
            
        }catch(e) {

            console.log(e)

        }
    },

    async addFileLocation({commit,state,rootState},data) {
        rootState.base.isLoading = true
        const file_location = data.get('file_location').name.toString()
        const file_id = parseInt(data.get('file_id'))
        const file_data = state.files.find(o => o.file_id === file_id)
        const file = Object.assign(file_data,file_id,{file_location})
        try {
            axios.post('/api/filelocations',data,{ headers: {
                    'Content-Type': "multipart/form-data"
            }}).then((response) => {
                commit("ADD_FILE_LOCATIONS",file)

                //notifacation
                rootState.base.global = Object.assign({
                    message:[{success:"File successfulyy uploaded"}],
                    status:'Success',
                    showMsg:true,
                })
            }).catch((err) => {

                //Notification
                rootState.base.global = Object.assign({
                    message:err.response.data,
                    status:'Error',
                    showMsg:true,
                })
            }).finally(function(){
                rootState.base.isLoading = false
            })
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
