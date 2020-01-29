import * as api from "@/firebase/init"


export default {
    actions: {
        async fetchRooms(ctx) {
            try {
                await api.getAllRooms(rooms => {
                    ctx.commit("setRooms", rooms)
                })
            } catch (e) {
                console.log(e)
            }
        }
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms
        },
        createRoom(state, newRoom) {
            state.rooms.unshift(newRoom)
        },
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