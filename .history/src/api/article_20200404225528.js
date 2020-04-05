import request from '@/utils/request'
import { Tag } from 'element-ui'
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

export function getArticlesByTagId(params) {
  return request({
    url: '/api/index/tag',
    method: 'get',
    params: params
  })
}

export function getArticlesByUserId(params) {
  return request({
    url: '/article/user',
    method: 'get',
    params: params
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