import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/index";
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'login' || to.name === 'register') return next();
    console.log(16, store);
    const isLogin = window.sessionStorage.getItem('isLogin')
    if (isLogin !== 'true') {
        router.push({name: 'login'})
        next()
    }

    next()
})

export default router