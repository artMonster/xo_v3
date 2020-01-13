<template>
  <section class="home">
    <HeaderXo />
    <main class="container-fluid mt-4">
      <div class="row">
        <div class="col-4">
          <RoomList :list="roomsObj" />
        </div>
        <div class="col-3">
          <UserList @setPrivatMessageUsers="setPrivatMessageUsers" :list="usersObj" />
        </div>
        <div class="col-5">
          <Chat :list="chatObj" :forUser="forUser" />
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
import fb from '@/firebase/init'
import moment from 'moment'


export default {
  name: 'home',
  props: {
    userName: String
  },
  components: {
    HeaderXo, RoomList, UserList, Chat
  },
  created() {

        fb.collection("chatMessages").onSnapshot( querySnapshot => {
            
            let list = []

            
            
            querySnapshot.forEach(doc => {
                list.push({
                  id: doc.id,
                  userName: doc.data().userName,
                  forUser: doc.data().forUser,
                  text: doc.data().text,
                  timeStamp: moment(doc.data().timestamp).locale('uk').format('x'),
                })
            })
            this.chatObj = list
            
        })

        fb.collection("rooms").orderBy('timeStamp', 'asc').onSnapshot( querySnapshot => {
            
            let list = []

            
            
            querySnapshot.forEach(doc => {
                list.push({
                  id: doc.id,
                  isOpen: doc.data().isOpen,
                  playerX: doc.data().playerX,
                  playerO: doc.data().playerO,
                  timeStamp: moment(doc.data().timeStamp).locale('uk').format('x'),
                })
            })
            this.roomsObj = list
            
        })

        fb.collection("users").onSnapshot( querySnapshot => {
            
            let online = [], all = [], obj = {}
            
            querySnapshot.forEach(doc => {
                obj = {
                  id: doc.id,
                  name: doc.data().name,
                  isOnline: doc.data().isOnline,
                  timeStamp: moment(doc.data().timestamp).locale('uk').format('x'), 
                }
                all.push(obj)
                
                if (doc.data().isOnline) {
                  online.push(obj)
                }
            })
            
            this.usersObj = {
              all: all,
              online: online
            }
        })
    },
  methods: {
    setPrivatMessageUsers (name) {
      this.forUser = name
      //alert(name)
    }
  },
  data() {
    return {
      forUser: '',
      chatObj: [],
      roomsObj: [],
      usersObj: {},
      stepObj: {
        id: 1,
        statsGame: [0,0,0,0,0,0,0,0,0],
        timeStamp: 10,
      }
    }
  }
}
</script>
