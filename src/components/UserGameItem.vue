<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
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
            <b-badge class="w-auto" variant="primary">{{ userdata.email }}</b-badge><br>
            <span class="small"> {{ userdata.timestamp }} </span>
        </p>
    </b-list-group-item>
</template>
<script>
import * as api from '@/firebase/init'

export default {
    name: 'UserGameItem',
    props: {
        userInGame: {
            type: Object
        },
        theGame: {
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
        }
    },
    methods: {
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
        await this.getUser(this.userInGame.id)
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
    