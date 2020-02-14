<template>
  <section class="Home py-4">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <room-list />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template> 

<script>
import RoomList from '@/components/RoomList.vue'

export default {
  name: 'Home',
  components: {
    RoomList
  }
}
</script>
