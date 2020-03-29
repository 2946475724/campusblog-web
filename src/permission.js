import router from './router'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import {Message} from 'element-ui'

//路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.undefined?'blog':to.meta.title
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (getToken()) {
      next()
    } else {
      Message({
        type: 'warning',
        message: '请先登录！'
      })
      
    }
  } else {
    next()
  }
})
