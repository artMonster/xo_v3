import * as api from '@/firebase/init'

export default {
    actions: {
        fetchUsers(ctx) {
            try {
                api.getUsers(users => {
                    ctx.commit('setUsers', users)
                })
            } catch (e) {
                console.log(e)
            }
        },
        switchUser({ commit }, payload) {
            try {
                commit('switchUser', payload)
            } catch (e) {
                console.log(e)
            }
        },
        async setUser({ commit, dispatch }, room) {
            const userId = await dispatch('getUid')
            const updateObj = {
                ref: userId,
                obj: {
                    key: 'room',
                    val: room
                }
            }
            try {
                api.updateUser(updateObj, room => {
                    commit("switchRoom", room)
                })
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
            state._cuid = user
        }
    },
    state: {
        users: [],
    },
    getters: {
        users(state) {
            return state.users
        },
        usersCount(state) {
            return state.users.length
        }

    }
}