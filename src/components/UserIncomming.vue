<template>
    <b-list-group-item class="mx-1 p-0" :variant="auth.email === userdata.email ? 'success' : 'secondary'">
        <div @click="$store.getters.getAuth.email != userdata.email ? $emit('switch-user', userdata.id) : false"  class="px-3 py-1 pb-3">
            <div class="d-flex w-100 justify-content-between">
                <span class="lead"><b-badge :variant="userdata.side ? 'success' : 'secondary'" pill>{{ userdata.side ? ' [ ' + userdata.side + ' ] ready' : 'wait' }}</b-badge></span>
                <div><span class="h4 mb-1">{{ userdata.nickname ? userdata.nickname : userdata.name }}</span>  <span class="small text-muted">{{ userdata.email }}</span></div>                
            </div>
            <div class="d-flex w-100 justify-content-between">
                <span class="text-secondary"><small>{{ userdata.timestamp }}</small></span>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>
import moment from 'moment'
export default {
        name: 'UserIncomming',
        components: { moment },
        props: {
            userdata: Object,
            auth: [Object, Array]
        },
  mounted() {
    //this.userdata.timestamp = moment(this.userdata.timestamp).locale('uk').format('LL')
  },
}
  
</script>
