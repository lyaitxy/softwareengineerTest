import api from '@/api/requests'

// 获取课程列表
export function apiGetCourseList(data) {
  return api({
    url: '/cs/lqueryCourse',
    method: 'get',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 创建课程
export function apiCreateCourse(data) {
  return api({
    url: '/cs/createCourse',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 删除课程
export function apiDeleteCourse(data) {
  return api({
    url: '/cs/deleteCourse',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 课程签到
export function apiCourseSign(data) {
  return api({
    url: '/cs/createSign',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取签到列表
export function apiGetSignList(data) {
  return api({
    url: '/cs/queryAllSign',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取学生的签到列表
export function apiGetStudentSignList(data) {
  return api({
    url: '/cs/queryAllSignState',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


//查询该课程下的所有作业
export function apiGetHomeworkList(data) {
  return api({
    url: '/cs/lqueryWorkStu',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//查询该课程下的所有学生
export function apiGetStudentList(data) {
  return api({
    url: '/cs/queryAllStudent',
    method: 'get',
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 老师批改学生的作业
export function apiCorrectStudentFile(data) {
  return api({
    url: '/cs/correct',
    method: 'post',
    data,
    headers: {
      'Content-Type' : 'application/x-www-form-urllencoded'
    }
  })
}

