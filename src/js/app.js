/*
* spa入口文件
* */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册插件
Vue.use(VueRouter)

// 引入文件
import AppContainer from '../containers/AppContainer.vue'
import routes from './routers.js'

// 创建路由实例
const router=new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to, from, next) => {
  next()
})

// 创建实例
const app = new Vue({
    data:{
        bus:new Vue()
    },
    router,
    render: h=> h(AppContainer),
}).$mount('#app')

// new Vue({
//     el:'#app',
//     render: h => h(App)
// })