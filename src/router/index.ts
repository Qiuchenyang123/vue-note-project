import {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/index.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/button',
        children: [
            {
                path: '/button',
                name: 'button',
                component: () => import(/* webpackChunkName: "button" */ '../views/button/button.vue')
            },
            {
                path: '/icon',
                name: 'icon',
                component: () => import(/* webpackChunkName: "icon" */ '../views/icon/icon.vue')
            },
            {
                path: '/basicForm',
                name: 'basicForm',
                component: () => import(/* webpackChunkName: "basicForm" */ '../views/form/basicForm.vue')
            },
            {
                path: '/articleList',
                name: 'articleList',
                component: () => import(/* webpackChunkName: "articleList" */ '../views/article/articleList.vue')
            },
            {
                path: '/articleDetail',
                name: 'articleDetail',
                component: () => import(/* webpackChunkName: "articleDetail" */ '../views/article/articleDetail.vue')
            },
            {
                path: '/uploadArticle',
                name: 'uploadArticle',
                component: () => import(/* webpackChunkName: "uploadArticle" */ '../views/article/uploadArticle.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/register/index.vue')
    },

]
export default routes
