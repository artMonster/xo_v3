<template>
  <div class="game">
    <div class="container">
    
      <div class="row justify-content-center">
        
        <div class="col-8">
          <div class="card">
            <div class="card-header bg-info p-0">
              <span class="px-3 text-white small"><b> Incomming User : {{ getIncomming.length }} / 10</b></span>
            </div>
            <div class="card-body p-0">
              <div class="pt-2">
                <b-list-group>
                  <div class="row no-gutters justify-content-center text-center" >
                    <div class="col-6">
                      <user-incomming
                        v-for="u in getIncomming" :key="u.timestamp"
                        :userdata="u"
                        :auth="getAuth"
                        @switch-user="switchUser">
                      </user-incomming>
                    </div>
                  </div>
                </b-list-group>
              </div>
            </div>
            <div class="card-footer text-center" v-if="getIncomming.length > 1"><game-form :roomId = "roomId"></game-form></div>
          </div>
        </div>
        
        <div class="col-4 bg-info">
          <p class="text-white pt-3 text-center small">RoomID : {{ roomId }} </p>
          <p class="text-white  text-center small"> {{ room.timestamp }} </p>
          <div v-if="getIncomming.length > 1">
            <div class="row justify-content-center align-items-end">
              <div class="col-6 text-center mt-3"><p class="small py-1">{{ selectSide === "o" ?  getAuth.email : '•' }} </p></div>
              <div class="col-6 text-center mt-3"><p class="small py-1"> {{ selectSide === "x" ? getAuth.email : '•' }} </p></div>
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
                   <b-button  v-if="getIncomming.length > 2" variant="warning" class="btn btn-lg" @click="newArenaHandler"> * GET ARENA * </b-button>
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
import moment from 'moment'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'GameInfo',
  data: () => ({
    loading: true,
    roomId: null,
    room: [],
    startgame: false,
    selectSide: null,
  }),
  components: { GameForm, UserIncomming, GameBoard, moment },
  computed: {
  
  ...mapGetters(["getAuth", "getIncomming"]),
  even: function () {
    return this.user.filter(function (user) {
      console.log(user)
      return number % 2 === 0
    })
  }
  },

  methods: {
    ...mapActions(["fetchRoom","pushIncomming", 'getUid', "switchUser"]),
    ss(obj) {
      this.pushIncomming({room: this.roomId, side: obj})
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
    this.room = await this.$store.getters.room
    await this.fetchRoom(this.roomId)
    //this.room.timestamp  = moment(this.room.timestamp).locale('uk').format('LL')
  },
}

</script>
