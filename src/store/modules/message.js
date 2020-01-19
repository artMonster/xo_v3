import db from '@/firebase/init'
import moment from 'moment'

export default {
    actions: {
        async fetchMessages(cont) {
            var list = []
            db.collection("chatMessages").orderBy('timeStamp', 'desc').onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        userName: doc.data().userName,
                        forUser: doc.data().forUser,
                        text: doc.data().text,
                        timeStamp: doc.data().timeStamp,
                        momentStamp: moment(doc.data().timeStamp).fromNow()
                    })
                })
            })
            cont.commit('updateMessages', list)
        },
    },
    mutations: {
        updateMessages(state, messages) {
            state.messages = messages
        },
        createMessage(state, newMessage) {
            state.messages.unshift(newMessage)
        }
    },
    state: {
        messages: [],
    },
    getters: {
        allMessages(state) {
            return state.messages
        }

    }
}