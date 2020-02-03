import * as api from "@/firebase/init"



export default {
    actions: {
        async login({ commit }, { email, password }) {
            return await api.auth.signInWithEmailAndPassword(email, password).then(resp => {
                let result = {
                    _new: resp.additionalUserInfo.isNewUser,
                    id: resp.user.uid,
                    email: resp.user.email,
                    name: resp.user.displayName,
                }
                return result

            })


        },
        // async log2in({ commit }, { email, password }) {
        //     try {
        //         return new Promise((resolve, reject) => {
        //             api.auth.signInWithEmailAndPassword(email, password)
        //                 .then(resp => resolve(resp))
        //                 .catch(() => reject)
        //         })
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },
        async logout({ commit }) {
            try {
                var resp = await api.auth.signOut()
                commit('clearInfo')
                return resp
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUid({ commit }) {
            try {
                let user = await api.auth.currentUser
                    //console.log(user)
                let result = {
                    _new: false,
                    id: user.uid,
                    email: user.email,
                    name: user.displayName,
                }
                return result
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    mutations: {
        ///
        setAuthUser(state, aU) {
            state.AuthUser = aU
        },
        ///
        setAuth(state, info) {
            state.authInfo = info
        },
        clearInfo(state) {
            state.authInfo = []
        },
        switchRoom(state, room) {
            state.authInfo.room = room
        },
        switchGame(state, room) {
            state.authInfo.room = room
        }
    },
    state: {
        AuthUser: []
    },
    getters: {
        getAuthUser(state) {
            return state.AuthUser
        }
    }
}