<template>
  <div>
    <!-- 添加作业 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="作业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作业截止时间" prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 上传作业文件 -->
        <el-form-item label="上传作业文件">
          <input type="file" ref="uploadFile"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button >取 消</el-button>
      </span>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        date: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入作业名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        date: [
          { required: true, message: "请选择作业截止时间", trigger: "blur" },
        ],
      },
    };
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 格式化时间
          let date = new Date(this.form.date)
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate()
          let hour = date.getHours()
          let minute = date.getMinutes()
          let second = date.getSeconds()
          let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
          //获取上传的文件
          let file = this.$refs.uploadFile.files[0];
          let formData = new FormData();
          formData.append('files', file);
          formData.append('course_id', this.$route.params.id);
          formData.append('workName', this.form.name);
          formData.append('deadline', time);
          // 发送请求创建作业
          this.$store.dispatch('createHomework', formData).then(() => {
            this.$router.go(-1)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
}
</script>

<style scoped>
.dialog-footer{
  position: relative;
  left: 80%;
}
</style>