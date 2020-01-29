<template>
  <section class="userSection">
    <div class="card">
      <div class="card-header bg-info p-0">
        <span class="px-3 text-white small"><b> {{ roomsCount }} </b></span>
      </div>
      <div class="card-body p-0">
        <b-list-group>
          <room
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
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
  computed: mapGetters(["rooms", "roomsCount"]),
  methods: {
    ...mapActions(["fetchRooms", "setUser"]),
    async selectRoom(room) {
      try {
        await this.$router.push({ name: 'game', params: { roomId: room, }}) 
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: { Room, RoomForm },
  async mounted() {
    await this.fetchRooms()
  },
}

</script>
