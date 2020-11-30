<template>
    <section class="container">
    
        <div class="row justify-content-center">
            <div class="col-12 py-3 text-right">
                <button class="btn btn-primary" @click="leaveGame">Leave Game <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon></button>
            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <div class="board bg-dark">
                            <form @submit.prevent="submit" >
                                <div class="form-group mb-0">
                                    <dl class="row align-items-center justify-content-center text-center mb-0 p-3">
                                        <dd v-for="(cell, index) of gameSteps" :key="index" class="col-4 text-center p-3">
                                            <div v-if="cell !== deffaultCell" class="custom-control custom-radio" :class="gameSteps[index] === thisStride ? 'bg-primary' : 'bg-secondary'">
                                                <input disabled type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                                                <label class="custom-control-label text-warning" :for="'ch_'+index">{{ gameSteps[index] !== deffaultCell ? gameSteps[index] : cell }}</label>
                                                <span class="text-light">{{ gameCheckedInfo[index] }}</span>
                                            </div>
                                            <div v-else class="custom-control custom-radio" :class="checkCell === index ? '' : ''" >
                                                
                                                <input @click="checkedStep({s: index, cells: gameSteps})" type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                                                <label class="custom-control-label text-light" :for="'ch_'+index">{{ gameCheckedCoin[index] }}</label>
                                                <span class="text-light">{{ gameCheckedInfo[index] }}</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="form-group text-center">
                                    <button :disabled="gameOption.stride !== thisStride" class="btn btn-primary btn-lg btn-block upp" type="submit" name="action">Add Step</button>
                                </div>
                            </form>
                            <p class="text-center text-light h5 pb-3">{{ thisStride }} <span class="rounded-pill btn btn-outline-success">{{ gameOption.score[thisStride] }} </span> </p>
                        </div>
                        <Loader v-if="loading" />
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                    <b-list-group>
                        <div class="row justify-content-around">
                            <user-game-item 
                                class="col-5"
                                v-for = "user in gameUserList"
                                :key = "user.timestamp"
                                :userInGame = "user"
                                :userAuth = "$route.params.userId"
                                :theGame = "gameInfo"
                                :roomId = "$route.params.roomId"
                            ></user-game-item>
                        </div>
                    </b-list-group>
                </div>
            </div>        
    </section>
</template>

<script>
import * as api from '@/firebase/init'
import UserGameItem from './UserGameItem.vue'

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

const linesCellNew = [
    [0, 1, 2, 3, 6, 4, 8], //[0, 3, 6],
    [0, 1, 2, 4, 7], //[0, 4],
    [0, 1, 2, 5, 8, 4, 6], //[0, 5, 7],
    [3, 4, 5, 0, 6], //[1, 3],
    [3, 4, 5, 1, 7, 0, 8, 2, 6], //[1, 4, 6, 7],
    [3, 4, 5, 2, 8], //[1, 5],
    [6, 7, 8, 0, 3, 2, 4], //[2, 3, 7],
    [6, 7, 8, 1, 4], //[2, 4],
    [6, 7, 8, 2, 5, 0, 4] //[2, 5, 6]
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
    name: 'TheGameInfo',
    components: {
        UserGameItem
    },
    
    methods: {
        fetchThisGame: async function (gameid) {
            const dis = (res) => {    
                this.gameInfo = res
                
                if (res && res.usersArena) {
                    this.gameUserList = res.usersArena
                    
                    for (let i = 0, length = res.usersArena.length; i < length; i++) {
                        if (res.usersArena[i].id === this.$route.params.userId) {
                            this.thisStride = i
                        }
                    }
                }

                if (res && res.option) {
                    this.gameOption = res.option
                }

                if (res && res.board) {
                    this.gameBoard = res.board
                    if (res.board && res.board.steps) {
                        var st = res.board.steps.length-1
                        this.gameSteps = res.board.steps[st]
                        this.gameCurentStep = res.board.steps.length
                    }
                }
            }
            const go = (id) => {
                api.database.ref(`/games/` + id).on('value', 
                    function(snapshot) {
                        if (snapshot && snapshot.val()) {
                            dis(snapshot.val())
                        }
                    }
                )
            }
            await go(gameid)
        },
        checkedStep: async function (step) {
            step.cells[step.s]
            var cellInfoArr = ['-¸', '-', '-', '-', '-', '-', '-', '-', '-']
            var cellCoinArr = ['¸', '¸', '¸', '¸', '¸', '¸', '¸', '¸', '¸']
            var meCheckedCell = []
            var vsCheckedCell = []
            var freeCell = []
            var dC = this.deffaultCell
            var tS = this.thisStride
            step.cells.find( function(value, index) {
                if (value === tS){
                    meCheckedCell.push(index)
                } else if (value !== tS && value !== dC) {
                    //console.log(value)
                    vsCheckedCell.push(index)
                } else if (value === dC) {
                    freeCell.push(index)
                }
            })

            function getLineId(arr) {
                
                var result = []
                
                for (let q = 0, length = arr.length; q < length; q++) {
                    result.push(linesCellNew[arr[q]])
                }
                return result
            }

            //var res = getLineId(meCheckedCell)
            //var res2 = getLineId(vsCheckedCell)
            
            //console.log(vsCheckedCell)
            

            for (let w = 0, length = linesCellNew[step.s].length; w < length; w++) {
                cellCoinArr[linesCellNew[step.s][w]] = 10
                console.log(linesCellNew[step.s][w])
            }
            
            function getLineIdCoint(meArr, vsArr){

                var result = []

                for (let w = 0, length = meArr.length; w < length; w++) {
                    var res = vsArr.find(el => el === meArr[w] || meArr[w])
                    if (res !== meArr[w]) {
                        var a = lines[meArr[w]]
                        result.push(...a)
                        //result.push(lines[meArr[w]])
                        //for (let e = 0, length = lines[meArr[w]].length; e < length; e++) {
                            //result.push(lines[meArr[w]][e])
                        //}
                        
                    }
                }

                return result
            }

            // function getBonusCell(meArr, vsArr) {

            //     var result = []

            //     for (let q = 0, length = meArr.length; q < length; q++) {
            //         var meQ = meArr[q]
            //         for (let w = 0, length = vsArr.length; w < length; w++) {
            //             if (meQ === vsArr[w]) {
            //                 result.push(meQ)
            //             }
            //         }
            //     }

            //     return result
            // }

            //console.log(getLineId(vsCheckedCell))
            //console.log(getLineId(meCheckedCell))

            //const res = getLineIdCoint(getLineId(meCheckedCell), getLineId(vsCheckedCell))
            //const res2 = getLineIdCoint(getLineId(vsCheckedCell), getLineId(meCheckedCell))

            //const bon = getBonusCell(res2, res)


            //console.log(res)

            // for (let q = 0, length = res.length; q < length; q++) {
            //     var score = 10
            //     if (res[q] === bon[0]) {
            //         score = 15
            //     }
            //     cellCoinArr[res[q]] = score
            // }
            

            //console.log(res2)
            //console.log(bon)
        
            // var vsLineId = []
            // var meLineId = []
            
            // for (let q = 0, length = vsCheckedCell.length; q < length; q++) {
            //     var vseQ = linesCell[vsCheckedCell[q]]
                
            //     for (let w = 0, length = vseQ.length; w < length; w++) {
            //         vsLineId.push(vseQ[w])
            //         //var lsvseQw = lines[vseQw]                    
            //         //console.log('vsLineId', vseQw)
            //         //console.log('vsLine', lsvseQw)
            //     }
            // }

            // for (let q = 0, length = meCheckedCell.length; q < length; q++) {
            //     var eQ = linesCell[meCheckedCell[q]]

            //     for (let w = 0, length = eQ.length; w < length; w++) {
                    
            //         //console.log(eQ[w])
                    
            //     }
            // }

            //console.log('vsLineId', vsLineId)
            //console.log('meLineId', meLineId)

            //console.log( vsLineId.map( el => meLineId.find( el2 => el2 !== el ) || el ) )
            
            
            // var vCQ = vsCheckedCell

            // for (let w = 0, length = vCQ.length; w < length; w++) {
            //     var vCQw = vCQ[w]
            //     var lsvCQw = lines[vCQw]

            //     console.log('vsLineId', vCQw)
            //     console.log('vsLine', lsvCQw)
            // }
/*
            var lcQ = linesCell[step.s]

            for (let w = 0, length = lcQ.length; w < length; w++) {
                var lW = lcQ[w]
                var lsW = lines[lW]
                
                console.log('lW', lW)
                console.log('lsW', lsW)
            }
*/
            //var meLines = meCheckedCell.map(mcc=>linesCell[step.s].find(ls => ls === mcc))

            //console.log('meLines', meLines)
            
            // for (let q = 0, length = linesCell[step.s].length; q < length; q++) {
            //     var eQ = linesCell[step.s][q]

            //     for (let e = 0, length = lines[eQ].length; e < length; e++) {
            //         var eE = lines[eQ]
            //         //console.log(eE)
            //         cellArr[eE] = 10
            //         for (let w = 0, length = meCheckedCell.length; w < length; w++) {
            //             //console.log(eE)
            //             if (eE.find(k => k === meCheckedCell[w])) { 
            //             }
            //         }
            //     }
            // }

            
            linesCell[step.s].forEach(check => {
            //     //console.log(lines[check])
                 lines[check].forEach(c => {
                     if (step.s !== c) {
                         if (step.cells[c] === dC) {
                             //console.log(c)
                             cellInfoArr[c] = '+'
                         }
                      
                     }
                 })
            })
            cellInfoArr[step.s] = '+'
            this.gameCheckedInfo = cellInfoArr
            this.gameCheckedCoin = cellCoinArr
            this.gameCheckedCell = step.s
        },
        submit: async function (e) { 
            const c = +e.target.radio.value
            var cc = []
                cc = this.gameSteps
                cc[c] = this.gameOption.stride

            const setStep = (data) => {
                
            const gameId = this.$route.params.gameId
                
                var stride = 0
                if (this.thisStride === 0) {
                    stride = 1
                }

                var upd = {}
                    upd[`games/` + gameId + `/board/steps/` + this.gameCurentStep ] = data
                    upd[`games/` + gameId + `/board/current/`] = data
                    upd[`games/` + gameId + `/option/score/` + this.thisStride ] = this.gameCheckedCoin[c]
                    upd[`games/` + gameId + `/option/stride/`] = stride
                    
                api.database.ref().update(upd)
                    
                console.log(upd)
            }
            
            await setStep(cc)

            this.checkCell = 10
            this.gameCheckedCoin = []

        },
        leaveGame: async function () {

            const roomId = this.$route.params.roomId
            const userId = this.$route.params.userId

            api.database.ref( `rooms/` + roomId + `/games/`).remove()
            api.database.ref( `rooms/` + roomId + `/incoming/` + userId ).remove()
            
            this.$router.push( { name: `Home`, params: { roomId: `Home` } } )
        },
    },
    async mounted() {
        const fTg = await this.fetchThisGame(this.$route.params.gameId)        
        //var str = 8
        //var arr = await this.gameSteps
        //console.log(arr)
        //console.log(arr.findIndex(k => k==str))
        //console.log(arr.indexOf(str))

        //for (let i = 0, length = lines.length; i < length; i++) {
        //  console.log(lines[i])
        //}

        this.loading = false
    },
    data() {
        return {
            thisStride: null,
            deffaultCell: 8,
            gameInfo: [],
            gameUserList: [],
            gameBoard: [],
            gameSteps: [],
            gameOption: [],
            gameCurentStep: 0,
            gameCheckedCoin: [10, 10, 10, 10, 10, 10, 10, 10, 10],
            gameCheckedInfo: ['-','-','-','-','-','-','-','-','-'],
            gameCheckedCell: false,
            checkCell: 10,
            loading: true,
        }
    }
    
}
</script>
