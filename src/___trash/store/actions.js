import fb from '@/firebase/init'
//import * as api from '../api'
/*
export const getAllMessages = ({ commit }) => {
    api.getAllMessages(messages => {
        commit('receiveAll', messages)
    })
}
*/
export const sendMessage = ({ commit }, mess) => {
    commit('receiveMessage', mess)

    fb.collection('chatMessages').add({
        userName: mess.newMessage.userName,
        forUser: mess.newMessage.forUser,
        text: mess.newMessage.text,
        timestamp: Date.now()
    })

    /*  
    api.createMessage(payload, message => {
          commit('receiveMessage', message)
      })
      */
}

/*
export const switchThread = ({ commit }, payload) => {
    commit('switchThread', payload)
}
*/