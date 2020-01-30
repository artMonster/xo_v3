<template>
  <div class="game bg-dark">
    <div class="row text-center">
      <div class="col-12">
        <p class="text-white pt-3"> {{ roomId }} </p>
      </div>
      <div class="col-12">
        <div class="p-3">
          <b-list-group>
            <user-incomming
              v-for="(user, index) in getIncomming"
              :key="index"
              :user="user"
              @switch-user="switchUser">
            </user-incomming>
          </b-list-group>
          <game-form
            :roomId = "roomId"
          ></game-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserIncomming from "./UserIncomming.vue"
import GameForm from "./GameForm.vue"

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GameInfo',
  data: () => ({
    loading: true,
    roomId: null
  }),
  components: { GameForm, UserIncomming },
  computed: mapGetters(["getAuth", "getIncomming"]),
  methods: {
    ...mapActions(["fetchRoom","pushIncomming", 'getUid', "switchUser"]),
    },
  async mounted() {
    this.roomId = await this.$route.params.roomId
    this.fetchRoom(this.roomId)
  },
}

</script>
