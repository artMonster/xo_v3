<template>
    <div class="row justify-content-center">
        <div class="col-10 py-3 text-right">
            <button class="btn btn-primary" @click="leaveRoom">Leave to Place <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon></button>
        </div>
        <div class="col-10">
            {{ roomInfo }}
        </div>
        <div class="col-10 mt-4">
             {{ userInRoomList }}
            <b-list-group>
                <user-item v-for="(user, index) of userInRoomList" :key="index" :user="user" @choice-side="choiceSide"></user-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import * as api from '@/firebase/init'
import RoomItem from './RoomItem.vue'
import UserItem from './UserItem.vue'

export default {
    name: 'TheRoomInfo',
    components: {
        RoomItem, UserItem
    },
    methods: {
        fetchItem: async function () {

            const tr = this.$route.params.roomId

            const com = (ctx) => {
                var ur = []
                if (ctx){
                    ur = Object.keys(ctx)
                    this.userInRoomList = []
                    for (let index = 0; index < ur.length; index++) {
                        gu(ur[index])
                    }
                    this.roomInfo = ctx ? [ctx] : []
                }
            }
            
            const dis = (res) => {
                this.userInRoomList.push(res)
            }

            var gu = ((resp) => {
                 api.database.ref(`users/` + resp).on('value', (
                     function(snapshot) {
                         var itemList = snapshot && snapshot.val() ? snapshot.val() : []
                         dis(itemList)
                     }) 
                 )
            })

            var re = ((resp) => {
                api.database.ref(`rooms/` + tr).on('value', (
                    function(snapshot) {
                        var itemListIncomming = snapshot && snapshot.val().incoming ? snapshot.val().incoming : []
                        com(itemListIncomming)
                    }) 
                )
            })
            re()
        },
        choiceSide: function (roomId) {

        },
        switchRoom: async function () {
            const roomId = this.$route.params.roomId
            const userId = this.$route.params.userId
            let upd = {}
                upd["/rooms/" + roomId + "/incoming/" + userId] = { timestamp: Date.now() }
            await api.database.ref().update(upd)
        },
        leaveRoom: function () {
            const roomId = this.$route.params.roomId
            const userId = this.$route.params.userId
            
            api.database.ref("/rooms/" + roomId + "/incoming/" + userId).remove()
            this.$router.push({ name: 'Home', params: { roomId: 'home' } })
        },
    },
    async mounted() {
        await this.switchRoom()
        this.fetchItem()
    },
    data() {
        return {
            me: null,
            roomInfo: [],
            userInRoomList: []
        }
    }
    
}
</script>
