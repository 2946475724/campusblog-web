import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/file/uploadImage',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}