<template>
  <div class="game">
    <div class="container-fluid">
    
      <div class="row no-gutters justify-content-center">
        
       
        
        <div class="col-md-5 bg-secondary">
          <p class="text-white m-0 pt-3 text-center small">id: {{ roomId }} </p>
          <p class="text-white p-0 text-center small">author: {{ currentRoom.author }} </p>
          <div>
            <div class="row no-gutters justify-content-center align-items-end">
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
              <span class="px-3 text-white small">Ready: <b>{{ GetIncommingUsersReady.length }}</b></span>
              <span>{{ currentRoom.games }} | {{ countDown }}</span>
            </div>
            <div class="card-body p-0">
                <b-list-group>
                  <user-incomming
                    v-for="u in GetIncommingUsers"
                    :key="u.timestamp"
                    :userdata="u"
                    @switch-user="switchUser">
                  </user-incomming>
                  <Loader v-if="loading"/>
                </b-list-group>
            </div>
            <div v-if="GetAuthUser.id === currentRoom.author" class="card-footer text-center">
              <b-button  variant="primary" class="btn btn-lg" @click="newGameHandler">Start Game</b-button>
              <!-- <game-form :theGame="theGame" :roomId="roomId"></game-form> -->
              <b-button v-if="GetIncommingUsersReady.length > 2"  variant="warning" class="btn btn-lg" @click="newArenaHandler"> *** Start tournaments *** </b-button>
            </div>
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
  name: 'GameInfo',
  data: () => ({
    loading: true,
    roomId: null,
    currentRoom: [],
    preGame: [],
    theGame: 0,
    selectSide: null,
    roomIncommint: null,
    option: {    
        stride: 0,
        score: [0,0],
    },
    countDown: 10,
    createGameId: false,
  }),
  components: { UserIncomming },
  computed: mapGetters(["GetAuthUser", "GetIncommingUsers", "GetIncommingUsersReady", "GetRoom", "gameInfo"]),
  methods: {
    ...mapActions(["createGame", "getRoomIncomming","pushIncomming", "switchUser", "getRoomData", "createGame"]),
    ...mapMutations(["setGame"]),
    async ss(side) {
      const userId = await this.$route.params.userId
      this.preGame = await this.pushIncomming({roomId: this.roomId, userId: userId, side: side })
    },
    async newGameHandler() {
      
      this.createGameId = await this.createGame({
          usersArena: this.GetIncommingUsersReady,
          option: this.option,
          roomId: this.roomId,
      }).then(resp => { 
          return resp
      })
      return true       
    },
  },
  async updated() {
    if(this.GetIncommingUsersReady.length > 1 && this.theGame === 0) {
      await this.newGameHandler()
      if (this.createGameId) {
        console.log('gogame')
        this.$router.push({ 
          name: 'Game',
            params: {
            roomId: this.roomId,
            gameId: this.createGameId
          }
        })
      }
      this.theGame = 1
    }
  },
  async mounted() {

    this.loading = true
    if (this.createGameId) {
      
    }
    this.roomId = this.$route.params.roomId
    this.currentRoom = await this.getRoomData(this.roomId)
    this.roomIncommint = await this.getRoomIncomming(this.roomId).then( resp => { return resp })
    this.loading = false
  }
}

</script>
