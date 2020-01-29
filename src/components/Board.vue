<template>
    <div class="board bg-dark">
        <form @submit.prevent="submit" >
            <div class="form-group">
                <dl class="row align-items-center justify-content-center text-center p-3">
                    <dd v-for="(cell, index) of curentCells" :key="index" class="col-4 text-center">
                        <div v-if="cell" class="custom-control custom-radio" :class="taggedCell[index] ? 'border-success' : '' ">
                            <input type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                            <label class="custom-control-label text-light" :for="'ch_'+index">{{ stride }}</label>
                        </div>
                        <div v-else class="custom-control custom-radio" :class="taggedCell[index] ? 'border-success' : '' ">
                            <input @click="checkedStep({s: index, cells: curentCells})" type="radio" class="custom-control-input" :id="'ch_'+index" name="radio" :value="index" v-model="checkCell" />
                            <label class="custom-control-label text-light" :for="'ch_'+index">{{ checkedCoin[index] }}</label>
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

import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Board',
    computed: mapGetters(['checkedCell', 'checkedCoin', 'curentCells', 'taggedCell', 'gameInfo']),
    methods: {
        ...mapActions(['nextStep', 'checkedStep']),
        submit() {
            this.nextStep({s: index})
        }
    },
    mounted() {
        this.stride = this.gameInfo.stride
    },
    data() {
        return {
            checkCell: false,
            stride: 'x',
        }
    },
}

</script>