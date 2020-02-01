<template>
  <div class="rooms">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="lg-6" class="mb-5">
          <room-section></room-section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RoomSection from '@/components/RoomSection.vue'

export default {
  name: 'RoomsPlace',
  components: {
    RoomSection
  },
}
</script>
