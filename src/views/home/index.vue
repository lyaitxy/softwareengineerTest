<template>
  <div class="home">
    <Header/>
    <div class="main">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isMyCourse" :to="{ path: '/home/mycourse'}">我的课程</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isCourseDetail">课程详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="body">
        <Carousel v-if="isHome"/>
          <router-view></router-view>
      </div>
    
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import Carousel from '@/components/carousel'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Carousel
  },
  computed: {
    isHome() {
      return this.$route.path === '/home'
    },
    isMyCourse() {
      return this.$route.path === '/home/mycourse' 
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/createSign`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/addwork`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/workdetail/${this.$route.params.work_id}`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/statistiaclData`
    },
    isCourseDetail() {
      return this.$route.path === `/home/coursedetail/${this.$route.params.course_id}` 
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/createSign`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/addwork`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/workdetail/${this.$route.params.work_id}`
      || this.$route.path === `/home/coursedetail/${this.$route.params.course_id}/statistiaclData`
    }
  },
}
</script>

<style lang="less" scoped>
.main{
  margin-top: 10px;
  margin-left: 30px;
  width: 95%;
  height: 100%;
  .body{

  }

}
</style>