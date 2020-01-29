import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/_auth'
import user from './modules/user'
import room from './modules/room'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        _error: null
    },
    mutations: {
        setError(state, error) {
            state._error = error
        },
        clearError(state) {
            state._error = null
        }
    },
    getters: {
        _error(state) {
            return state._error
        }
    },
    modules: {
        auth,
        user,
        room,
        game
    }
})