<template>
    <b-list-group-item :id="`r_${user.id}`" class="d-flex justify-content-between align-items-center">
        <p class="m-0">{{ user.name }} <br><span class="small"> {{ user.timestamp }} </span> </p>
        <p class="text-right m-0">
            <b-badge class="w-auto" variant="primary" pill>{{ user.email }}</b-badge><br>
            <b-badge variant="secondary" pill>{{ user.location }}</b-badge>
        </p>
    </b-list-group-item>
</template>
<script>
export default {
    name: 'UserItem',
    props: {
        user: {
            type: Object
        }
    }
}
</script>
    