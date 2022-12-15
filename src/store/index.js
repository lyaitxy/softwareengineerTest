import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//引入user小仓库
import user from './user'
//引入course小仓库
import course from './course'
//引入file小仓库
import file from './file'

export default new Vuex.Store({
  modules: {
    user,
    course,
    file
  }
})