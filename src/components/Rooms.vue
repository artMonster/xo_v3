<template>
    <b-list-group>
       <room
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            :active="room.lock"
            @select-room="selectRoom">
          </room>
    </b-list-group>
</template>


<script>
import Room from "../views/blocks/Room"

export default {
    name: 'Rooms',
    components: { Room },
    data: () => ({
        rooms: [],
        loading: false
    }),
    methods: {
        async selectRoom(roomId) {
                const user = this.$store.getters.getAuthUser
                console.log(user)
                // update user locale
                const result = await this.$store.dispatch('pushIncomming', {roomId: roomId, user } ).then((resp) => {
                    this.$store.commit('SetIncommingUser', resp)
                    return resp
                })
                this.$router.push({ name: 'Room', params: { roomId: roomId, AuthUser: user }}) 
            
        }
    },
    async mounted() {
        this.loading = true
        this.rooms = await this.$store.dispatch('getRooms').then((resp) => {
            this.$store.commit('SetAllRooms', resp)
            return resp
        })
        this.loading = false
    },
}
</script>
