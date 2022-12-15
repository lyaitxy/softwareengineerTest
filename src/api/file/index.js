import api from '@/api/requests'

// 上传文件and创建作业
export function apiCreateHomework(data) {
  return api({
    url: '/file/lupload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取自己上传的文件
export function apiGetMyFileList(data) {
  return api({
    url: '/file/lAllFile',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取学生上传文件列表
export function apiGetStudentFileList(data) {
  return api({
    url: '/file/AllFile',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 老师下载学生上传的文件
export function apiDownloadStudentFile(data) {
  console.log("apidata",data);
  return api({
    url: '/file/download',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  })
}