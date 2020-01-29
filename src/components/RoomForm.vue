<template>
<div class="d-inline-block">
  <b-button  variant="primary" class="btn btn-sm" v-b-modal.modal-prevent-closing> New Room </b-button>
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
        label-for="title"
        invalid-feedback="Title is required and must be 4-15 characters long.">
        <b-form-input autofocus
          class="form-control btn-lg"
          id="title"
          v-model="title"
          :state="st"
          required>
        </b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "RoomForm",
  data() {
    return {
      title: "",
      lock: false,
      st: null,
      submittedNames: [],
    }
  },
  methods: {
    ...mapActions(["createRoom"]),
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity()
      this.st = valid && this.title.length > 3 && this.title.length < 16
      return valid && this.title.length > 3 && this.title.length < 16 ? true : false
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.submitHandler()
    },
    submitHandler() {
      if (!this.checkFormValidity()) {
                return
            }
      this.createRoom({
        title: this.title,
        lock: this.lock
      })
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing")
      })
      this.title = ""
    },
  }
}
</script>