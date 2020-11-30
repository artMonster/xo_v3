<template>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        
        <ul class="navbar-nav align-items-center">
          <button class="btn btn-danger btn-sm" @click="logOut"><b-icon icon="box-arrow-right" aria-hidden="true"></b-icon></button>           
            <li class="nav-item">
              <a class="nav-link">
                <span class="text-info">
                <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              </span>
                 <span class="rounded-pill btn btn-outline-success btn-sm">
                    {{ GetAuthUser && GetAuthUser.id ? GetAuthUser.id.slice(0, 3) : '' }}
                </span>                
              </a>
            </li>
            <li class="nav-item">
            <a class="nav-link">
              <span class="text-info">
                <small> {{ GetAuthUser && GetAuthUser.email ? GetAuthUser.email : '' }} </small>
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
              <span class="text-warning" v-if="$route.params.gameId" >
                <small>• {{ $route.params.gameId }} </small>
              </span>
            </a>
          </li>
        </ul>
        <div class="navbar-collapse">
          <ul class="navbar-nav ml-auto align-items-center" id="navbarMain">
            <room-form v-if="GetAuthUser && GetAuthUser.emailVerified && $route.name !== `TheRoom` && $route.name !== `SingOut` " />
          </ul>
        </div>
      </nav>
    </header>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'
import * as api from '@/firebase/init'
import RoomForm from './RoomForm.vue'

export default {
  name: 'HeaderXo',
  computed: mapGetters(['GetAuthUser']),
  components: {
    RoomForm
  },
  methods: {
    
    ...mapActions(["pushLocation", "takeUserAuth", "leaveLocation2"]),
    logOut: async function () {
            const roomId = this.$route.params.roomId
            const userId = this.$route.params.userId
            api.database.ref( `users/` + userId).remove()
            this.$router.push( { name: `SingOut`, params: { roomId: `Home` } } )
        },
    leaveHandler() {
      const roomId = this.$route.params.roomId
      //const userId = this.$route.params.userId
      //this.leaveLocation2(roomId).then( resp => { return resp })
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