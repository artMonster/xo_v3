import Vue from 'vue'
import Vuex from 'vuex'
import message from './modules/message'
import room from './modules/room'
import user from './modules/user'

//import * as getters from './getters'
//import * as actions from './actions'
//import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        room,
        user,
        message
    }
})