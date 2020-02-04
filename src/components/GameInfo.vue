<template>
  <div class="game">
    <div class="container-fluid">
    
      <div class="row no-gutters justify-content-center">
        
       
        
        <div class="col-md-5 bg-secondary">
          <p class="text-white pt-3 text-center small">RoomID : {{ roomId }} </p>
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
              <game-form :theGame="theGame" :roomId="roomId"></game-form>
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
import GameForm from "./GameForm.vue"


import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'GameInfo',
  data: () => ({
    loading: true,
    roomId: null,
    room: [],
    preGame: [],
    theGame: [],
    selectSide: null,
  }),
  components: { GameForm, UserIncomming },
  computed: mapGetters(["GetAuthUser", "GetIncommingUsers", "GetIncommingUsersReady"]),
  methods: {
    ...mapActions(["getRoomIncomming","pushIncomming", "switchUser"]),
    async ss(side) {
      const userId = await this.$route.params.user.id
      this.preGame = await this.pushIncomming({roomId: this.roomId, userId: userId, side: side })
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
  }
}

</script>
