<template>
  <section class="roomlist">
    <div class="card border-0">
      <div class="card-header bg-dark px-3 py-2">
        <div class="row align-items-center">
          <div class="col-auto"><span><RoomForm /></span></div>
           <div class="col p-0"><span class="h4 font-weight-light text-secondary">RoomList</span></div>
          <div class="col-auto text-muted"><b> {{ roomsCount }} </b> /  ??? </div>
        </div>
      </div>
      <div class="card-body px-0 py-0">
        <table class="table table-centered table-nowrap table-sm table-hover mb-0">
          <tbody>
            <tr v-for="room in allRooms" :key="room.timestamp" class="align-content-center">
              <td class="px-3 w-50">
                <p class="m-0 lead">{{ room.title }}</p>
                <p class="m-0 text-muted small"><small><b>uid:</b> {{ room.uid }}</small></p>
              </td>
              <td><span><b-icon icon="x" class="h5 m-0" scale="1.1" aria-hidden="true"></b-icon> {{ room.foundation.x }}</span></td>
              <td>
                <span v-if="room.foundation.o"><b-icon icon="circle" class="h5 m-0" scale="1" aria-hidden="true"></b-icon> {{ room.foundation.o }}</span>
                <div v-else ><span><b-icon icon="circle" class="h5 m-0" scale="1" aria-hidden="true"></b-icon></span> <span class="badge badge-info">open</span></div>
              </td>
              <td class="table-action text-right px-3">
                <div class="btn-group">
                  <button v-if="!(room.playerX && room.playerO)" class="btn btn-success" name="action" :data-roomid="room.id" @click.prevent="joinRoom(room.id)">Join Room</button>
                  <button v-else class="btn btn-info" name="action"><b-icon icon="eye-fill" class="h5 m-0" scale="1.1" aria-hidden="true"></b-icon></button>
                </div>
              </td>
            </tr>                        
          </tbody>
        </table>
      </div> <!-- end card body-->
    </div> <!-- end card -->
  </section>    
</template>

<script>
import RoomForm from '@/components/RoomForm.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RoomsList',
  components: {
    RoomForm
  },
computed: mapGetters(["allRooms", "roomsCount"]),
  methods: mapActions(["fetchRooms"]),
  async mounted() {
    await this.fetchRooms()
  },
// async joinRoom(id) {
//     this.changeRoom(id)
//           try {
//             this.updateLocation({
//                 location: id,
//                 uid: this.getAuthInfo.id,
//             })
//             this.$router.push('/room')
//           } catch (e) {

//            }
//        },
}
</script>
