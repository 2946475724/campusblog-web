import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/api/tag/list',
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

export function getTagListWithLatest() {
  return request({
    url: '/api/tag/getTagListWithLatest',
    method: 'get',
  })
}

export function getTagById(id) {
  return request({
    url: '/api/tag/' + id,
    method: 'post',
  })
}

export function increaseClickCount(id) {
  return request({
    url: '/api/tag/' + id + "/count",
    method: 'post'
  })
}
