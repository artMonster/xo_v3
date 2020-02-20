<template>
    <b-list-group-item :id="`r_${user.id}`" class="d-flex justify-content-between align-items-center">
        <div class="col"><p class="m-0">{{ user.name }} <br><span class="small"> {{ user.timestamp }} </span> </p></div>
        <p class="text-right m-0">
            <b-badge class="w-auto" :variant="room.author === user.id ? `success` : `primary` ">{{ user.email }}</b-badge><br>
            <b-badge variant="secondary" pill>{{ room.id }}</b-badge>
        </p>
    </b-list-group-item>
</template>
<script>
export default {
    name: 'UserItem',
    props: {
        user: {
            type: [Array, Object]
        },
        room: {
            type: [Array, Object]
        }
    },
}
</script>
    