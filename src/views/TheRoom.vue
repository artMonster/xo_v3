<template>
  <section class="TheRoom">
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="12">
                <the-room-info></the-room-info>
            </b-col>
        </b-row>
    </b-container>
  </section>
</template>
<script>
//import GameInfo from '@/components/GameInfo'
import TheRoomInfo from '@/components/TheRoomInfo'

export default {
  name: 'TheRoom',
  components: { TheRoomInfo }
}

</script>