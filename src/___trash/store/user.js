import { database } from '@/firebase/init'

export default {
    actions: {
        async fetchUsers({ commit, dispatch }) {
            try {
                const users = (await database.ref('users').once('value')).val() || {}
                const usersList = Object.keys(users).map(key => ({...users[key], id: key }))
                commit('setUsers', usersList)
                return usersList
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateLocation({ dispatch, commit }, { location, uid }) {
            try {
                await database.ref('users/' + uid).update({ location })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        }
    },
    state: {
        users: {},
        stand: {}
    },
    getters: {
        currentStand(state) {
            return state.stand.currentStand ? state.stand.currentStand : {}
        },
        allUsers(state) {
            return state.users
        },
        userCount(state) {
            return state.users.length
        }

    }
}