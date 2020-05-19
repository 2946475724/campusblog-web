import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/api/index/getTagList',
    method: 'get',
    params: params
  })
}

export function getTagListByClickCount(params) {
  return request({
    url: '/api/article/getTagListByClickCount',
    method: 'get',
    params: params
  })
}

export function getTagListWithHot(params) {
  return request({
    url: '/api/article/getTagListWithHot',
    method: 'get',
    params: params
  })
}


