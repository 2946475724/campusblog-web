import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/api/index/list',
    method: 'get',
    params: params
  })
}

export function getArticleById(params) {
  return request({
    url: `/api/index/${params}`,
    method: 'get',
  })
}