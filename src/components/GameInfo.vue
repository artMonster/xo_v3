<template>
  <div class="game">
    <div class="container-fluid">
    
      <div class="row no-gutters justify-content-center">
        
       
        
        <div class="col-md-5 bg-secondary">
          <p class="text-white pt-3 text-center small">RoomID : {{ roomId }} </p>
          <p class="text-white  text-center small"> {{ room.timestamp }} </p>
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
              <div class="col-12">
                <div class="my-3 text-center pt-3">
                   <b-button variant="warning" class="btn btn-lg" @click="newArenaHandler"> * Start tournaments * </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card">
            <div class="card-header bg-info p-0">
              <span class="px-3 text-white small">Ready: <b>{{ GetIncommingUsersReady.length }}</b></span>
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
            <div v-if="GetIncommingUsersReady.length > 1" class="card-footer text-center">
              <game-form :roomId="roomId"></game-form>
              <b-button v-if="GetIncommingUsersReady.length > 2"  variant="warning" class="btn btn-lg" @click="newArenaHandler"> *** Start tournaments *** </b-button>
            </div>
          </div>
        </div>
      
      </div>
      
      <div hidden class="row justify-content-center text-center">
        <div class="col-6 bg-dark">
          <game-board></game-board>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GameBoard from './GameBoard'
import UserIncomming from "./UserIncomming.vue"
import GameForm from "./GameForm.vue"


import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'GameInfo',
  data: () => ({
    loading: true,
    roomId: null,
    room: [],
    preGame: [],
    selectSide: null,
  }),
  components: { GameForm, UserIncomming, GameBoard },
  computed: mapGetters(["getAuthUser", "GetIncommingUsers", "GetIncommingUsersReady"]),
  methods: {
    ...mapActions(["getRoomIncomming","pushIncomming", 'getUid', "switchUser"]),
    async ss(side) {
      const userId = await this.$route.params.user.id
      this.preGame = await this.pushIncomming({roomId: this.roomId, userId: userId, side: side })
      //this.pushIncomming({roomId: this.roomId, userId: user.id })
    },
    selectHandler() {
      this.createGame({
          option: this.option,
          roomId: this.roomId,
      })
    },
    newArenaHandler() {
        this.createGame({
            option: this.option,
            roomId: this.roomId,
        })
      },
    },
  async mounted() {
    this.loading = true
    this.roomId = this.$route.params.roomId
    await this.getRoomIncomming(this.roomId).then( resp => { return resp })
    this.loading = false
    //this.roomId = await this.$route.params.roomId
    //this.incommingUser = await this.getRoomIncomming(this.roomId).then((resp) => {
      //this.$store.commit('SetIncommingUser', resp)
      //console.log(resp)
      //return resp
    //})
    
    //
    //this.fetchRoom(this.$route.params.roomId)
    //this.room.timestamp  = moment(this.room.timestamp).locale('uk').format('LL')
      
      //this.loading = false
    }
}

</script>
