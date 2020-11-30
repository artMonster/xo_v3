<template>
  <section class="TheRoom">
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="12">
                <the-game-info></the-game-info>
            </b-col>
        </b-row>
    </b-container>
  </section>
</template>
<script>

import TheGameInfo from '@/components/TheGameInfo'

export default {
  name: 'TheGame',
  components: { TheGameInfo }
}

</script>