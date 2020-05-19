import Vue from 'vue'
import Router from 'vue-router'
import Setting from '@/views/setting'

Vue.use(Router)

// 防止报路由跳转错误 , NavigationDuplicated
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/home"),
    meta: {
      title: 'CampusBlog',
      keepAlive: true
    },
    children: [ 
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/home/list')
      },
    ],
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import ('@/views/article'),
    meta: {
      title: '博客'
    },
  
  },
  {
    path: '/article/:id',
    name: 'Detail',
    component: () => import('@/views/article/detail'),
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import('@/views/tag'),
    meta: {
      title: '标签'
    }
  },
  {
    path: '/tag/:id',
    name: 'Detail',
    component: () => import('@/views/tag/detail'),
    meta: {
      title: '标签详情'
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      title: '我的主页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/user')
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
    path: '/editor',
    name: 'Editor',
    meta: {
      title: '写文章',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/editor'),
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
