<template>
  <div class="app-console-top bg-dark">
    <b-button v-b-toggle.console-top class="btn-sm">X</b-button>
    <b-collapse visible id="console-top p-2">
        <pre style="max-height: 20vh; overflow: auto;" class=" text-success">#start status<code class="text-success">{{ getRouteParams('room') }}</code></pre>
        
    </b-collapse>
    
  </div>
</template>

<script>
export default {
  name: 'ConsoleTop',
  methods: {
      getRouteParams(KeyParams) {
      var ParamsValue = false
      const RouteParams = this.$store.state ? this.$store.state : false
      if (RouteParams && KeyParams) {
        var keys = Object.keys( RouteParams )
        for (var i = 0; i < keys.length; i++){
          if (keys[i] === KeyParams) {
            ParamsValue = RouteParams[keys[i]]
          }
        }
      }
      return ParamsValue
    },
  }
}
</script>