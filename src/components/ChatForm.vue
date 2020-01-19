<template>
    <div>
        <form @submit.stop.prevent="submit" ref="form"  class="row justify-content-end align-itens-center" name="chat-form">
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

import { mapMutations } from 'vuex'


export default {
    name: 'ChatForm',
    data() {
        return {
            text: '',
            userName: this.$route.params.userName,
            forUser: '',
            submittedNames: [],
            textState: null,
        }
    },
    methods: {
        ...mapMutations(['createMessage']),
        checkFormValidity() {
            let valid = this.$refs.form.checkValidity()
            this.textState = valid && this.text.length > 3 && this.text.length < 256
            return valid && this.text.length > 3 && this.text.length < 256 ? true : false
        },
        resetModal() {
            this.text = ''
            this.timeStamp =  ''
            this.forUser = ''
            this.textState = null
        },      
        submit() {

            if (!this.checkFormValidity()) {
                return
            }
            this.createMessage({
                userName: this.userName,
                forUser: this.forUser,
                text: this.text,
                timeStamp: Date.now(),
                momentStamp: Date.now(),
                id: ''+Date.now()+'',
            })
            this.resetModal()
            
        }
    }
}
</script>
