import * as api from "@/firebase/init"


export default {
    actions: {
        async fetchRooms(com) {
            try {
                await api.getAllRooms(rooms => {
                    com.commit("setRooms", rooms)
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
                await api.addRoom(roomObj, rooms => {
                    return { rooms }
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