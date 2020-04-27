import request from '@/utils/request'

export function getTagList() {
  return request({
    url: '/api/index/getTagList',
    method: 'get'
  })
}
