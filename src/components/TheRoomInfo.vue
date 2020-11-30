<template>
    <section class="container">
    
        <div class="row justify-content-center">
            <div class="col-12 py-3 text-right">
                <button class="btn btn-primary" @click="leaveRoom">Leave to Place <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon></button>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12 col-md-1 text-right">
                                <span class="display-4 m-0 p-0" style="line-height: 0.8;">{{ roomIncoming.length }}</span>
                            </div>
                            <div class="col-12 col-md-5">
                                <p class="h4 mb-2">{{ roomInfo.roomTitle }}</p>
                                <span class="text-info">
                                    <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                                </span>
                                <span class="rounded-pill btn btn-outline-success">
                                    {{ roomInfo.author ? roomInfo.author.slice(0, 3): '' }}
                                </span>
                            </div>
                            <div class="col-12 col-md-6 text-right">
                                <p class="h5">ID: {{ $route.params.roomId }}</p>
                                <span>{{ roomInfo.timestamp }}</span>
                            </div>
                        </div>
                        <Loader v-if="loading" />
                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <b-list-group>
                    <user-item 
                        v-for = "user in roomIncoming"
                        :key = "user.timestamp"
                        :isAuthor = "roomInfo.author === user.id"
                        :userincoming = "user"
                        :userAuth = "$route.params.userId"
                        :userReady = "user.ready"
                        :room = "roomInfo"
                        :roomId = "$route.params.roomId"
                    ></user-item>
                </b-list-group>
            </div>
        </div>
        
    </section>
</template>

<script>
import * as api from '@/firebase/init'
import RoomItem from './RoomItem.vue'
import UserItem from './UserItem.vue'

var _ = require('lodash');

export default {
    name: 'TheRoomInfo',
    components: {
        RoomItem, UserItem
    },
    async updated() {
        if (this.roomIncoming) {

            if (this.roomIncoming[0].ready && this.roomIncoming[1].ready && this.newGameId === 0) {

                this.loading = true

                const nG = (id) => {

                    var createGameObj = {
                        usersArena: this.roomIncoming,
                        option: {
                            stride: 0,
                            score: [0,0],
                        },
                        board: {
                            steps: [
                                [8, 8, 8, 8, 8, 8, 8, 8, 8]
                            ],
                            current: [8, 8, 8, 8, 8, 8, 8, 8, 8],
                        },
                        timestamp: Date.now(),
                    }

                    this.newGameId = api.database.ref().child('games').push().key

                    var upd = {}
                        upd['/games/' + this.newGameId] = createGameObj
                        upd['/rooms/' + id + '/games/'] = this.newGameId
                    
                        api.database.ref().update(upd)
                    
                    return this.newGameId
                }

                if (this.roomInfo.author === this.$route.params.userId) {

                    var result = await nG(this.$route.params.roomId)
                    
                    this.$router.push({
                        name: 'Game',
                        params: {
                            roomId: this.$route.params.roomId,
                            userId: this.$route.params.userId,
                            gameId: result
                        }
                    })

                } else {

                    var routeJoin = (gameId) => {
                        this.$nextTick(() => {
                            this.$router.push({ 
                                name: 'Game',
                                params: {
                                    roomId: this.$route.params.roomId,
                                    userId: this.$route.params.userId,
                                    gameId: gameId
                                }
                            })
                        })
                    }

                    api.database.ref(`/rooms/` + this.$route.params.roomId + `/games/`).once('value').then( function(snapshot) {
                        if (snapshot && snapshot.val()){
                            routeJoin(snapshot.val())
                        }
                    })

                }

            } else {

                this.loading = false

            }
        }
    },
    methods: {
        fetchThisRoom: async function (roomid) {
            const dis = (res) => {
                this.roomInfo = res
                if (res && res.incoming ) {
                    var rI = res.incoming
                    var arr = []
                    for (let [key, value] of Object.entries(rI)) {
                        
                        console.log(value.ready)

                        arr.push({
                            id: key,
                            ready: value.ready,
                            timestamp: value.timestamp
                        })
                        
                        if (value.ready) {
                            this.ready++
                        }
                        
                    }
                    this.roomIncoming = arr
                }
            }
            const go = (id) => {
                api.database.ref(`/rooms/` + id).on('value', 
                    function(snapshot) {
                        if (snapshot && snapshot.val()) {
                            dis(snapshot.val())
                        }
                    }
                )
            }
            await go(roomid)
        },
        switchRoom: async function (roomId, userId) {
            let upd = {}
                upd[`rooms/` + roomId + `/incoming/` + userId] = { timestamp: Date.now(), ready: false }
            return await api.database.ref().update(upd)
            
        },
        leaveRoom: async function () {
            const roomId = this.$route.params.roomId
            const userId = this.$route.params.userId
            api.database.ref( `rooms/` + roomId + `/incoming/` + userId ).remove()
            this.$router.push( { name: `Home`, params: { roomId: `Home` } } )
        },
    },
    async mounted() {
        var q = await this.switchRoom( this.$route.params.roomId, this.$route.params.userId )
        const ww = await this.fetchThisRoom(this.$route.params.roomId)
        this.loading = false
        
    },
    data() {
        return {
            ready: false,
            roomInfo: [],
            roomIncoming: [],
            userInRoomList: [],
            loading: true,
            newGameId: 0
        }
    }
    
}
</script>
