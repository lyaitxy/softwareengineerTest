import { apiRegister, apiLogin } from "@/api/user";

const state = {}
const mutations = {}
const actions = {
  // 注册
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiRegister(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 登录
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiLogin(data).then(res => {
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