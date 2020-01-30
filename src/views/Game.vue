<template>
  <section class="Game">
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col cols="6" class="mb-5">
          <game-board></game-board>
        </b-col>
        <b-col cols="6" class="mb-5">
          <game-info></game-info>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>

import GameBoard from '@/components/GameBoard'
import GameInfo from '@/components/GameInfo'

export default {
  name: 'Game',
  components: { GameBoard, GameInfo },
}

</script>