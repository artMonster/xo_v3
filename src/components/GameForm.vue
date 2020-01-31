<template>
    <div class="d-inline-block p-4">
        <b-button  variant="primary" class="btn btn-lg" @click="newGameHandler"> [ START GAME ] </b-button>
    </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: "GameForm",
    props: {
        roomId: String,
    },
    data: () => ({
        option: {    
            stride: 'o',
            x: {
                id: 'id',
                score: 0,
            },
            o: {
                id: 'id',
                score: 0,
            },
            start: false,
        }
    }),
    methods: {
        ...mapActions(["createGame"]),
        newGameHandler() {
            this.createGame({
                option: this.option,
                roomId: this.roomId,
            })
        },
    }
}
</script>