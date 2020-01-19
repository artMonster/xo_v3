<template>
    <section class="mb-5 container">
      <div class="row">
        <div class="col-6 mx-auto">
          <Board />
        </div>
      </div>
      
    </section>
</template>

<script>

import Board from '@/components/Board'

export default {
    name: 'room',
    components: {
      Board
    },
}
</script>