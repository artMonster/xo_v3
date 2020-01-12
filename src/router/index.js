import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingIn from '../views/SingIn.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        props: true,
        beforeEnter: (to, from, next) => {
            if (to.params.name) {
                next();
            } else {
                next({ name: 'singin' })
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

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/singout',
        name: 'singout',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SingOut.vue'),
        beforeEnter: (to, from, next) => {
            if (localStorage.username) {
                localStorage.username = ''
                next({ name: 'singin' })
            }
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router