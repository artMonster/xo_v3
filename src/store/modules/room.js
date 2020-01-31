import * as api from "@/firebase/init"


export default {
    actions: {
        async fetchRooms(com) {
            try {
                await api.getAllRooms(r => {
                    com.commit("setRooms", r)
                })
            } catch (e) {
                com.commit('setError', e)
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
                await api.addRoom(roomObj, r => {
                    return { r }
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async pushIncomming({ commit, dispatch }, { room, side = null }) {

            try {
                const user = await dispatch('getUid')
                const incommingObj = {
                        user: {
                            id: user.id,
                            email: user.email,
                            side: side,
                            timestamp: Date.now()
                        },
                        roomId: room,

                    }
                    //console.log(incommingObj)
                const ur = await api.updateRoom(incommingObj, r => {
                    return { r }
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms
        }
    },
    state: {
        rooms: [],
    },
    getters: {
        rooms(state) {
            return state.rooms
        },
        roomsCount(state) {
            return state.rooms ? state.rooms.length : 0
        }
    }
}