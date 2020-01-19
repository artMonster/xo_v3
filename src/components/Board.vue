<template>
    <div class="board">
        <form @submit.prevent="submit" class="pt-4">
            <div class="form-group">
                <dl class="row align-items-center justify-content-center text-center m-0">
                    <dd v-for="(state, index) of boardState" :key="index" class="col-4 text-center py-4">
                        <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" :id="index+1" name="radio" :value="index+1" v-model="stepValue">
                            <label class="custom-control-label" :for="index+1"></label>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-primary btn-lg btn-block upp" type="submit" name="action">Add Step</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Board',
    data() {
        return {
            boardState: [0,0,0,0,0,0,0,0,0],
            stepValue: 0,
            errorText: null
        }
    },
    methods: {
      ...mapMutations(['createRoom']),
      submit() {
          this.createRoom({
              title: this.title,
              body: this.body,
              id: Date.now()
          })
      }
    }
}
</script>

