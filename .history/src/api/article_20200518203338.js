import request from '@/utils/request'
import { Tag } from 'element-ui'
import QS from 'qs'
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



export function getArticlesByUserId(params) {
  return request({
    url: '/api/user/article',
    method: 'get',
    params: params
  })
}

export function getArticlesByCategoryId(params) {
  return request({
    url: '/api/index/category',
    method: 'get',
    params: params
  })
}

export function addArticle(data) {
  return request({
    url: '/api/article/add',
    method: 'post',
    data: data
  })
}

export function likeArticle(data) {
  return request({
    url: '/api/article/like',
    method: 'post',
    data: data
  })
}

export function getLikeStatus(data) {
  return request({
    url: '/api/article/like/status',
    method: 'post',
    params: data
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

export function deleteArticleById(data) {
  return request({
    url: '/api/article/delete',
    method: 'post',
    data: QS.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function addArticleViewCount(id) {
  return request({
    url: '/api/article/' + id + '/view',
    method: 'post',
  })
}

/**
 * 收藏
 */
export function collectArticle(data) {
  return request({
    url: '/api/article/collection',
    method: 'post',
    data: data
  })
}

export function getCollectionStatus(data) {
  return request({
    url: '/api/article/collection/status',
    method: 'post',
    params: data
  })
}

export function getCollectArticleByUserId(userId) {
  return request({
    url: '/api/article/' + userId + '/collection',
    method: 'get',
  })
}

export function getArticlesByTagId(id) {
  return request({
    url: '/api/index/' + id,
    method: 'post',
  })
}
