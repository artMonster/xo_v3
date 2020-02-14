<template>
    <div class="row">
        <div class="col-6">
            <b-list-group>
                <room-item v-for="room of roomList" :key="room.id" :room="room" @switch-room="switchRoom"></room-item>
            </b-list-group>
        </div>
        <div class="col-6">
            <b-list-group>
                <user-item v-for="user of userList" :key="user.id" :user="user"></user-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import * as api from '@/firebase/init'
import RoomItem from './RoomItem.vue'
import UserItem from './UserItem.vue'

export default {
    name: 'RoomList',
    components: {
        RoomItem, UserItem
    },
    methods: {
        fetchItems: async function (pref = 'rooms') {
            var com = (ctx) => {
                if (pref === 'rooms') {
                    this.roomList = ctx
                } else {
                    this.userList = ctx
                }
            }
            var re = ((resp) => {
                api.database.ref(pref).on('value', (
                    function(snapshot) {
                        var itemList = snapshot && snapshot.val() ? Object.keys(snapshot.val()).map(key => ({...snapshot.val()[key], id: key })) : []
                        com(itemList)
                    }) 
                )
            })
            re()
        },
        switchRoom: async function (roomId) {
                this.$router.push({ name: 'TheRoom', params: { roomId: roomId }} )
        }
    },
    async mounted() {
        
        this.fetchItems('rooms')
        this.fetchItems('users') 
        
    },
    data() {
        return {
            roomList: [],
            userList: []
        }
    }
    
}
</script>
