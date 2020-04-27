import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/api/index/getTagList',
    method: 'get',
    params: params
  })
}
