import { apiGetCourseList, 
  apiCreateCourse, 
  apiCourseSign, 
  apiGetSignList,
  apiGetHomeworkList,
  apiGetStudentList,
  apiGetStudentSignList,
  apiCorrectStudentFile
} from '@/api/course'

import { formatTime } from '@/utils/time'
const state = {
  courseList: [],
  signList: [],
  homeworkList: [],
  signedStudentList: [],
  signingStudentList: [],
}
const mutations = {
  GETCOURSELIST(state, data) {
    state.courseList = data
  },
  GETSIGNLIST(state, data) {
    //格式化时间
    data.forEach(item => {
      item.createTime = formatTime(item.createTime)
      item.deadline = formatTime(item.deadline)
    })
    state.signList = data
  },
  GETHOMEWORKLIST(state, data) {
    state.homeworkList = data
  },
  GETSIGNSTUDENTLIST(state, data) {
    //过滤出done为0的学生
    state.signingStudentList = data.filter(item => item.done == 0)
    //过滤出done为1的学生
    state.signedStudentList = data.filter(item => item.done == 1)
    
  }

}
const actions = {
  // 获取课程列表
  getCourseList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetCourseList(data).then(res => {
        commit('GETCOURSELIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 创建课程
  createCourse({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiCreateCourse(data).then(res => {
        console.log(res.data);
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 课程签到
  courseSign({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiCourseSign(data).then(res => {
        console.log(res.data);
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取签到列表
  getSignList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetSignList(data).then(res => {
        console.log("555",res.data.message.results);
        commit('GETSIGNLIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取学生签到列表
  getSignedStudentList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetStudentSignList(data).then(res => {
        commit('GETSIGNSTUDENTLIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取作业列表
  getHomeworkList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetHomeworkList(data).then(res => {
        console.log("555",res.data);
        commit('GETHOMEWORKLIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取该课程的学生列表
  getStudentList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetStudentList(data).then(res => {
        console.log("555",res.data);
        commit('GETSTUDENTLIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  //老师批改学生的文件
  correctStudentFile({commit},data) {
    console.log("vuex的data",data)
  
    return new Promise((resolve, reject) => {
      apiCorrectStudentFile(data).then(res => {
        console.log(res);
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}