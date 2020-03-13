import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Info from '@/views/info'
import User from '@/views/user'
import Editor from '@/views/editor'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/',
        component: Index
      },
      
    ],
    
  },
  {
    path: '/info/:id',
    name: 'info',
    component: Info
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      requireAuth: true
    },
    component: User
  },
  {
    path: '/editor',
    name: 'Editor',
    meta: {
      requireAuth: true
    },
    component: Editor
  },
] 

const router = new Router({
  routes: constantRouterMap
})

export default router