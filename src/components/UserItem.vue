<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
        <div class="col-1 p-0 text-center">
            <div v-if="!isAuthor">
                <div class="custom-control custom-radio">
                    <input :disabled="userdata.id !== userAuth" @click="checkedReady" :checked="userReady" class="custom-control-input" type="checkbox" :id="'ch_'+userdata.id" name="ready" />
                    <label class="custom-control-label text-light" :for="'ch_' + userdata.id"></label>
                </div>
            </div>
            <div v-else>
                <div class="custom-control custom-radio">
                    <input :disabled="userdata.id !== userAuth" @click="checkedReady" :checked="userReady" class="custom-control-input" type="checkbox" :id="'ch_'+userdata.id" name="ready" />
                    <label class="custom-control-label text-light" :for="'ch_' + userdata.id"></label>
                </div>
            </div>
        </div>
        <div class="col p-0">
            <p class="m-0">{{ userdata.name }} <br>
            <span class="text-info">
                  <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                </span>
                <span class="rounded-pill btn btn-outline-success btn-sm">
                  {{ userdata.id ? userdata.id.slice(0, 3) : ' ' }}
                </span>
            </p>
        </div>
        <p class="text-right m-0">
            <b-badge class="w-auto" :variant="room.author === userdata.id ? `success` : `primary` ">{{ userdata.email }}</b-badge><br>
            <span class="small"> {{ userdata.timestamp }} </span>
        </p>
    </b-list-group-item>
</template>
<script>
import * as api from '@/firebase/init'

export default {
    name: 'UserItem',
    props: {
        userincoming: {
            type: Object
        },
        room: {
            type: Object
        },
        roomId: {
            type: String
        },
        isAuthor: {
            type: Boolean
        },
        userAuth: {
            type: String
        },
        userReady: {
            type: Boolean
        }
    },
    methods: {
        checkedReady: function(e) {
            let upd = {}
                upd[`/rooms/` + this.roomId + `/incoming/` + this.userAuth + `/ready/`] = e.target.checked ? true : false
            api.database.ref().update(upd)
        },
        getUser: function(ob)  {

            const dis = (res) => {
                this.userdata = res
            }

            const go = (id) => {
                api.database.ref(`/users/` + id).on('value', 
                    function(snapshot) {
                        dis( snapshot && snapshot.val() ? snapshot.val() : [] )
                    }
                )
            }
            
            go(ob)
        
        }

    },
    async mounted() {        
        var ps =  await this.getUser(this.userincoming.id)
        this.loading = false
    },
    data() {
        return {
            userdata: [],
            checkReady: false
        }
    },
}
</script>
    