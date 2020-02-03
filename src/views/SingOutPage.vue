<template>
  <section class="singout">
    <div class="text-center my-5">
      <a href="/singin" class="btn btn-info"> home </a>
    </div>
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