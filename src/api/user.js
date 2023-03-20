import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function authorizeConsent(data) {
  return request({
    url: '/oauth2/authorize',
    method: 'post',
    params: data
  })
}

export function oauth2Authorize(data) {
  return request({
    url: '/oauth2/authorize',
    method: 'get',
    params: data
  })
}
