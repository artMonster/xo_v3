<template>
  <section class="singout">

    <loader />
  </section>
</template>


<script>
export default {
  name: 'singout',
  async mounted() {
    try {
      await this.$store.dispatch('logout')
      this.$router.push('singin')
    } catch (e) {}
  },
}
</Script>