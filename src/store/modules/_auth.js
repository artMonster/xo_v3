import * as api from "@/firebase/init"



export default {
    actions: {
        async login({ commit }, { email, password }) {
            try {
                return new Promise((resolve, reject) => {
                        api.auth.signInWithEmailAndPassword(email, password)
                            .then(resp => resolve(resp))
                            .catch(() => reject)
                    })
                    //const sing = await api.auth.signInWithEmailAndPassword(email, password).then(r => {
                    //const userObj = {
                    //                        id: r.user.uid,
                    //email: r.user.email,
                    //name: 'name',
                    //roomId: 'Lobby',
                    //timestamp: Date.now()
                    //}
                    //api.addUser(userObj, r => {})
                    //api.getUser(r.user.uid, r => {
                    //commit('setAuth', r)
                    //})


                //Vue.http.get(url)
                //.then(response => resolve(response))
                //.catch(() => reject)
                //})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUserData({ commit }, payload) {
            try {
                return new Promise((resolve, reject) => {
                    api.getUser(payload.id, resp => resolve(resp))
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        logout({ commit }) {
            try {
                api.auth.signOut()
                commit('clearInfo')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUid(ctx) {
            const user = await api.auth.currentUser
            return new Promise((resolve, reject) => {
                api.getUser(user.uid, r => {
                    ctx.commit('setAuth', r)
                    resolve(r)
                })
            })
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
        authInfo: []
    },
    getters: {
        getAuthUser(state) {
            return state.AuthUser
        }
    }
}