<template>
  <div class="game bg-dark">
    <p class="text-center p-4">
      <button @click="plus">Creat Game</button>
    </p>
    <div class="row text-center">
      <div class="col-6">
        <span :class="gameInfo.stride === 'o' ? 'bg-primary' : ''" class="text-white text-center small p-2">[ o ]</span>
        <p class="text-white display-4"> {{  gInfo ? gInfo.o.score : '' }} </p>
    </div>
    <div class="col-6">
        <span :class="gameInfo.stride === 'x' ? 'bg-primary' : ''" class="text-white text-center small p-2"> [ x ] </span>
        <p class="text-white display-4"> {{ gInfo ? gInfo.x.score : '' }} </p>
    </div>
    </div>
    <b-list-group>
      <user
        v-for="user in users"
          :key="user.id"
          :user="user"
          :active="user.id === authInfo.id"
          :me="authInfo.email"
          @switch-user="switchUser">
        </user>
      </b-list-group>
  </div>
</template>

<script>
//import Info from './Info.vue'
import User from './User.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GameInfo',
  computed: mapGetters(['users', 'usersCount', 'authInfo', 'gameInfo']),
  methods: {
  ...mapActions(['switchUser', 'fetchUsers', 'fetchRoom', 'createGame']),
    plus(){
      this.createGame(this.authInfo)
    }
  },
  components: { User },
  async mounted() {
    this.info = await this.$route.params.roomId
    await this.fetchRoom(this.info)
    this.gInfo = await this.gameInfo
  },
  data() {
    return {
      info: null,
      gInfo: null,
    }
  },
}

</script>
