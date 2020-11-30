<template>
    <div class="board bg-dark">
        <form @submit.prevent="submit" >
            <div class="form-group">
                <dl class="row align-items-center justify-content-center text-center p-3">
                    <!-- <dd v-for="(cell, index) of getSteps[stepsCount-1]" :key="index" class="col-4 text-center">
                        <div v-if="cell" class="custom-control custom-radio" :class="taggedCell[index] ? 'border-success' : '' ">
                            <input disabled type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                            <label class="custom-control-label text-light" :for="'ch_'+index">{{ cell }}</label>
                        </div>
                        <div v-else class="custom-control custom-radio" :class="taggedCell[index] ? 'border-success' : '' ">
                            <input @click="checkedStep({s: index, cells: getSteps[stepsCount-1]})" type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                            <label class="custom-control-label text-light" :for="'ch_'+index">{{ checkedCoin[index] }}</label>
                        </div>
                    </dd> -->
                </dl>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-primary btn-lg btn-block upp" type="submit" name="action">Add Step</button>
            </div>
        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'GameBoard',
    //computed: mapGetters(['checkedCoin', 'getSteps', 'taggedCell', 'GetGameArenaBoard', 'stepsCount', "GetGameArena"]),
    methods: {
        //...mapActions(['nextStep', 'checkedStep']),
        //...mapMutations(["setStep","pushSteps"]),
        // async submit(e) {
        //     const c = await +e.target.radio.value
        //     const cc = await this.getSteps[this.stepsCount-1]
        //     cc[c] = await this.GetGameArena.stride
        //     await this.setStep(cc)
        //     await this.pushSteps(cc)
        //     this.nextStep({
        //         roomId: await this.$route.params.roomId
        //     })
        // }
    },
    data() {
        return {
            checkCell: 10,
            stride: 0,
        }
    },
    mounted() {
       
    },
}

</script>