import * as api from "@/firebase/init"


export default {
    actions: {
        async getRooms({ commit }) {
            try {
                return new Promise((resolve) => {
                    api.getAllRooms(resp => resolve(resp))
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getRoomIncomming({ commit }, payload) {
            try {
                return new Promise((resolve) => {
                    console.log(this)
                    api.getIncomming(payload, resp => resolve(resp))
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createRoom({ commit, dispatch }, room) {
            try {
                const user = await dispatch('getUid')
                const roomObj = {
                    title: room.title,
                    lock: room.lock,
                    author: user.id,
                    timestamp: Date.now()
                }
                return new Promise((resolve) => {
                    api.addRoom(roomObj, resp => resolve(resp))
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async pushIncomming({ commit, dispatch }, { roomId, user, side = null }) {
            // api.updateRoom()
            user = { side: side, timestamp: Date.now() }
            try {
                const updateIncommingObj = {
                    user,
                    room: roomId,

                    timestamp: Date.now()
                }
                return new Promise((resolve) => {
                    api.updateRoom(updateIncommingObj, resp => resolve(resp))
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
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