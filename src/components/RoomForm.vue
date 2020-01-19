<template>
    <div>
        <b-button  variant="primary" class="pt-0 px-2" v-b-modal.modal-prevent-closing>
           <span class="h3"><b-icon icon="x-circle-fill" rotate="45" scale="1" aria-hidden="true"></b-icon></span>
        </b-button>
    <b-modal ok-only centered
      id="modal-prevent-closing"
      ref="modal"
      title="Prepare the game room"
      title-class="h4 text-center px-0 m-0"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      button-size="lg"
      ok-title="Creat Room"
      footer-class="justify-content-center"
    >
      <form ref="form" class="text-center" @submit.stop.prevent="submit">
        <b-form-group
          :state="nameState"
          label="Come up name"
          label-class="display-4 pb-4"
          label-for="roomTitle-input"
          invalid-feedback="Title is required and must be 4-15 characters long."
        >
          <b-form-input autofocus
            class="form-control  btn-lg"
            id="roomTitle-input"
            v-model="roomTitle"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      
    </b-modal>

    </div>
</template>

<script>
    
import { mapMutations } from 'vuex'

export default {
    name: 'RoomForm',
    data()  {
        return {
            roomTitle: '',
            isOpen: true,
            timeStamp: '',
            submittedNames: [],
            nameState: null,
        }
    },
    methods: {
        ...mapMutations(['createRoom']),
        checkFormValidity() {
            let valid = this.$refs.form.checkValidity()
            this.nameState = valid && this.roomTitle.length > 3 && this.roomTitle.length < 16
            return valid && this.roomTitle.length > 3 && this.roomTitle.length < 16 ? true : false
        },
        resetModal() {
            this.roomTitle = ''
            this.nameState = null
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.submit()
        },        
        submit() {

            if (!this.checkFormValidity()) {
                return
            }
            
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })

            this.createRoom({
                roomTitle: this.roomTitle,
                isOpen: true,
                playerO: null,
                playerX: this.$route.params.userName,
                timeStamp:  Date.now(),
                id: ''+Date.now()+'',
            })
            
        }
    }
}

</script>
