<template>
  <div class="body">
    <div class="courseOperat">
      <el-input placeholder="请输入课程名" class="courseInput" v-model="courseName1"></el-input>
      <el-button type="primary" class="courseButton">搜索课程</el-button>
      <el-button type="primary" class="courseButton" @click="addCourse">创建课程</el-button>
      <el-button type="primary" class="courseButton">删除课程</el-button>
    </div>
    <div class="cards">
        <el-card shadow="always" class="card" @click.native="toCourseDetail(courseItem.id)" v-for="(courseItem, index) in courseList" :key="index">
          <div class="courseName">{{courseItem.courseName}}</div>
          <div>邀请码：{{courseItem.invite}}</div>
          <div>学生数量</div>
        </el-card>
    </div>
  
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      courseName1: ''
    }
  },
  methods: {
    toCourseDetail(id) {
      // 发请求获取课程详情
      console.log(id + '');
      this.$store.dispatch('getHomeworkList', {
        course_id: id,
        
      }).then(() =>{
        this.$router.push(`/home/coursedetail/${id}`)
      })
      
    },
    addCourse() {
      // 添加课程
      this.$store.dispatch('createCourse', {Authorization: getToken(), courseName: this.courseName1}).then(()=>{
        console.log(555);
      })
      this.courseName1 = ''
    }
  },
  computed: {
    ...mapState({
      courseList: state => state.course.courseList
    })
  },
  mounted() {
    this.$store.dispatch('getCourseList', {Authorization: getToken()})
  },
}
</script>

<style lang="less" scoped>
.body{
  .courseOperat{
    display: flex;
    justify-content: right;
    margin-top: 20px;
    margin-bottom: 20px;
    .courseInput{

      width: 300px;
    }
    .courseButton{
      margin-left: 10px;
      margin-right: 10px;
    }
  }

}
.cards{
  display: flex;
  flex-wrap: wrap;
  .card{
  width: 260px;
  height: 200px;
  margin-left: 37px;
  margin-bottom: 20px;
  cursor: pointer;
  .courseName{
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 20px;
  }
}
}

</style>