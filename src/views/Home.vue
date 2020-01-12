<template>
  <section class="home">
    <HeaderXo />
    <main class="container-fluid mt-4">
      <div class="row">
        <div class="col-4">
          <RoomList :list="roomObj"/>
        </div>
        <div class="col-3">
          <UserList :list="userObj"/>
        </div>
        <div class="col-5">
          <Chat :list="chatObj" />
        </div>
      </div>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src
import HeaderXo from '@/components/HeaderXo.vue'
import RoomList from '@/components/RoomList.vue'
import UserList from '@/components/UserList.vue'
import Chat from '@/components/Chat.vue'

export default {
  name: 'home',
  props: {
    name: String
  },
  components: {
    HeaderXo, RoomList, UserList, Chat
  },
  data() {
    return {
      chatObj: [{
        id: 1,
        userName: 'David',
        forUserName: '',
        text: 'Hi, How are you? What about our next meeting?',
        timeStamp: 12342342340,
      },{
        id: 2,
        userName: 'David 2',
        forUserName: '',
        text: 'Sure thing! let me know if 2pm works for you',
        timeStamp: 12234234551,
      },{
        id: 3,
        userName: 'David',
        forUserName: 'David 2',
        text: 'Sorry, I have another meeting scheduled at 2pm. Can we have it at 3pm instead?',
        timeStamp: 12345345678,
      }],
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
      },{
        id: 3,
        isOpen: false,
        playerX: 'David 2',
        playerO: 'David',
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
