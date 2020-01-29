import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        meta: { layout: 'main' },
        component: () =>
            import ('@/views/Home.vue')
    },
    {
        path: '/game',
        name: 'game',
        meta: { layout: 'main' },
        component: () =>
            import ('@/views/Game.vue')
    },
    {
        path: '/room',
        name: 'room',
        meta: { layout: 'main' },
        props: true,
        component: () =>
            import ('@/views/Room.vue')
    },
    {
        path: '/about',
        name: 'about',
        meta: { layout: 'main' },
        component: () =>
            import ('@/views/About.vue')
    },
    {
        path: '/singin',
        name: 'singin',
        meta: { layout: 'empty' },
        component: () =>
            import ('@/views/SingIn.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty' },
        component: () =>
            import ('@/views/About.vue')
    },
    {
        path: '/singout',
        name: 'singout',
        meta: { layout: 'empty' },
        component: () =>
            import ('@/views/SingOut.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router