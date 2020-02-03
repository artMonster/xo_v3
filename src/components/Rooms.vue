<template>
    <b-list-group>
        <room
            v-for="(room, index) in GetAllRooms"
            :key="index"
            :room="room"
            :active="getIncommingUserCount(room)"
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
        //rooms: []
    }),
    computed: mapGetters(["GetAllRooms"]),
    methods: {
        ...mapActions(["getRooms", "pushIncomming", "getUid"]),
        getIncommingUserCount(room) {
            var numb = []
            if (room.incoming) {
                numb = Object.keys(room.incoming)
            }
            return numb.length
        },
        async selectRoom({roomId, userId}) {
            var user = await this.getUid()
            const result = await this.pushIncomming({roomId: roomId, userId: userId }).then(resp => { return resp })
            this.$router.push({ name: 'Room', params: { roomId: roomId}}) 
        }
    },
    async mounted() {
        this.loading = true
        await this.getRooms().then( resp => { return resp } )          
        this.loading = false
    },
}
</script>
