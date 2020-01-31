<template>
    <b-list-group-item class="mx-1 p-0" :variant="auth.email === user.email ? 'success' : 'secondary'">
        <div @click="$store.getters.getAuth.email != user.email ? $emit('switch-user', user.id) : false"  class="px-3 py-1 pb-3">
            <div class="d-flex w-100 justify-content-between">
                <span class="lead"><b-badge :variant="user.side ? 'success' : 'secondary'" pill>{{ user.side ? ' [ ' + user.side + ' ] ready' : 'wait' }}</b-badge></span>
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
    auth: [Object, Array]
  }
}
</script>
