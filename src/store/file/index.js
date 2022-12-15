import {apiCreateHomework, apiGetMyFileList, apiGetStudentFileList, apiDownloadStudentFile} from '@/api/file'

const state = {
  myFileList: [],
  studentFileList: {}
}
const mutations = {
  GETMYFILELIST(state, data) {
    state.myFileList = data
  },
  GETSTUDENTFILELIST(state, data) {
    // 将data数组转为对象
    let temp = []
    for (let i = 0; i < data.length; i++) {
      let obj = {}
      obj["name"] = data[i].split("-")[1]
      obj["username"] = data[i].split("-")[0]
      obj["file"] = data[i].split("-")[2] + "-" + data[i].split("-")[3]
      //将对象放入数组
      temp.push(obj)
    } 
    
    state.studentFileList = temp
  }
}
const actions = {
  // 创建作业
  createHomework({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiCreateHomework(data).then(res => {
        console.log(res.data);
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取自己上传的文件
  getMyFileList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetMyFileList(data).then(res => {
        console.log("老师上传的文件",res.data.message);
        commit('GETMYFILELIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  // 获取学生上传文件列表
  getStudentFileList({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiGetStudentFileList(data).then(res => {
        console.log("学生上传的文件",res.data.message);
        commit('GETSTUDENTFILELIST', res.data.message.results)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 老师下载学生上传的文件
  downloadStudentFile({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiDownloadStudentFile(data).then(res => {
        console.log("下载学生上传的文件",res.data);
        resolve(res)
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