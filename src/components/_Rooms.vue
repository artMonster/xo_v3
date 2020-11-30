<template>
    <b-list-group>
        <b-list-group-item>{{ GetAuthUser }}</b-list-group-item>
        <room
            v-for="room in GetRooms"
            :key="room.id"
            :room="room"
            :active="0"
            :lock="room.lock"
            @select-room="selectRoom">
        </room>
    </b-list-group>
</template>
<script>
import Room from "../views/blocks/Room"
import { mapGetters, mapActions } from "vuex"
export default {
    name: 'Rooms',
    components: { Room },
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapGetters(["GetRooms", "GetAuthUser"]),
    },
    methods: {
        ...mapActions(["takeRooms", "pushLocation", "pushLocation2", "leaveLocation2"]),
        // getIncommingUserCount(room) {
        //     var numb = []
        //     if (room.incoming) {
        //         numb = Object.keys(room.incoming)
        //     }
        //     return numb.length
        // },
        async selectRoom(roomId) {
            this.$router.push( { name: 'Room', params: { roomId: roomId }} )
        }
    },
    async mounted() {
        this.loading = true
        const roomId = this.$route.name
        const ua = await this.pushLocation(roomId).then( resp => { return resp })
        
        //await this.leaveLocation2(roomId).then( resp => { return resp })
        //await this.pushLocation2(roomId).then( resp => { return resp })
        await this.takeRooms().then( resp => { return resp } )
        
        this.loading = false
    },
}
</script>
