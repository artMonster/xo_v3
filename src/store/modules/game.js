import * as api from "@/firebase/init"

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
        async createGame({ commit }, payload) {
            try {
                // const gameObj = {
                //     game: {
                //         option: payload.option,
                //         board: [],
                //         timestamp: Date.now(),
                //     },
                //     roomId: payload.roomId,
                // }
                // await api.addGame(gameObj, r => {
                //     return { r }
                // })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // createGame(ctx, payload) {
        //     try {
        //         api.addGame(payload, game => {
        //             ctx.commit('setGame', game.data)
        //             ctx.commit('setSteps', game.steps)
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        // async fetchRoom(ctx, payload) {
        //     try {
        //         await api.getRoom(payload, room => {
        //             ctx.commit('setRoom', room)
        //                 //const gamesObj = Object.keys(game.games).map(key => ({...game.games[key], id: key }))
        //             const incomingUserObj = Object.keys(room.incoming).map(key => ({...room.incoming[key], id: key }))
        //             ctx.commit('setIncomming', incomingUserObj)
        //                 //ctx.commit('setGame', gamesObj[0])
        //                 //ctx.commit('setSteps', gamesObj[0].steps)
        //                 //ctx.commit('setStep', gamesObj[0].step)
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        checkedStep({ commit }, step) {
            step.cells[step.s]
            var cellObj = [0, 0, 0, 0, 0, 0, 0, 0, 0]

            linesCell[step.s].forEach(check => {
                lines[check].forEach(c => {
                    if (step.s !== c) {
                        cellObj[c] = 1
                    }
                })

            })
            commit("setTaggedCoin", cellObj)
            commit("setCheckedCell", step.s)
                // try {
                //     api.addCheckedStep(step => {

            //     })
            // } catch (e) {
            //     console.log(e)
            // }
        },
        nextStep(ctx, payload) {
            const updateObj = {
                ref: payload.roomId + '/games/' + this.getters.gameInfo.id,
                obj: {
                    key: 'steps',
                    val: this.getters.getSteps
                }
            }
            try {
                // api.updateGame(updateObj, room => {
                //     console.log(room)
                //         //ctx.commit("switchRoom", room)
                // })
            } catch (e) {
                console.log(e)
            }
        }
        // fetchStep(ctx) {
        //     try {
        //         api.getSteps(step => {
        //             ctx.commit("setSteps", step)
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
    },
    mutations: {
        setIncomming(state, users) {
            state.incomming = users
        },
        setRoom(state, room) {
            state.room = room
        },
        setGame(state, game) {
            state.gameInfo = game
        },
        pushSteps(state, steps) {
            state.steps.push(steps)
        },
        setStep(state, step) {
            state.step = step
        },
        setSteps(state, steps) {
            state.steps = steps
        },
        setCells(state, cells) {
            state.cells = cells
        },
        setCheckedCell(state, checked) {
            state.checked = checked
        },
        setCheckedCoin(state, coin) {
            state.coin = coin
        },
        setTaggedCoin(state, coin) {
            state.tagged = coin
        },
    },
    state: {
        incomming: [],
        room: [],
        gameInfo: [],
        tagged: [],
        steps: [],
        step: [],
        coin: [10, 10, 10, 10, 10, 10, 10, 10, 10],
        cells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        checked: false,
    },
    getters: {
        room(state) {
            return state.room
        },
        getIncomming(state) {
            return state.incomming
        },
        gameInfo(state) {
            return state.gameInfo
        },
        getStep(state) {
            return state.step
        },
        getSteps(state) {
            return state.steps
        },
        taggedCell(state) {
            return state.tagged
        },
        curentCells(state) {
            return state.cells
        },
        checkedCell(state) {
            return state.checked
        },
        checkedCoin(state) {
            return state.coin
        },
        stepsCount(state) {
            return state.steps.length
        }
    }
}