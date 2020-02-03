<template>
  <section class="singout">
    <a href="/singin">home</a>
  </section>
</template>
<script>
export default {
  name: 'singout',
  async mounted() {
    try {
      await this.$store.dispatch('logout')
    } catch (e) {}
  },
}
</Script>