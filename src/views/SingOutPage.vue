<template>
  <section class="singout"></section>
</template>
<script>
export default {
  name: 'singout',
  async mounted() {
    try {
      await this.$store.dispatch('logout')
      this.$router.push('SingIn')
    } catch (e) {}
  },
}
</Script>