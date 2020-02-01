import * as api from '@/firebase/init'

export default {
    actions: {
        async fetchUsers(ct) {
            var result = []
            api.database.ref(`/users/`).on("value", function(snapshot) {
                snapshot && snapshot.val() ? result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
                ct.commit('SetUsers', result)
                return result
            })
        },
        switchUser({ commit }, payload) {
            try {
                commit('switchUser', payload)
            } catch (e) {
                console.log(e)
            }
        },
        async getUserData({ commit }, payload) {
            var result = []
            api.database.ref(`/users/${payload}`).on("value", function(snapshot) {
                if (snapshot && snapshot.val()) {
                    result = snapshot.val()
                } else {
                    result = snapshot
                }
                commit('setAuthUser', result)
            })

            return result
        },
        async getUs2erData({ commit }, payload) {
            try {
                var result = []
                const resp = await api.database.ref(`/users/${payload}`).on("value")
                return resp

            } catch (e) {
                console.log(e)
            }

            //return snapshot
            //snapshot && snapshot.val() ? result = snapshot.val() : result = []

            //commit('setAuthUser', result)
            //return result
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
                // api.updateUser(updateObj, room => {
                //     commit("switchRoom", room)
                // })
            } catch (e) {
                console.log(e)
            }
        }
    },
    mutations: {
        SetUsers(state, users) {
            state.users = users
        },
        switchUser(state, user) {
            state._cuid = user
        },
        SetIncommingUser(state, users) {
            state.incomming = users
        }
    },
    state: {
        users: [],
    },
    getters: {
        GetAllUsers(state) {
            return state.users
        },
        checkedUser(state) {
            return state._cuid
        },
        usersCount(state) {
            return state.users.length
        }

    }
}