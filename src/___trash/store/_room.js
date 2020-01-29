import * as api from '@/firebase/init'

export default {
    actions: {
        fetchRooms({ commit }) {
            api.getAllRooms(rooms => {
                commit('setRooms', rooms)
            })
        },
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms
        }
    },
    state: {
        rooms: {},
    },
    getters: {
        rooms(state) {
            return state.rooms
        },
        roomsCount(state) {
            return state.rooms.length
        }
    }
}