import * as api from "@/firebase/init"



export default {
    actions: {
        async login({ commit }, { email, password }) {

            var log = await new Promise((resolve) => {
                api.auth.signInWithEmailAndPassword(email, password).then((resp) => {
                    var obj = {
                        id: resp.user.uid,
                        name: 'nickname',
                        email: resp.user.email,
                        location: 'lobby',
                        timestamp: Date.now(),
                    }
                    api.database.ref('/users/' + obj.id).set(obj)
                    commit('SetAuthUser', obj)
                    resolve(obj)
                })
            })
            return log
        },
        async logout({ commit }) {
            try {
                var resp = await api.auth.signOut()
                commit('ClearInfo')
                return resp
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getUid({ commit }) {
            try {
                let user = await api.auth.currentUser
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

    },
    state: {

    },
    getters: {

    }
}