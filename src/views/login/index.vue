<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <router-link to="/register">没有账号去注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setToken } from '@/utils/token'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login', this.loginForm).then(res => {
        console.log("222",res);
        setToken(res.data.authorization)
        //跳转到首页
        this.$router.push('/')
      })
      // console.log(this.$store);
    }
  },

}
</script>

<style>

</style>