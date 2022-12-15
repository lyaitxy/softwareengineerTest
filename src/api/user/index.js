import api from '@/api/requests';

// 注册
export function apiRegister(data) {
  return api({
    url: '/api/lreguser',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


// 登录
export function apiLogin(data) {
  return api({
    url: '/api/llogin',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}