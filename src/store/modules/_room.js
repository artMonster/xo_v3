import * as api from '@/firebase/init'

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const linesCell = [
    [0, 3, 6],
    [0, 4],
    [0, 5, 7],
    [1, 3],
    [1, 4, 6, 7],
    [1, 5],
    [2, 3, 7],
    [2, 4],
    [2, 5, 6]
]



export default {
    actions: {
        createRoom({ commit }, payload) {
            api.addRoom(payload, room => {
                const defaultStepsCell = {
                    room: room.key,
                    current: false,
                    coin: [10, 10, 10, 10, 10, 10, 10, 10, 10],
                    state: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                }
                api.addStep(defaultStepsCell, step => {
                        //console.log(step)
                    })
                    //commit('receiveRoom', room)
            })
        },
        fetchRooms({ commit }) {

            api.getAllRooms(rooms => {
                commit('setRooms', rooms)
            })

        },
        switchRoom({ commit }, payload) {
            console.log(payload._steps)

            // const swObj = {
            //     uid: this.getters.getAuthInfo.uid,
            //     location: payload
            // }
            const roomObj = this.getters.rooms

            commit('setCurrentRoom', payload)
                //api.setUser(swObj, () => {})
        },
        cellCheckCalc({ commit }, payload) {


            console.log(commit)
            console.log(payload)

            var currentStep = this.getters.currentRoomState._currentStep.state
            var st = []
            for (let i in currentStep) {
                st.push(currentStep[i])
            }
            st[payload.current] = this.getters.currentRoomState.currentStrideUser

            // const boardObj = payload.current
            // var cellObj = []

            // linesCell[boardObj].forEach(check => {
            //     lines[check].forEach(c => {
            //         if (boardObj !== c) {
            //             cellObj.push(c)
            //         }
            //     })
            // })

            const newCell = {
                room: payload.roomUid,
                current: payload.current,
                coin: [10, 10, 10, 10, 10, 10, 10, 10, 10],
                state: st
            }
            try {
                api.updateCell(newCell, cell => {
                    //commit('setCellState', newCell)
                    //console.log(cell)
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createStep({ commit }, cont) {
            try {
                await api.addStep(cont, payload => {
                    console.log(payload)
                        //commit('setCellState', stepObj)

                    // const defaultStepsCell = {
                    //     room: stepObj.room,
                    //     current: false,
                    //     coin: stepObj.coin,
                    //     state: stepObj.state,
                    // }
                    // try {
                    //     api.updateCell(defaultStepsCell, cell => {
                    //         const roomObj = this.getters.rooms

                    //         for (const val in roomObj) {
                    //             if (roomObj[val].uid === stepObj.room) {
                    //                 commit('setCurrentRoom', roomObj[val])
                    //                     //commit('setCellState', roomObj[val]._currentStep)
                    //             }
                    //         }
                    //     })
                    // } catch (e) {
                    //     commit('setError', e)
                    //     throw e
                    // }
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms
        },
        setCurrentRoom(state, room) {
            state.currentRoom = room
        }
    },
    state: {
        rooms: {},
        currentRoom: {},
    },
    getters: {
        rooms(state) {
            return state.rooms
        },
        currentRoom(state) {
            return state.currentRoom
        },
        roomsCount(state) {
            return state.rooms.length
        }
    }
}