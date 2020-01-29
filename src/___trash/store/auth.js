import { auth, database } from '@/firebase/init'

export default {
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await auth.signInWithEmailAndPassword(email, password).then((resp) => {
                    var comm = {
                        uid: resp.user.uid,
                        email: resp.user.email,
                    }
                    commit('setInfo', comm)

                    database.ref('/users/' + resp.user.uid).set({
                        uid: resp.user.uid,
                        nickname: 'nickname',
                        email: resp.user.email,
                        location: 'lobby',
                        timestamp: Date.now(),
                    }, function(e) {
                        if (e) {
                            commit('setError', e)
                        } else {
                            commit('setError', e)
                        }
                    });

                    return resp
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({ commit }) {
            await auth.signOut()
            commit('clearInfo')
        },
        async getUid({ dispatch }) {
            const user = await auth.currentUser
            return user ? { uid: user.uid, email: user.email } : null
        },
    },
    mutations: {
        setInfo(state, info) {
            state.authInfo = info
        },
        clearInfo(state) {
            state.authInfo = {}
        },
    },
    state: {
        authInfo: {}
    },
    getters: {
        getAuthInfo(state) {
            return state.authInfo
        }
    }
}