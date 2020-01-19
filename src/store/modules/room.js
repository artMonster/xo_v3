import db from '@/firebase/init'

export default {
    actions: {
        async fetchRooms(cont) {
            var list = []
            db.collection("rooms").orderBy('timeStamp', 'desc').onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        roomTitle: doc.data().roomTitle,
                        isOpen: doc.data().isOpen,
                        playerX: doc.data().playerX,
                        playerO: doc.data().playerO,
                        timeStamp: doc.data().timeStamp,
                    })
                })
            })
            cont.commit('updateRooms', list)
        },
    },
    mutations: {
        updateRooms(state, rooms) {
            state.rooms = rooms
        },
        createRoom(state, newRoom) {
            state.rooms.unshift(newRoom)
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

        }

    }
}