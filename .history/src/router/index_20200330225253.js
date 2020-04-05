import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Info from '@/views/info'
import User from '@/views/user'
import Setting from '@/views/setting'
import Editor from '@/views/editor'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: 'CampusBlog',
      keepAlive: true
    },
    children: [
      {
        path: '/',
        meta: {
          title: 'CampusBlog',
          keepAlive: true
        },
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
      title: '我的主页',
      keepAlive: true,
      requireAuth: true
    },
    component: User
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      keepAlive: true,
      requireAuth: true
    },
    component: Setting
  },
  {
    path: 'list',
    name: 'list',
    component: () => import('@/views/list')
  }
  {
    path: '/editor',
    name: 'Editor',
    meta: {
      title: '写文章',
      keepAlive: true,
      requireAuth: true
    },
    component: Editor
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
] 

const router = new Router({
  routes: constantRouterMap
})

export default router