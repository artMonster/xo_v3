<template>
  <div class="rooms">
    <b-container fluid>
      <b-row class="no-gutters justify-content-md-center">
        <b-col cols="lg-6" class="mb-5">
            <all-rooms></all-rooms>
            <room-form></room-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AllRooms from '@/components/Rooms.vue'
import RoomForm from '@/components/RoomForm.vue'

export default {
  name: 'RoomsPlace',
  components: {
    AllRooms, RoomForm
  },
}
</script>
