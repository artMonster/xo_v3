import * as api from "@/firebase/init"



export default {
    actions: {
        async login({ commit, dispatch }, { email, password }) {
            try {
                const sing = await api.auth.signInWithEmailAndPassword(email, password).then(r => {
                    const userObj = {
                        id: r.user.uid,
                        email: r.user.email,
                        name: 'name',
                        roomId: 'Lobby',
                        timestamp: Date.now()
                    }
                    api.addUser(userObj, r => {})
                    api.getUser(r.user.uid, r => {
                        commit('setAuth', r)
                    })
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
        getAuth(state) {
            return state.authInfo
        }
    }
}