import * as api from "@/firebase/init"


export default {
    actions: {
        async getRooms(ct) {
            var result = []
            api.database.ref(`/rooms/`).on("value", function(snapshot) {
                snapshot && snapshot.val() ? result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
                ct.commit('SetAllRooms', result)
                return result
            })
        },
        async getRoomIncomming({ commit }, payload) {

            var result = []
            await api.database.ref(`/rooms/${payload}/incoming/`).on("value", function(snapshot) {
                snapshot && snapshot.val() ? result = Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
                return result
            })
            commit('SetIncommingUser', result)
        },
        async pushIncomming({ commit }, { roomId, userId }) {

            let userObj = {
                id: userId,
                timestamp: Date.now()
            }

            let upd = {}

            upd['/users/' + userId + '/roomId/'] = roomId
            upd['/rooms/' + roomId + '/incoming/' + userId] = userObj

            api.database.ref().update(upd, function(snapshot) {
                commit('SetIncommingUser', snapshot)
                return snapshot
            })
        },
        async createRoom({ commit }, payload) {
            try {
                // payload.timestamp = Date.now()
                // return new Promise((resolve) => {
                //     api.addRoom(payload, resp => {
                //         resolve(resp)

                //     })
                // })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // async pushI2ncomming({ commit, dispatch }, { roomId, user }) {
        //     // api.updateRoom()
        //     user.timestamp = Date.now()
        //     try {
        //         const updateIncommingObj = {
        //             room: roomId,
        //             user
        //         }
        //         return new Promise((resolve) => {
        //             api.updateRoom(updateIncommingObj, resp => resolve(resp))
        //         })
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },
    },
    mutations: {
        SetAllRooms(state, rooms) {
            state.rooms = rooms
        },

    },
    state: {
        rooms: [],
    },
    getters: {
        GetAllRooms(state) {
            return state.rooms
        }
    }
}