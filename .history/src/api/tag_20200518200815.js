import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/api/tag/getTagList',
    method: 'get',
    params: params
  })
}

export function getTagListByClickCount() {
  return request({
    url: '/api/tag/getTagListByClickCount',
    method: 'get',
  })
}

export function getTagListWithHot() {
  return request({
    url: '/api/tag/getTagListWithHot',
    method: 'get',
  })
}

export function getTagListWithLatest(id) {
  return request({
    url: '/api/tag/getTagListWithLatest' + id,
    method: 'post',
  })
}

export function getArticlesByTagId(id) {
  return request({
    url: '/api/index/' + id,
    method: 'post',
  })
}


