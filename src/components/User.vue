<template>
    <b-list-group-item :variant="me === user.email ? 'dark' : 'primary'" :active="true" class="p-0" :disabled="me === user.email">
        <div @click="me != user.email ? $emit('switch-user', user.id) : false"  class="px-3 py-2">
            <div class="d-flex w-100 justify-content-between">
                <div><span class="h4 mb-1">{{ user.nickname ? user.nickname : user.name }}</span>  <span class="small text-muted">{{ user.email }}</span></div>
                <small><b-badge variant="primary" pill>{{ user.location }}</b-badge></small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <span class="text-secondary"><small>{{ user.id }}</small></span>
                <span class="text-secondary"><small>{{ user.timestamp }}</small></span>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: Object,
    active: Boolean,
    me: String,
  },
  mounted() {
      this.user.timestamp = moment(this.room.timestamp).locale('uk').format('LL')
  },
}
</script>
