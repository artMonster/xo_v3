import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/roomplace',
        name: 'RoomsPlace',
        meta: { layout: 'main' },
        props: true,
        component: () =>
            import ('@/views/RoomsPage.vue')
    },
    {
        path: '/room/:roomId',
        name: 'Room',
        meta: { layout: 'main' },
        props: true,
        component: () =>
            import ('@/views/Game.vue')
    },
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'main' },
        props: true,
        component: () =>
            import ('@/views/Home.vue')
    },
    {
        path: '/singin',
        name: 'SingIn',
        meta: { layout: 'empty' },
        props: true,
        component: () =>
            import ('@/views/SinginPage.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: { layout: 'empty' },
        props: true,
        component: () =>
            import ('@/views/About.vue')
    },
    {
        path: '/singout',
        name: 'SingOut',
        meta: { layout: 'empty' },
        props: true,
        component: () =>
            import ('@/views/SingOutPage.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router