<template>
  <div class="app-content" :class="{full: !isOpen}">    
    <header-xo></header-xo>
    <main class="app-page py-3">
      <router-view />
    </main>
  </div>
</template>

<script >  
import HeaderXo from '@/components/HeaderXo.vue'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
  }),
  components: {
    HeaderXo
  }
}
</script>
