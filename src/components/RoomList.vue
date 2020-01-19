<template>
  <section class="roomlist">
    <div class="card border-0">
      
      <div class="card-body px-0 py-0">
        <table class="table table-centered table-nowrap table-sm table-hover mb-0">
          <tbody>
            <tr v-for="room in allRooms" :key="room.id" class="align-content-center">
              <td class="px-3 w-50">
                <p class="m-0 lead">{{ room.roomTitle }}</p>
                <p class="m-0 text-muted small"><small><b>id:</b> {{ room.timeStamp }}</small></p>
              </td>
              <td><span><b-icon icon="x" class="h5 m-0" scale="1.1" aria-hidden="true"></b-icon> {{ room.playerX }}</span></td>
              <td>
                <span v-if="room.playerO"><b-icon icon="circle" class="h5 m-0" scale="1" aria-hidden="true"></b-icon> {{ room.playerO }}</span>
                <div v-else ><span><b-icon icon="circle" class="h5 m-0" scale="1" aria-hidden="true"></b-icon></span> <span class="badge badge-info">open</span></div>
              </td>
              <td class="table-action text-right px-3">
                <div class="btn-group">
                  <button v-if="!(room.playerX && room.playerO)" class="btn btn-success" name="action"><b-icon icon="controller" class="h5 m-0" scale="1.1" aria-hidden="true"></b-icon></button>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RoomsList',
  computed: mapGetters(["allRooms", "roomsCount"]),
  methods: mapActions(["fetchRooms"]),
  async mounted() {
    this.fetchRooms()
  }
    
}
</script>
