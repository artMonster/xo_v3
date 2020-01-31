<template>
  <section class="userSection">
  
    <div class="card">
      <div class="card-header bg-info p-0">
        <span class="px-3 text-white small"><b> {{ roomsCount }} </b></span>
      </div>
      <div class="card-body p-0">
        <b-list-group>
          <room
            v-if="roomsCount"
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            :active="room.lock"
            @select-room="selectRoom">
          </room>
        </b-list-group>
      </div>
      <div class="card-footer">
        <room-form></room-form>
      </div>
    </div>
  </section>    
</template>

<script>

import { mapGetters, mapActions } from "vuex"

import Room from "./Room.vue"
import RoomForm from "./RoomForm.vue"

export default {
  name: "RoomSection",
  data: () => ({
    loading: true,
  }),
  computed: mapGetters(["rooms", "roomsCount", "getAuth"]),
  methods: {
    ...mapActions(["fetchRooms", "pushIncomming", 'getUid']),
    async selectRoom(room) {
      try {
        await this.pushIncomming({room})
        await this.$router.push({ name: 'room', params: { roomId: room } }) 
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: { Room, RoomForm },
  async mounted() {
    const au = await this.getAuth
    var room = 'Lobby'
    const inc = this.pushIncomming({room})
    await this.fetchRooms()
    this.loading = false
    
  },
}

</script>
