<template>
    <section class="Chat">
        <div class="card" >  
            <div class="card-header">
                <p class="m-0 h5">Chat for {{ forUser ? forUser : 'All' }}</p>
            </div>
            <div class="card-body p-3" style="max-height: 60vh; overflow: auto;">
                <div class="conversation-list" v-for="cm in list" :key="cm.timeStamp">
                    <div v-if="cm.forUser === ''" class="media mb-3">
                        <div class="text-center">
                            <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-2.jpg" height="48" class="rounded-circle" alt="Shreyu N">
                            <div><span class="badge badge-default">{{ cm.userName }}</span></div>
                        </div>
                        <div class="media-body">
                            <div class="ctext-wrap">
                                <small class="text-monospace text-muted">{{ cm.timeStamp }}</small>
                                <p>{{ cm.text }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="cm.forUser === newMessage.userName" class="media media-privat mb-3">
                        <div class="media-body">
                            <div class="ctext-wrap">
                                <small class="text-monospace text-muted">{{ cm.timeStamp }}</small>
                                <p>{{ cm.text }}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <img src="https://coderthemes.com/hyper/creative/assets/images/users/avatar-2.jpg" height="48" class="rounded-circle" alt="Shreyu N">
                            <div><span class="badge badge-default">{{ cm.userName }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">                   
                <form @submit.prevent="sendMessage" name="chat-form" id="chat-form">
                    <div class="row">
                        <div class="col mb-2 mb-sm-0">
                            <input type="hidden" class="mt-2 message-composer w-100" :value="'@' + forUser" />
                            <textarea class="mt-2 message-composer w-100" v-model="newMessage.text"></textarea>
                            <div class="invalid-feedback">
                                Please enter your messsage
                            </div>
                        </div>
                        <div class="col-sm-auto">
                            <div class="btn-group">                                        
                                <button type="submit" class="btn btn-primary btn-block">SEND</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Chat',
  props: ['list', 'forUser'],
  updated() {
      this.newMessage.forUser = this.forUser
  },
  data() {
      return {
          newMessage: {
            forUser: this.forUser,
            userName: this.$store.state.userName,
            text: '',
          }
          
      }
    },
    methods: mapActions({
    sendMessage (dispatch) {
        //alert(JSON.stringify(this.forUser))
      const { newMessage } = this
      dispatch('sendMessage', {
          newMessage
        })
    }
  })
}
</script>
