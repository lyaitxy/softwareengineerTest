<template>
  <div class="body">
    <div class="left" :class="{'global': isAppear}">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span slot="title" @click="toCourseDefault">课程实验</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">学习文件</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">在线考试</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-view"></i>
          <span slot="title" @click="toSignIn">发起签到</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-pie-chart"></i>
          <span slot="title" @click="toStatistiaclData">数据统计</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="workOperat" v-if="isDefaultPage">
        <!-- 排序 -->
        <el-select v-model="value" placeholder="排序方式(默认按时间)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 作业操作 -->
        <div class="work">
          <el-input placeholder="请输入作业名字" class="workInput"></el-input>
          <el-button type="primary">搜索作业</el-button>
          <el-button type="primary" @click="toAddWork">添加作业</el-button>
          <el-button type="primary">删除作业</el-button>
        </div>
      </div>
      <div v-if="isDefaultPage">
        <el-card shadow="hover" class="card" v-for="(homework, index) in homeworkList" :key="index" @click.native="toWorkDetail(homework.id)"> 
          <div class="commiting" v-if="isBeforeDeadline(homework.deadline)">提交中</div>
          <div class="commiting3" v-if="!isBeforeDeadline(homework.deadline)">已过期</div>  

          <div class="noBuJiao">未开启补交</div>
          <div class="workName">{{homework.work_name}}</div>
          
          <div class="deadLine el-icon-time">{{homework.createTime}}---{{homework.deadline}}</div>
        </el-card>
        

      </div>
 
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatTime, compareTime } from "@/utils/time.js";
export default {
  data() {
    return {
      value: "",
      options: [
        {
          value: "按时间排序",
          label: "按时间排序",
        },
        {
          value: "按名称排序",
          label: "按名称排序",
        },
      ],
      course_id: this.$route.params.course_id,
      isAppear: false
    };
  },
  computed: {
    isDefaultPage() {
      return this.$route.path === `/home/coursedetail/${this.$route.params.course_id}`;
    },
    ...mapState( {
      homeworkList: state => {
          let ans = state.course.homeworkList || [];
          //格式化时间
          ans.forEach((item) => {
            item.createTime = formatTime(item.createTime);
            item.deadline = formatTime(item.deadline);
          });
          return ans;
        },
    }),
  },
  methods: {
    toAddWork() {
      this.$router.push(`/home/coursedetail/${this.course_id}/addwork`);
    },
    toSignIn() {
      // 获取所有的签到
      this.$store.dispatch("getSignList", {
        course_id: this.course_id,
      }).then(() =>{
        console.log("获取所有的签到");
        this.$router.push(`/home/coursedetail/${this.course_id}/createSign`);
      });
    },
    toCourseDefault() {
      // 获取所有的作业
      this.$store.dispatch("getHomeworkList", {
        course_id: this.course_id,
      }).then(() => {
        console.log("获取所有的作业");
        this.$router.push(`/home/coursedetail/${this.course_id}`);
      });
    },
    //判断当前时间是否在截止时间之前
    isBeforeDeadline(deadline) {
      return !compareTime(deadline);
    },
    // 点击作业跳转到作业详情
    toWorkDetail(id) {
      let work_id = id;
      console.log(work_id);
      this.$store.dispatch('getMyFileList', {
        work_id: work_id,
      }).then(() => {
        console.log();
        this.$store.dispatch('getStudentFileList',{
          work_id: work_id,
        }).then(() => {
           this.$router.push(`/home/coursedetail/${this.course_id}/workdetail/${work_id}`);
        })
      })
    },

    // 点击跳转到数据统计
    toStatistiaclData() {
      console.log("点击跳转到数据统计");
      this.$router.push(`/home/coursedetail/${this.course_id}/statistiaclData`);
    },
  },
  mounted() {
    // 获取所有的作业
    this.$store.dispatch("getHomeworkList", {
      course_id: this.course_id,
    });
    this.$bus.$on("correct", (data) => {
      this.isAppear = !this.isAppear
      console.log(data);
    })
  },
};
</script>

<style lang="less" scoped>
.body {
  margin-top: 10px;
  width: 100%;
  height: 100%;

  display: flex;
  .left {
    width: 260px;
    height: 100%;
  }
  .right {
    position: relative;
    left: 20px;
    width: 80%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    .card {
      position: relative;
      border: 0;
      margin: 10px 0 10px 0;
      background-color: rgb(255, 255, 255);
      cursor: pointer;
      .commiting{
        width: 80px;
        height: 20px;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        background-color: #254ed8;
      }
      .commiting3{
        width: 80px;
        height: 20px;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        background-color: #ff0000;
      }
      .noBuJiao{
        position: relative;
        left: 90px;
        top: -19px;
        width: 100px;
        height: 20px;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        background-color: #cc317c;
      }
      .workName{
        position: relative;
        left: 200px;
        top: -39px;
        font-size: 18px;
        color: #000;
      }
      .uploadFile{
        position: relative;
        left: 300px;
        top: -65px;
        width: 400px;
        height: 30px;
      }
      .deadLine{
        position: relative;
        top: -29px;
        font-size: 14px;
        color: #999;
      }
    }
    .workOperat {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      .work {
        display: flex;
        .workInput {
          width: 200px;
          margin-right: 10px;
        }
      }
    }
  }
}
.global{
  pointer-events: none;
  opacity: 0.1;
}
</style>