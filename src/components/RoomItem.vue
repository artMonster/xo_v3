<template>
    <b-list-group-item :id="`r_${room.id}`" class="d-flex justify-content-between align-items-center">
        <div class="w-25 text-left m-0">
            <b-badge variant="info" pill>{{ !room.lock ? `Open` : `Close` }}</b-badge>
            <p class="h5 m-0">{{ room.title }}</p>
        </div>
        <div class="w-50 text-right">
            <div v-if="room.incoming">
                <span class="text-info">
                    <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                </span>
                <span class="rounded-pill btn btn-outline-success">
                    {{ Object.keys(room.incoming)[0].slice(0, 3) }}
                </span>
            </div>            
        </div>
        <div class="w-25 text-right">
            <button class="btn btn-outline-primary btn-sm" @click="$emit('switch-room', room.id )">go inside</button>
        </div>
    </b-list-group-item>
</template>
<script>
export default {
    name: 'RoomItem',
    props: {
        room: {
            type: Object
        }
    }
}
</script>
    