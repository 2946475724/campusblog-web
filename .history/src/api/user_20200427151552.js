import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register(params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: params
  })
}

export function authVerify(params) {
  return request({
    url: '/auth/verify/' + params,
    method: 'get',
  })
}

// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: '/user/setting/info/',
    method: 'get',
  })
}

export function updateUserInfo(params) {
  return request({
    url: '/user/setting/update',
    method: 'post',
    data: params
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post',
  })
}