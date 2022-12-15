<template>
  <div>
    <div class="header">
      <div class="main">
          <div class="left">
            <ul class="menu">
              <li>首页</li>
              <li @click="toMyCourse">我的课程</li>
              <li>首页</li>
              <li>首页</li>
              <li>首页</li>
            </ul>
          </div>
          <div class="right">
            <el-dropdown trigger="click">
              <span >
                <img src="@/assets/img/avatar.jpg" class="avatar">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid">个人信息</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-promotion" @click.native="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>

    </div>
    
  </div>
</template>

<script>
// 引入token
import { removeToken, getToken } from '@/utils/token'
export default {
  name: 'Header',
  methods: {
    logOut() {
      // 清除token
      removeToken()
      // 跳转到登录页
      this.$router.push('/login')
    },
    toMyCourse() {
      let res = this.$store.dispatch('getCourseList', {Authorization: getToken()})
      res.then(()=>{
        this.$router.push('/home/mycourse')
      })
    }
  },
}
</script>

<style lang="less" scoped>
.header{
  height: 50px;
  width: 100%;
  background-color: rgb(225, 69, 69);
  .main{
    .right{
      position: absolute;
      right: 40px;
      top: 0px;
    }
  }
}
.menu{
  display: flex;

  height: 100%;
  li{
    height: 100%;
    list-style: none;
    line-height: 50px;
    padding: 0 20px;
    color: #fff;
    cursor: pointer;
    &:hover{
      background-color: rgb(255, 255, 255);
      color: rgb(225, 69, 69);
    }
  }
}.avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>