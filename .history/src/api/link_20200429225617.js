import request from '@/utils/request'

export function getLinkListBySort() {
    return request({
        url: '/api/index/link/list',
        method: 'get'
    })
}