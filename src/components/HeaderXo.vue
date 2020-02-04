<template>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        
        <ul class="navbar-nav">
           <li class="nav-item">
            <a class="nav-link">
              <span class="text-info">
                <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-info">
                <small>{{ $route.params.user ? $route.params.user.id : '' }}</small>
                {{AU}}
              </span>
            </a>
           </li>
            <li class="nav-item">
            <a class="nav-link">
              <span class="text-success">
                <b-icon icon="flag-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-success">
                <small>{{ $route.params.roomId ? $route.params.roomId : ' game ' }}</small><br>
                <small>{{ $route.params.gameId ? $route.params.gameId : 'room' }}</small>
              </span>
            </a>
          </li>
          <router-link :to="{ name: 'SingOut' }" v-slot="{ href, navigate}">
              <li class="nav-item" >
                <a class="nav-link" :href="href" @click="navigate">
                  <span>
                    <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon>
                  </span>
                  </a>
              </li>
            </router-link>
          </ul>
        <div class="navbar-collapse">
          <ul class="navbar-nav ml-auto" id="navbarMain">
            <router-link v-if="$route.name !== `Room`" :to="{ name: 'Home'}" v-slot="{ href, route, navigate }">
              <li class="router-link-active">
                <a class="nav-link" :href="href" @click="navigate">Lobby</a>
              </li>
            </router-link>
            <router-link v-if="$route.name !== `Room`" :to="{ name: 'RoomsPlace'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                <a class="nav-link" :href="href" @click="navigate">Rooms Place</a>
              </li>
            </router-link>
            <li class="nav-item" v-if="$route.name === `Room`" >
              <a class="nav-link btn btn-primary" @click="leaveHandler"><span>Leave to Place <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon></span> </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HeaderXo',
  computed: mapGetters(['GetAuthUser']),

  methods: {
    ...mapActions(['leaveIncomming', 'leaveIncomming']),
    async leaveHandler() {
      const userId = this.$route.params.user.id
      const roomId = this.$route.params.roomId
      await this.leaveIncomming({ roomId: roomId, userId: userId })
      this.$router.push({ name: 'RoomsPlace' })
    }
  }, 
  async mounted() {
    this.AU = await this.GetAuthUser
    if (this.AU && this.AU.gameId) {
      console.log(this.AU)
      this.$router.push({ 
        name: 'Game',
        params: {
          roomId: this.AU.rootId,
          gameId: this.AU.gameId
        }
      })
    }
  },
  data() {
    return {
      loader: false,
      AU: [],
    }
  },

}

</script>