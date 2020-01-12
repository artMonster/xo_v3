<template>
  <section class="singout">
    <h1>This is an Sing Out page</h1>
  </section>
</template>

<script>
export default {
  name: 'singout',
  updated() {    
    localStorage.username = ''
    this.$router
        .push({
            name: 'singin',
            })
    },
}
</Script>