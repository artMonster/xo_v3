import * as api from '@/firebase/init'

export default {
    actions: {
        async fetchUsers({ commit }) {
            await api.getAllUsers(users => {
                commit('setUsers', users)
            })
        },
        async switchUser({ commit }, payload) {
            await commit('switchUser', payload)
        },
        setUser(ctx, room) {
            const userId = await dispatch('getUid')
            const updateObj = {
                ref: userId,
                room: room
            }
            try {
                // api.updateUser(updateObj, room => {
                //     ctx.commit("setRooms", room)
                // })
            } catch (e) {
                console.log(e)
            }
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        switchUser(state, user) {
            state.currentUser = user
        },
        setRoom(state, room) {
            state.currentUser.room = room
        }
    },
    state: {
        users: {},
        currentUser: ''
    },
    getters: {
        users(state) {
            return state.users ? state.users : {}
        },
        currentUser(state) {
            return state.currentUser ? state.currentUser : 'all'
        },
        usersCount(state) {
            return state.users.length
        }

    }
}