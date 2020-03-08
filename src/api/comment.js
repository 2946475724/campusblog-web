import request from '@/utils/request'

export function addComment(params) {
  return request({
    url: '/api/comment/add',
    method: 'post',
    data: params
  })
}

export function getCommentList(params) {
  return request({
    url: '/api/comment/list',
    method: 'get',
    params: params
  })
}

export function deleteComment(params) {
  return request({
    url: '/api/comment/delete',
    method: 'post',
    data: params
  })
}