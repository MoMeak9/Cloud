import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue'
import Cloud from '../views/Cloud.vue'
import Register from '../views/Register.vue'
import Setting from '../views/Setting.vue'
import Admin from '../views/Admin.vue'
import Page404 from "../views/Page404.vue";
import Check from "../views/Check.vue";

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
          path: '/',
          redirect: {
           name: 'login'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '用户登录'
          }
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            title: '用户注册'
          }
        },
        {
          path: '/cloud',
          name: 'cloud',
          component: Cloud,
          meta: {
            title: 'MyCloud'
          }
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting,
          meta: {
            title: '用户设置'
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: {
            title: '用户管理'
          }
        },
        {
            path: '/check',
            name: 'check',
            component: Check,
            meta: {
                title: '文件审核'
            }
        },
        {
            path: "/page404",
            name: "page404",
            component: Page404,
            meta:{
                title: '未知页面'
            }
        }, {
            path: "*",
            redirect: "/page404"
        }
    ]
})