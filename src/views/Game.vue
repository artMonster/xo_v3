<template>
  <section class="Game">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
      <b-col cols="12" class="mb-5">
        <p class="display-4 text-center">{{ $route.params.roomId }}</p>
      </b-col>
        <b-col cols="6" class="mb-5">
          <board></board>
        </b-col>
        <b-col cols="6" class="mb-5">
          <game-info></game-info>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>

import Board from '@/components/Board'
import GameInfo from '@/components/GameInfo'

export default {
  name: 'Game',
  components: { Board, GameInfo },
}

</script>