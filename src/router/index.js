import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',

  }
] 

const router = new Router({
  routers: constantRouterMap
})

export default router