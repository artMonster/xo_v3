<template>
    <div class="roominfo">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-5 bg-danger">
                    <div class="px-3 pt-1 pb-5">
                        <p class="text-white m-0 pt-3 small">id: {{ GetRoom.id }} </p>
                        <p class="text-white p-0 small">author: {{ GetRoom.author }} </p>
                        <div class="row justify-content-center align-items-end">
                            <dd class="col-3 text-center mb-2">
                                <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="ch_o" name="side" value="1" @click="ss(1)" v-model="selectSide"/>
                                    <label class="custom-control-label text-light" for="ch_o"> [ o ] </label>
                                </div>
                            </dd>
                            <dd class="col-3 text-center mt-3 small">Choise Side</dd>
                            <dd class="col-3 text-center mb-2">
                                <div class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" id="ch_x" name="side" value="2" @click="ss(2)" v-model="selectSide" />
                                    <label class="custom-control-label text-light" for="ch_x"> [ x ] </label>
                                </div>
                            </dd>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header bg-info p-0">
                            <span class="px-3 text-white small">Ready: <b> 2 </b></span>
                            <span>{{ GetRoom.games }}</span>
                        </div>
                        <div class="card-body p-0">
                            <b-list-group>
                                <user-incomming
                                    v-for="u in GetRoomIncomming"
                                    :key="u.id"
                                    :obj="u">
                                </user-incomming>
                            </b-list-group>
                        </div>
                        <!-- <div v-if="GetAuthUser.id === currentRoom.author" class="card-footer text-center">
                            <b-button  variant="primary" class="btn btn-lg" @click="newGameHandler">Start Game</b-button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserIncomming from "./UserIncomming.vue"

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'RoomInfo',
  data: () => ({
    loading: true,
    roomId: null,
    currentRoom: [],
    preGame: [],
    theGame: 0,
    selectSide: null,
    roomIncomming: [],
    option: {
        stride: 0,
        score: [0,0],
    },
    countDown: 10,
    createGameId: false,
  }),
  components: { UserIncomming },
  computed: mapGetters([
      "GetRoom",
      "GetRoomIncomming",
      "GetAuthUser",
    ]),
  methods: {
    ...mapActions([
        "getUsersData",
        "pushIncomming",
        "takeRoomData"
    ]),
    ...mapMutations(["SetIncommingUsers"]),
    async ss(side) {
      const userId = await this.$route.params.userId
      this.preGame = await this.pushIncomming({roomId: this.roomId, userId: userId, side: side })
    },
    async newGameHandler() {

      this.createGameId = await this.createGame({
          //usersArena: this.GetIncommingUsersReady,
          option: this.option,
          roomId: this.roomId,
      }).then(resp => {
          return resp
      })
      return true
    },
  },
  async updated() {
    
  },
//   async updated() {
//     if(this.GetIncommingUsersReady.length > 1 && this.theGame === 0) {
//       await this.newGameHandler()
//       if (this.createGameId) {
//         console.log('gogame')
//         this.$router.push({
//           name: 'Game',
//             params: {
//             roomId: this.roomId,
//             gameId: this.createGameId
//           }
//         })
//       }
//       this.theGame = 1
//     }
//   },
  async mounted() {
    this.loading = true
    //const result = await this.pushIncomming({roomId: params.roomId, userId: params.userId }).then(resp => { return resp })
    //await this.takeRoomData(this.$route.params.roomId).then( resp => { return resp } )
    //this.loading = false
    // for (let index = 0; index < incommingUser.length; index++) {
    //     var userId = incommingUser[index]
    //     var ud = await this.getUserData(userId)
    //     await this.SetIncommingUsers(ud)
    // }
    
    
    
    //await this.SetIncommingUsers(this.roomIncomming)
    //console.log(ddd)
    //this.roomIncomming = await this.getRoomIncomming(this.roomId).then( resp => { return resp })
    //console.log(this.roomIncomming)
    this.roomId = this.$route.params.roomId
    this.currentRoom = await this.getRoomData(this.roomId)
    this.roomIncommint = await this.getRoomIncomming(this.roomId).then( resp => { return resp })
    this.loading = false
    
  }
}

</script>
