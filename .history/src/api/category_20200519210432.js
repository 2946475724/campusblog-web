import request from '@/utils/request'

export function getCategoryList(params) {
  return request({
    url: '/api/index/category/list',
    method: 'get',
    params: params
  })
}

export function getCategories() {
  return request({
    url: '/api/index/category/listAll',
    method: 'get'
  })
}