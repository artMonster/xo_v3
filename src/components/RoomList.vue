<template>
  <section class="roomlist">
    <div class="card">
      <div class="card-header">
        <span class="float-right text-muted font-12"><b>107</b> / 195 </span>
        <p class="m-0 h5">Room List</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-centered table-nowrap table-sm table-hover table-striped mb-0">
          <thead class="thead-dark">
            <tr class="align-content-center">
              <th scope="col" class="px-1 text-center">#</th>
              <th scope="col" class="px-1">Player X</th>
              <th scope="col" class="px-1">Player O </th>
              <th scope="col" class="px-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in list" :key="room.id" class="align-content-center">
              <td class="text-center"><small>{{ room.id }}</small></td>
              <td><span>{{ room.playerX }}</span></td>
              <td>
                <span v-if="room.playerO" >{{ room.playerO }}</span>
                <span v-else class="badge badge-success">open</span>
              </td>
              <td class="table-action text-right px-3">
                <a v-if="room.isOpen" href="" class="btn btn-success btn-sm">JOIN</a>
                <a v-else href="" class="btn btn-primary btn-sm">VIEW</a>
              </td>
            </tr>                        
          </tbody>
        </table>
      </div> <!-- end card body-->
    </div> <!-- end card -->
  </section>    
</template>

<script>
export default {
  name: 'RoomList',
  props: {
    list: Array
  }
}
</script>
