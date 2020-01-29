import { auth, database } from '@/firebase/init'



export default {
    actions: {
        login({ dispatch, commit }, { email, password }) {
            try {
                auth.signInWithEmailAndPassword(email, password).then((resp) => {
                    const responce = {
                        id: resp.user.uid,
                        email: resp.user.email,
                        room: 'lobby'
                    }
                    commit('setInfo', responce)
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
        getUid() {
            const user = auth.currentUser
            return user ? user.uid : null
        },
    },
    mutations: {
        setInfo(state, info) {
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
        authInfo(state) {
            return state.authInfo
        }
    }
}