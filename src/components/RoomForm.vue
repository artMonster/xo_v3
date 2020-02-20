<template>
<li class="nav-item m-0">
  <b-button variant="primary" class="btn btn-sm" v-b-modal.modal-prevent-closing> New Room </b-button>
  <b-modal ok-only centered
    id="modal-prevent-closing"
    ref="modal"
    title="Prepare the game room"
    title-class="h4 text-center px-0 m-0"
    @ok="handleOk"
    button-size="lg"
    ok-title="Creat Room"
    footer-class="justify-content-center">
    <form ref="form" class="text-center" @submit.prevent="submitHandler">
      <b-form-group
        :state="st"
        label="Come up name"
        label-class="display-4 pb-4"
        label-for="roomTitle"
        invalid-feedback="Title is required and must be 4-15 characters long!">
        <b-form-input autofocus
          class="form-control btn-lg"
          id="roomTitle"
          v-model="roomTitle"
          :state="st"
          required>
        </b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</li>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "RoomForm",
  data() {
    return {
      roomTitle: "",
      lock: false,
      st: null,
      submittedNames: [],
      creatrRoomId: null,
    }
  },
  methods: {
    ...mapActions(["createRoom", "pushIncomming"]),
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity()
      this.st = valid && this.roomTitle.length > 3 && this.roomTitle.length < 16
      return valid && this.roomTitle.length > 3 && this.roomTitle.length < 16 ? true : false
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.submitHandler()
    },
    async submitHandler() {
      if (!this.checkFormValidity()) {
          return
        }
      const userId = this.$route.params.userId
      
      this.createRoomId = await this.createRoom({
        roomTitle: this.roomTitle,
        lock: this.lock,
        author: userId
      }).then(resp => { 
        return resp.key
      })
      
      //const resp = this.pushIncomming({roomId: this.createRoomId, userId: userId }).then(resp => { return resp })
      
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing")
        this.$router.push({ name: 'TheRoom', params: { roomId: this.createRoomId}}) 
      })
      this.roomTitle = ""
    },
  }
}
</script>