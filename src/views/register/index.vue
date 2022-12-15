<template>
  <div class="register">
    <!-- 注册表单 -->
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="老师姓名">
        <el-input type="password" v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <router-link to="/login">已有账号去登录</router-link>
        
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    register(){
      this.$store.dispatch('register', this.registerForm).then(res => {
        console.log(res)
      })
      // console.log(this.$store);
    }
  },
}
</script>

<style>

</style>