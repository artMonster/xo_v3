import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/roomplace',
        name: 'roomplace',
        meta: { layout: 'main' },
        component: () =>
            import ('@/views/Rooms.vue')
    },
    {
        path: '/room/:roomId',
        name: 'room',
        meta: { layout: 'main' },
        props: true,
        beforeEnter: (to, from, next) => {
            if (to.params.roomId) {
                next();
            } else {
                next({ name: 'singin' })
            }
        },
        component: () =>
            import ('@/views/Game.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: { layout: 'main' },
        props: true,
        beforeEnter: (to, from, next) => {
            if (to.params.AuthUser) {
                next();
            } else {
                next({ name: 'singin' })
            }
        },
        component: () =>
            import ('@/views/Home.vue')
    },
    {
        path: '/singin',
        name: 'singin',
        meta: { layout: 'empty' },
        component: () =>
            import ('@/views/SinginPage.vue')
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
            import ('@/views/SingOutPage.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router