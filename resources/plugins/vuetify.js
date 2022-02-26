// src/plugins/vuetify.js
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
          light: {
            warning: '#FF9800',
            info: '#1E88E5',
            error: '#F44336',
            success: '#4CAF50'
          },
        },
    },
    options: {
        customProperties: true
    }
})
