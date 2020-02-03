<template>
    <div class="GameArena">
        <div class="container-fluid">
            <div class="row no-gutters justify-content-center">
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header bg-info p-0">
                            <span class="px-3 text-white small">Ready: </span>
                        </div>
                        <div class="card-body p-0">
                            <b-list-group>
                                <players-arena
                                    v-for="(user, index) in GetGameArenaUsers"
                                    :key="index"
                                    :ind="index"
                                    :score="GetGameArena.score[index]"
                                    :data="user"
                                    :stride="GetGameArena.stride">
                                </players-arena>
                                <Loader v-if="loading" />
                            </b-list-group>
                        </div>
                        <div class="card-footer text-center">
                            <game-board></game-board>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GameBoard from "./GameBoard.vue"
import PlayersArena from "./PlayersArena.vue"

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'GameArena',
    data() {
        return {
            loading: true,
            gameId: null,
            pA: null,
        }
    },
    components: { GameBoard, PlayersArena},
    computed: mapGetters(["GetGameArena", "GetGameArenaUsers", "GetGameArenaBoard"]),
    methods: {
        ...mapActions(["getGameArenaData"]),
    },
    async mounted() {
        this.loading = true
        this.gameId = this.$route.params.gameId
        await this.getGameArenaData(this.gameId).then( resp => { return resp })
        this.loading = false
    }
    
}

</script>
