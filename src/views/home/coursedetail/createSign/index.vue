<template>
  <div>
    <div class="signList">
        <el-table
          :data="signList || []"
          style="width: 90%"
          height="250"
          >
          <el-table-column prop="id"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deadline"
            label="截止日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="valed"
            label="还未过期"
            width="120"
            align="center"
            >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index + 1, scope.row)">查看签到情况</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <!-- 发起签到 -->
      <el-form :model="form" label-width="100px">
        <el-form-item label="签到截止时间" prop="date">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signIn">发起签到</el-button>
        <el-button >取 消</el-button>
      </span>

      <!-- 查看签到情况,分已签和未签 -->
      <div class="singIn">
        <div class="singDone">
          <div class="done">已签到学生  </div>
          <el-table :data="signedStudentList" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="160"></el-table-column>
            <el-table-column prop="date" label="学号" width="160"></el-table-column>
          </el-table>
        </div>


        <div class="singDoing">
          <div class="doing">未签到学生</div>
          <el-table :data="signingStudentList" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="160"></el-table-column>
            <el-table-column prop="username" label="学号" width="160"></el-table-column>

          </el-table>
        </div>
      </div>
      
      
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        date: "",
      },
      sign_id: "",
    }
  },
  methods: {
    signIn() {
      //格式化时间
      let date = new Date(this.form.date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      let time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
      //从路由获取课程id
      let courseId = this.$route.params.course_id;
      // 发起签到
      this.$store.dispatch("courseSign", {
        course_id: courseId,
        deadline: time,
      }).then(() => {
        //获取签到列表
        this.$store.dispatch("getSignList", {
          course_id: this.$route.params.course_id,
        }).then((res) => {
        this.$message({
          message: "成功发起签到",
          type: "success",
          Authorization: getToken()
        });
      
      });
      });
    },
    handleDelete(index, row) {
      this.sign_id = index;
      localStorage.setItem("sign_id", JSON.stringify(index));
      let sign_id = index;
      let course_id = this.$route.params.course_id;
      this.$store.dispatch('getSignedStudentList', {
        sign_id: sign_id,
        course_id: course_id,
      })
    }
  },
  computed: {
    ...mapState({
      signList: state => state.course.signList,
      signedStudentList: state => state.course.signedStudentList,
      signingStudentList: state => state.course.signingStudentList,
    })
  },
  mounted() {
    //获取签到列表
    this.$store.dispatch("getSignList", {
      course_id: this.$route.params.course_id,
    });
    if (JSON.parse(localStorage.getItem("sign_id"))) {
        this.$store.dispatch('getSignedStudentList', {
          sign_id: JSON.parse(localStorage.getItem("sign_id")),
          course_id: this.$route.params.course_id,
        })
    }

  }
}
</script>

<style lang="less" scoped>
.singIn{
  display: flex;
  margin-top: 20px;
  .singDone{
    width: 50%;
    height: 300px;
    border: 1px solid #ccc;
    .done{
      width: 160px;
      color: #409EFF;
    }
  }
  .singDoing{
    width: 50%;
    height: 300px;
    border: 1px solid #ccc;
    .doing{
      width: 160px;
      color: red;
    }
  }
}

</style>