<template>
    <div class="game">
        <div class="container-fluid">
            <div class="row no-gutters justify-content-center">
                <div class="col">
                    <div class="card card-body bg-secondary">
                        {{ GetRoomIncomming }}
                    </div>
                </div>
                <div class="card card-body bg-info">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserIncomming from "./UserIncomming.vue"

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'RoomInfo',
    components: { UserIncomming },
    computed: {
        ...mapGetters(["GetRoom", "GetAuthUser", "GetRoomIncomming"]),
    },
    methods: {
        ...mapActions(["takeRoomData", "pushLocation", "pushIncomming", "takeRoomIncomming11", "takeUserIncomming"]),
        async ss(side) {
        },
        async newGameHandler() {
        },
    },
    // async updated() {
    //     if(this.GetIncommingUsersReady.length > 1 && this.theGame === 0) {
    //         await this.newGameHandler()
    //         if (this.createGameId) {
    //             console.log('gogame')
    //             this.$router.push({
    //                 name: 'Game',
    //                 params: {
    //                     roomId: this.roomId,
    //                     gameId: this.createGameId
    //                 }
    //             })
    //         }
    //         this.theGame = 1
    //     }
    // },
    async mounted() {
        this.loading = true
        const roomId = this.$route.params.roomId
        //console.log(roomId)
        var reult = await this.pushLocation(roomId).then( (resp) => { return resp })
        await this.pushIncomming(roomId).then( (resp) => { return resp })
        await this.takeRoomIncomming11(roomId).then( (resp) => { return resp } )
        //console.log(await this.takeUserIncomming('2cWoLgLS65ZHCJEknWCCBFEdh0D3'))
        
        
        
        //var loc = await this.GetAuthUser.location.id
        
        //await this.takeRoomData(loc).then( resp => { return resp } )
        //this.roomId = await this.$route.params.roomId
        //const userId = await this.$route.params.userId
        //await this.pushlocation({ roomId: this.roomId, routeName: 'Room', userId: userId }).then( resp => { return resp })
        //this.roomthis = await this.takeRoomData(this.roomId).then( resp => { return resp.data } )
        // let arr = []
        // var rgi = this.GetRoomIncomming
        // let uArr = []
        // for (let i of Object.keys(rgi)) {
        // console.log(i)
        // const ps = await this.takeUserData(i).then( resp => { return resp } )
        // this.roomIncomming.push(ps)
        // }
        // console.log(this.roomIncomming)
        // this.roomIncomming = await uArr
        this.loading = false
    },
    data: () => ({
        loading: false,
        selectSide: 0,
        roomData: [],
    }),
}

</script>
