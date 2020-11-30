<template>
    <div class="d-inline-block p-4">
        <b-button  variant="primary" class="btn btn-lg" @click="newGameHandler">Start Game</b-button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    name: "GameForm",
    props: {
        theGame: Array,
        roomId: String,
    },
    data: () => ({
        usersArena: [],
        option: {    
            stride: 0,
            score: [0,0],
        },
        createGameId: null,
    }),
    computed: mapGetters(["GetIncommingUsersReady"]),
    methods: {
        ...mapActions(["createGame"]),
        async newGameHandler() {

            this.createGameId = await this.createGame({
                usersArena: this.usersArena,
                option: this.option,
                roomId: this.roomId,
            }).then(resp => { 
                return resp
            })
            this.$router.push({ 
                name: 'Game',
                params: {
                    roomId: this.roomId,
                    gameId: this.createGameId
                }
            })
        },
    },
    async mounted() {
        this.usersArena = await this.GetIncommingUsersReady
    },
}
</script>