<template>
    <div>
        <form @submit.stop.prevent="submit"  class="row justify-content-end align-itens-center" name="chat-form">
            <input type="hidden" class="form-control btn-lg mt-2 message-composer w-100" v-model="forUser"  />
            <div class="form-group col-sm-9">
                <textarea class="form-control btn-lg mt-2 message-composer w-100" v-model="text" required></textarea>
            </div>
            <div class="form-group col pl-3 pt-3 pb-1">
                <button type="submit" class="btn btn-primary rounded-pill btn-block btn-lg">SEND</button>
            </div>
        </form>
    </div>
</template>

<script>

import { mapActions , mapMutations, mapGetters } from 'vuex'


export default {
    name: 'ChatForm',
    data() {
        return {
            itsme: 'this.me',
            text: '',
            forUser: '',
            submittedNames: [],
            textState: null,
        }
    },
    methods: {
        ...mapActions(['setMessagesAction']),   
        submit() {


            this.setMessagesAction({
                userName: this.itsme,
                forUser: this.forUser,
                text: this.text,
                timeStamp: Date.now(),
                momentStamp: Date.now(),
                id: ''+Date.now()+'',
            })
            
        }
    }
//     methods: mapActions({
//     sendMessage (dispatch) {
        
//       const { text, forUser } = this
//       if ( text.trim() ) {
//           dispatch('addMessage', {
//           text,
//           forUser
//         })
//         this.text = ''
//         this.forUser = ''
//       }
//     }
//   }),

}
</script>
