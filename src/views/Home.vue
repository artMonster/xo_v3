<template>
  <section class="home">
    <HeaderXo />
    <main class="container-fluid mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10 col-xl-4 pb-4">
          <div class="card">
            <div class="card-header bg-dark px-3 py-2">
              <div class="row align-items-center">
                <div class="col"><span class="h2 font-weight-light text-secondary">Room List</span></div>
                <div class="col-auto px-3"><RoomForm /></div>
              </div>
            </div>
          </div>
          <RoomList />
        </div>
        <div class="col-md-10 col-lg-4 col-xl-3 pb-4">
          <UserList />
        </div>
        <div class="col-md-10 col-lg-6 col-xl-5">
          <Chat />
          <div class="card">
            <div class="card-header bg-dark px-3 py-3">
              <div class="px-3"><ChatForm  /></div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src
import HeaderXo from '@/components/HeaderXo.vue'

import RoomList from '@/components/RoomList.vue'
import RoomForm from '@/components/RoomForm.vue'

import Chat from '@/components/Chat.vue'
import ChatForm from '@/components/ChatForm.vue'

import UserList from '@/components/UserList.vue'

//import db from '@/firebase/init'
//import moment from 'moment'


export default {
  name: 'home',
  props: {
    userName: String
  },
  components: {
    HeaderXo, RoomList, RoomForm, UserList, Chat, ChatForm
  },
}
</script>
