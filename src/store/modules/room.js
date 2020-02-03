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
                commit('SetIncommingUsers', result)
                return result
            })

        },
        async pushIncomming({ commit }, { roomId, userId, side = 0 }) {

            let userObj = {
                id: userId,
                side: side,
                timestamp: Date.now()
            }

            let upd = {}

            upd['/users/' + userId + '/roomId/'] = roomId
            upd['/rooms/' + roomId + '/incoming/' + userId] = userObj

            var ress = api.database.ref().update(upd)

        },
        async leaveIncomming({ commit }, { roomId, userId, side = 0 }) {
            let updateUser = {
                roomId: 'RoomsPlace'
                    //timestamp: Date.now()
            }

            let upd = {}
            upd['/users/' + userId + '/roomId/'] = updateUser.roomId


            var ressUpd = api.database.ref().update(upd)
            var ressRem = api.database.ref('/rooms/' + roomId + '/incoming/' + userId).remove()

        },
        async createRoom({ commit }, { title, lock, author, timestamp = Date.now() }) {
            try {
                return await api.database.ref(`/rooms/`).push({ title, lock, author, timestamp }).then(resp => { return resp })

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