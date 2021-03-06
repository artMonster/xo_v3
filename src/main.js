import Vue from 'vue'
import VueResource from 'vue-resource'
import VueChatScroll from 'vue-chat-scroll';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '@/firebase/init'

import Loader from '@/components/app/loader'
import ConsoleTop from '@/components/app/console'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource)
Vue.use(VueChatScroll)
Vue.component('Loader', Loader)
Vue.component('ConsoleTop', ConsoleTop)

Vue.config.debug = true

let app
auth.onAuthStateChanged((user) => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')
    }

    router.afterEach((to, from) => {
        if (!user) {
            if (!router.currentRoute.name === 'SingIn') {
                next('/singin')
            }
        } else {
            to.params.userId = user.uid
        }

    })


})