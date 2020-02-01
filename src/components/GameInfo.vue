<template>
  <div class="game">
    <div class="container-fluid">
    
      <div class="row no-gutters justify-content-center">
        
        <div class="col-7">
          <div class="card">
            <div class="card-header bg-info p-0">
              <span class="px-3 text-white small"><b> Incomming User : {{ incommingUser.length }} / 10</b></span>
            </div>
            <div class="card-body p-0">
                <b-list-group>
                      <user-incomming
                        v-for="u in incommingUser"
                        :key="u.timestamp"
                        :userdata="u"
                        :auth="getAuthUser"
                        @switch-user="switchUser">
                      </user-incomming>
                </b-list-group>
            </div>
            <div class="card-footer text-center" v-if="incommingUser.length > 1"><game-form :roomId = "roomId"></game-form></div>
          </div>
        </div>
        
        <div class="col-5 bg-info">
          <p class="text-white pt-3 text-center small">RoomID : {{ roomId }} </p>
          <p class="text-white  text-center small"> {{ room.timestamp }} </p>
          <div v-if="incommingUser.length > 1">
            <div class="row no-gutters justify-content-center align-items-end">
              <div class="col-6 text-center mt-3"><p class="small py-1">{{ selectSide === "o" ?  getAuthUser.email : '•' }} </p></div>
              <div class="col-6 text-center mt-3"><p class="small py-1"> {{ selectSide === "x" ? getAuthUser.email : '•' }} </p></div>
              <dd class="col-3 text-center mb-2">
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="ch_o" name="side" value="o" @click="ss('o')" v-model="selectSide"/>
                    <label class="custom-control-label text-light" for="ch_o"> [ o ] </label>
                  
                </div>
                
              </dd>
              <dd class="col-3 text-center mt-3 small">   Choise Side  </dd>
              <dd class="col-3 text-center mb-2">
                <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="ch_x" name="side" value="x" @click="ss('x')" v-model="selectSide" />
                    <label class="custom-control-label text-light" for="ch_x"> [ x ] </label>
                </div>
                
              </dd>
              
              <div class="col-12">
                <div class="my-3 text-center pt-3">
                   <b-button  v-if="incommingUser.length > 2" variant="warning" class="btn btn-lg" @click="newArenaHandler"> * GET ARENA * </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
      
      <div v-if="startgame" class="row justify-content-center text-center">
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
    incommingUser: [],
    startgame: false,
    selectSide: null,
  }),
  components: { GameForm, UserIncomming, GameBoard },
  computed: mapGetters(["getAuthUser", "getIncomming"]),
  methods: {
    ...mapActions(["getRoomIncomming","pushIncomming", 'getUid', "switchUser"]),
    ss(obj) {
      const user = this.getAuthUser()
      this.pushIncomming({roomId: this.roomId, userId: user.id, side: obj, })
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
   
    this.roomId = await this.$route.params.roomId
    this.incommingUser = await this.getRoomIncomming(this.roomId).then((resp) => {
      this.$store.commit('SetIncommingUser', resp)
      console.log(resp)
      return resp
    })
    
    //
    //this.fetchRoom(this.$route.params.roomId)
    //this.room.timestamp  = moment(this.room.timestamp).locale('uk').format('LL')
  },
}

</script>
