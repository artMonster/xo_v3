<template>
    <b-list-group-item class="p-0" href="#" :disabled="active" :variant="active ? 'danger' : 'primary'" @click="$emit('select-room', room.id)">
        <div class="px-3 py-2">
            <div class="d-flex w-100 justify-content-between">
                <div>
                    <span class="h4 mb-1">{{ room.title }}</span>
                    <span class="text-secondary small px-2"><small>[ {{ room.id }} ]</small></span>
                </div>
                <small><b-badge variant="info" pill>{{ active ? 'Close' : 'Open' }}</b-badge></small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <span class="text-secondary"><small>{{ room.timestamp }}</small></span>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Room',
  components: { moment },
  props: {
    room: Object,
    active: Boolean,
  },
  mounted() {
      //this.room.timestamp = moment(this.room.timestamp).locale('uk').format('LL')
  },
}
</script>
