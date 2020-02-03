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
        SetIncommingUsers(state, users) {
            state.incomming = users
        }
    },
    state: {
        users: [],
        incomming: [],
        incommingReady: [],
    },
    getters: {
        GetAllUsers(state) {
            return state.users
        },
        GetIncommingUsers(state) {
            return state.incomming
        },
        GetIncommingUsersReady(state, getters) {
            const obj = Object.entries(getters.GetIncommingUsers)
            var arr = []
            for (let [key, value] of obj) {
                if (value.side !== 0) {
                    arr.push(getters.GetIncommingUsers[key])
                }
            }
            return state.incommingReady = arr
        },

        //({side}) => [k, fn(v, k, i)]


        //.find(item => return item.side != 0 )
        //     console.log(side)
        //     let ready = []
        //     if (side != 0) {
        //         ready.push({ ready: side })
        //     }
        //     console.log(ready)
        //     return side
        // },
        // 0)
        // return state.incomming.find(inc => {
        //         let a = 0
        //         console.log(inc)
        //         if (inc.side != 0) {
        //             a++
        //         }

        //         return { inc: a }
        //     })
        // state.incomming.find(item => item.id === id)
        //return { check }


        // state.incomming.forEach(({ check }) => {
        //         if (check.side) {
        //             return { check }
        //         }
        //     })
        // state.incomming.map(({ id, side }) => {
        //     console.log(id)
        //     let result = {
        //         id: id,
        //         side: side
        //     }
        //     if (side === 0) {
        //         result = {}
        //     }
        //     return result
        // })
        checkedUser(state) {
            return state._cuid
        },
        usersCount(state) {
            return state.users.length
        }

    }
}