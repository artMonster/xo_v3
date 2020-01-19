import db from '@/firebase/init'

export default {
    actions: {
        async fetchUsers(cont) {
            var list = []
            db.collection("users").orderBy('isOnline', 'desc').onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        name: doc.data().name,
                        isOnline: doc.data().isOnline,
                        timeStamp: doc.data().timeStamp,
                    })
                })
            })
            cont.commit('updateUsers', list)
        },
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        }
    },
    state: {
        users: [],
    },
    getters: {
        allUsers(state) {
            return state.users
        }

    }
}