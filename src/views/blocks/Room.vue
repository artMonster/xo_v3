<template>
    <b-list-group>
        <b-list-group-item class="p-0" href="#" :disabled="active >= 2" :variant="active > 2 ? 'danger' : 'primary'" @click="$emit('select-room', { room: room.id, user: $store.getters.getAuthUser.id })">
            <div class="px-3 py-2">
                <div class="d-flex w-100 justify-content-between">
                    <div>
                        <span class="h4 mb-1">{{ room.title }}</span>
                        <span class="text-secondary small px-2"><small>[ {{ room.id }} ]</small></span>
                    </div>
                    <small>
                        <b-badge variant="info" pill>{{ active >= 2 ? 'Close' : 'Open' }}</b-badge>
                        <b-badge v-if="lock" variant="danger" pill> lock </b-badge>
                    </small>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <span class="text-secondary"><small> {{ room.timestamp }} </small></span>
                    <div class="px-2">
                        <span class="h4 mb-1"> {{ active }} </span>
                    </div>
                </div>
            </div>
        </b-list-group-item>
    </b-list-group>
</template>


<script>

export default {
  name: 'Room',
  props: {
    room: Object,
    lock: Boolean,
    active: Number,
  }
}
</script>
