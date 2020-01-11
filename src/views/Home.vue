<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <RoomList :list="roomObj"/>
        </div>
        <div class="col-4">
          <UserList :list="userObj"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from '@/components/RoomList.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'home',
  components: {
    RoomList, UserList
  },
  data() {
    return {
      roomObj: [{
        id: 1,
        isOpen: true,
        playerX: 'David',
        playerO: false,
      },{
        id: 2,
        isOpen: true,
        playerX: 'David 2',
        playerO: false,
      }],
      userObj: [{
        id: 1,
        name: 'David',
        timeStamp: 30,
      },{
        id: 2,
        name: 'David 2',
        timeStamp: 20,
      }],
      stepObj: {
        id: 1,
        statsGame: [0,0,0,0,0,0,0,0,0],
        timeStamp: 10,
      }
    }
  }
}
</script>
