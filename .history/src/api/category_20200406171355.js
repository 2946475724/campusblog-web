import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/index/category/list',
    method: 'get',
    params: params
  })
}