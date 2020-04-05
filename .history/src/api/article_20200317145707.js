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

export function getHotArticle() {
  return request({
    url: `/api/index/getHotArticle`,
    method: 'get',
  })
}

export function addArticle(data) {
  return request({
    url: '/article/add',
    method: 'post',
    data: data
  })
}

export function uploadImage(data) {
  return request({
    url: '/file/uploadImage',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}