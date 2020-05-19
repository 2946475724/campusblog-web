import request from '@/utils/request'

export function getCategoryList(params) {
  return request({
    url: '/api/index/category/listAll',
    method: 'get',
    params: params
  })
}