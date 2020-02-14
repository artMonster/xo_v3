<template>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        
        <ul class="navbar-nav">
          <router-link :to="{ name: 'SingOut' }" v-slot="{ href, navigate}">
              <li class="nav-item" >
                <a class="nav-link" :href="href" @click="navigate">
                  <span>
                    <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon>
                  </span>
                  </a>
              </li>
            </router-link>
           <li class="nav-item">
            <a class="nav-link">
              <span class="text-info">
                <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-info">
                <small> {{ GetAuthUser.email }} </small>
              </span>
            </a>
           </li>
            <li class="nav-item">
              <a class="nav-link">
                 <span class="rounded-pill btn btn-outline-success">
                    {{ GetAuthUser.id.slice(0, 3) }}
                </span>                
              </a>
            </li>
          <li class="nav-item">
            <a class="nav-link">
              <span class="text-success">
                <b-icon icon="flag-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-success">
                <small>  {{ $route.params.roomId }} </small>
              </span>
            </a>
          </li>
          </ul>
        <div class="navbar-collapse">
          <ul class="navbar-nav ml-auto" id="navbarMain">
            <router-link v-if="$route.name !== `TheRoom`" :to="{ name: 'Home'}" v-slot="{ href, route, navigate }">
              <li class="router-link-active">
                <a class="nav-link" :href="href" @click="navigate">Lobby</a>
              </li>
            </router-link>
            <router-link v-if="$route.name !== `TheRoom`" :to="{ name: 'RoomsPlace'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                <a class="nav-link" :href="href" @click="navigate">Rooms Place</a>
              </li>
            </router-link>
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
    
    ...mapActions(["pushLocation", "takeUserAuth", "leaveLocation2"]),
    leaveHandler() {
      const roomId = this.$route.params.roomId
      const userId = this.$route.params.userId
      this.leaveLocation2(roomId).then( resp => { return resp })
      this.$router.push({ name: 'Home', params: { roomId: 'roomplace' }} )
      //this.leaveIncomming({ roomId: roomId, userId: userId })
      //
      //
    }
    // async AU() {
    //   const getU = this.GetAuthUser
    //   if (!getU.length) {
    //     const ud = await this.takeUserData(this.$route.params.userId)
    //     this.SetAuthUser(ud)
    //   }
    // },
    // getRouteParams(KeyParams) {
    //   var ParamsValue = false
    //   const RouteParams = this.$route.params ? this.$route.params : false
    //   if (RouteParams && KeyParams) {
    //     var keys = Object.keys( RouteParams )
    //     for (var i = 0; i < keys.length; i++){
    //       if (keys[i] === KeyParams) {
    //         ParamsValue = RouteParams[keys[i]]
    //       }
    //     }
    //   }
    //   return ParamsValue        
    // },
    // 
  }, 
  async mounted() {
    const roomId = this.$route.params.roomId
    const ua = await this.takeUserAuth().then( resp => { return resp })

  },
  data() {
    return {
      loader: false,
    }
  },

}

</script>