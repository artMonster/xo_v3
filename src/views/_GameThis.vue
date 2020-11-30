<template>
    <section class="GamePage">
        <!-- <div class="col-md-7">
            <div class="card">
                <div class="card-header bg-info p-0">
                    <span class="px-3 text-white small">Ready: <b>{{ GetIncommingUsersReady.length }}</b></span>
                </div>
                <div class="card-body p-0">
                    <b-list-group>
                        <user-incomming
                            v-for="u in GetIncommingUsers"
                            :key="u.timestamp"
                            :userdata="u"
                            @switch-user="switchUser">
                        </user-incomming>
                        <Loader v-if="loading"/>
                    </b-list-group>
                </div>
                <div v-if="GetIncommingUsersReady.length > 1" class="card-footer text-center">
                    <game-form :theGame="theGame" :roomId="roomId"></game-form>
                    <b-button v-if="GetIncommingUsersReady.length > 2"  variant="warning" class="btn btn-lg" @click="newArenaHandler"> *** Start tournaments *** </b-button>
                </div>
            </div>
        </div> -->
        <game-info></game-info>
    </section>
</template>
<script>

import GameInfo from '@/components/GameInfo'
//import GameArena from '@/components/GameArena'

export default {
  name: 'GamePage',
  components: { GameInfo }
}

</script>