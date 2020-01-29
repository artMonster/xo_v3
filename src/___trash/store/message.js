import Vue from 'vue'
import { db, database } from '@/firebase/init'
import moment from 'moment'

export default {
    actions: {
        setMessagesAction({ commit }, newMessage) {
            database.ref('chatMessages').push({
                    userName: 'cont.getters.me.name',
                    forUser: newMessage.forUser,
                    text: newMessage.text,
                    timeStamp: Date.now()
                })
                //commit('addMessage', newMessage)

        },
        // async sendMessage(cont, mess) {
        //     db.collection('chatMessages').add({
        //         userName: 'cont.getters.me.name',
        //         forUser: mess.forUser,
        //         text: mess.text,
        //         timeStamp: Date.now()
        //     })
        //    
        // },
        async fetchMessages({ commit }) {

            const chatmess = await database.ref('chatMessages').then(function(snapshot) {
                var list = Object.keys(chatmess).map(key => ({...chatmess[key], id: key }))
            });
            // var list = []
            // db.collection('chatMessages').onSnapshot(querySnapshot => {
            //     querySnapshot.forEach(doc => {
            //         list.push({
            //             id: doc.id,
            //             userName: doc.data().userName,
            //             forUser: doc.data().forUser,
            //             text: doc.data().text,
            //             timeStamp: doc.data().timeStamp,
            //             momentStamp: moment(doc.data().timeStamp).fromNow()
            //         })
            //     })
            // })
            commit('updateMessages', list)
        },

    },
    mutations: {
        addMessage(state, mess) {
            state.messages.push(mess)
        },
        updateMessages(state, messages) {
            state.messages = messages
        },

    },
    state: {
        messages: [],
    },
    getters: {
        allMessages(state) {
            return state.messages
        },
        messageCount(state) {
            return state.messages.length
        }

    }
}