<template>
    <b-list-group-item class="p-0" variant="success">
        <div @click="me != user.email ? $emit('switch-user', user.id) : false"  class="px-3 py-2">
            <div class="d-flex w-100 justify-content-between">
                <div><span class="h4 mb-1">{{ user.nickname ? user.nickname : user.name }}</span>  <span class="small text-muted">{{ user.email }}</span></div>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <span class="text-secondary"><small>{{ user.timestamp }}</small></span>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>
export default {
  name: 'UserIncomming',
  props: {
    user: Object,
  }
}
</script>
