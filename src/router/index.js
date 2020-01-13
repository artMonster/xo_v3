import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingIn from '../views/SingIn.vue'
import ErrorPage from '../views/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        props: true,
        beforeEnter: (to, from, next) => {
            if (to.params.userName) {
                next()
            } else {
                next('/singin')
            }
        }
    },
    {
        path: '/singin',
        name: 'singin',
        component: SingIn,
    },
    {
        path: '/about',
        name: 'about',

        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/singout',
        name: 'singout',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SingOut.vue'),
    },
    {
        path: '*',
        component: ErrorPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router