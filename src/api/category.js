import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/category/list',
    method: 'get',
    params: params
  })
}