<template>
    <b-list-group-item class="mx-0 p-0" v-if="userdata">
        <Loader v-if="loading"/>
        <div class="px-3 py-2">
            <div class="row w-100 justify-content-between">
                <div class="w-auto">
                    <div>
                        <p class="h6 mb-0">{{ userdata.nickname ? userdata.nickname : userdata.name }}</p> 
                        <span class="small text-muted">{{ userdata.email }}</span>
                    </div>
                </div>
                <div class="w-50 text-right">
                    <p class="text-secondary m-0"><small>{{ userdata.timestamp }}</small></p>
                    <b-badge :variant="userdata.side ? `success` : `secondary`" pill>{{ userdata.side ? ` [ ` + userdata.side + ` ] R` : `W` }}</b-badge>
                </div>
            </div>
        </div>
    </b-list-group-item>
</template>

<script>

import { mapActions } from 'vuex'

export default {
        name: 'UserIncomming',
        props: {
            obj: String,
        },
        methods: mapActions(["takeUserData"]),
        async mounted() {
            console.log(this.obj)
            const ps = await this.takeUserData(this.obj).then( resp => { return resp } )
            this.userdata = ps
            this.loading = false
        },
        data() {
            return {
                loading: true,
                userdata: [],
            }
        },
}
  
</script>
