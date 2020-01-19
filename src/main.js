import Vue from 'vue'
import VueResource from 'vue-resource'
import VueChatScroll from 'vue-chat-scroll';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource)
Vue.use(VueChatScroll)

Vue.config.debug = true

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')