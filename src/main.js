import Vue from 'vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)

Vue.config.debug = true

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')