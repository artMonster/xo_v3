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
        async takeUserAuth({ commit }) {
            const userId = await api.auth.currentUser.uid
            return await new Promise((resolve) => {
                api.database.ref("users").child(userId).on("value", function(snapshot) {
                    var result = snapshot.val()
                    commit('SetAuthUser', result)
                    resolve(result)
                })
            })
        },
        async takeUserData({ commit }, userId) {
            const res = await new Promise((resolve) => {
                api.database.ref("users").child(userId).on("value", function(snapshot) {
                    const result = snapshot.val()
                    setTimeout(function() {
                        resolve(result)
                    }, 200)

                })
            })
            return res


        },
        // return await new Promise((resolve) => {
        //     api.database.ref("users")
        //         .child(payload)
        //         .on("value", snapshot => resolve(snapshot.val()))
        // })
        // switchUser({ commit }, payload) {
        //     try {
        //         commit('switchUser', payload)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },

        // async getUs2erData({ commit }, payload) {
        //     try {
        //         var result = []
        //         const resp = await api.database.ref(`/users/${payload}`).on("value")
        //         return resp

        //     } catch (e) {
        //         console.log(e)
        //     }

        //     //return snapshot
        //     //snapshot && snapshot.val() ? result = snapshot.val() : result = []

        //     //commit('setAuthUser', result)
        //     //return result
        // },
        // async setUser({ commit, dispatch }, room) {
        //     const userId = await dispatch('getUid')
        //     const updateObj = {
        //         ref: userId,
        //         obj: {
        //             key: 'room',
        //             val: room
        //         }
        //     }
        //     try {
        //         // api.updateUser(updateObj, room => {
        //         //     commit("switchRoom", room)
        //         // })
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }
    },
    mutations: {
        SetAuthUser(state, user) {
            state.authUser = user
        },
        SetUsers(state, users) {
            state.users.unshift(users)
        }
    },
    state: {
        users: [],
        authUser: [],
        allusers: []
    },
    getters: {
        GetAllUsers(state) {
            return state.allusers
        },
        GetUsers(state) {
            return state.users
        },
        // GetIncommingUsersReady(state, getters) {
        //     const obj = Object.entries(getters.GetIncommingUsers)
        //     var arr = []
        //     for (let [key, value] of obj) {
        //         if (value.side !== 0) {
        //             arr.push(getters.GetIncommingUsers[key])
        //         }
        //     }
        //     return state.incommingReady = arr
        // },
        GetAuthUser(state) {
            return state.authUser
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
        // checkedUser(state) {
        //     return state._cuid
        // },
        // usersCount(state) {
        //     return state.users.length
        // }

    }
}