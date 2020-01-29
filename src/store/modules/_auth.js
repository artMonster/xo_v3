import { auth, database } from '@/firebase/init'



export default {
    actions: {
        login({ commit }, { email, password }) {
            try {
                auth.signInWithEmailAndPassword(email, password).then((resp) => {
                    const responce = {
                        id: resp.user.uid,
                        email: resp.user.email,
                        room: 'lobby'
                    }
                    commit('setAuth', responce)
                })

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        logout({ commit }) {
            try {
                auth.signOut()
                commit('clearInfo')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUid(ctx) {
            var result = null

            try {
                const user = await auth.currentUser

                if (user) {
                    const responce = {
                        id: user.uid,
                        email: user.email,
                        room: 'lobby',
                        game: null
                    }

                    ctx.commit('setAuth', responce)
                    return responce
                }

            } catch (e) {
                commit('setError', e)
                throw e
            }

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