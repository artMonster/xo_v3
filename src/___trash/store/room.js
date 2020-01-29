import { database } from '@/firebase/init'

export default {
    actions: {
        async fetchRooms({ commit, dispatch }) {
            try {
                const rooms = (await database.ref('rooms').once('value')).val() || {}
                const roomsList = Object.keys(rooms).map(key => ({...rooms[key], id: key }))
                commit('setRoom', roomsList)
                return roomsList
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createRoom({ commit, dispatch }, { title, author, isOpen, playerO, playerX, timestamp }) {
            try {
                const res = await database.ref('/rooms/').push({ title, author, isOpen, playerO, playerX, timestamp })
                    //let res = await database.ref('rooms').set(title, author, isOpen, playerO, playerX, timestamp)
                    //let resp = Object.key(res).map(key => ({...res[key], id: key }))

                commit('setRoom', res)
                return { title, author, isOpen, playerO, playerX, timestamp, id: res.key }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async changeRoom({ commit, dispatch }, id) {
            let resp = {};
            try {

                if (typeof(id) === "string") {
                    resp = (await database.ref('rooms/' + id).once('value')).val() || {}
                    resp.uid = id
                } else {
                    resp = {
                        title: "Lobby",
                        author: "root",
                        isOpen: true,
                        playerX: "test@test.com",
                        playerO: null,
                        timestamp: 1111111111111,
                    }
                }

                commit('setRoomInfo', resp)
            } catch (e) {
                commit('setError', e)

            }
        },
    },
    mutations: {
        updateRooms(state, rooms) {
            state.rooms = rooms
        },
        setRoom(state, room) {
            state.rooms.push(room)
        },
        setRoomInfo(state, resp) {
            state.roomInfo = resp
        }

    },
    state: {
        rooms: [],
    },
    getters: {
        allRooms(state) {
            return state.rooms
        },
        roomsCount(state) {
            return state.rooms.length
        },
        getRoomInfo(state) {
            return state.roomInfo
        }

    }
}