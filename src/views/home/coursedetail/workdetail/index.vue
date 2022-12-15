<template>
  <div>
    <!-- 自己上传的文件列表 -->
    <div class="myfileList" :class="{'global': isAppear}">
      该作业已上传的文件 {{myFileList[0]}} 
      该课程总人数{{homeWorkList[$route.params.work_id - 1].stuCount}}
      已上交人数{{homeWorkList[$route.params.work_id - 1].workCount}}
    </div>
    <!-- 学生上传的文件列表 -->
    <div class="studentFileList" :class="{'global': isAppear}">
      学生上传的文件列表
      <el-table
       :data="studentFileList"
        style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="file"
        label="文件名">
      </el-table-column>
      <el-table-column label="操作" :class="{'global': isAppear}">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUpload(scope.$index, scope.row)">下载</el-button>
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">批改</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- 批改框 -->
    <div class="correctFrame" v-if="isAppear">
      <!-- 选择框 -->
        <el-select v-model="value" placeholder="请选择" class="correctSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="score" placeholder="请打分(可不填 0-10分)" class="correctInput"> </el-input>
        <el-button type="primary" @click="correctFile">确定</el-button>
        <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isAppear: false,
      score: '',
      value: '',
      docName: '',
      options: [{
        value: '通过',
        label: '通过'
        },
        {
          value: '不通过',
          label: '不通过'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      myFileList: state => state.file.myFileList || [],
      studentFileList: state => state.file.studentFileList || [],
      homeWorkList: state => state.course.homeworkList || [],
    }),
  
  },
  mounted() {
    // 从路由中获取作业id
    const workId = this.$route.params.work_id;
    this.$store.dispatch('getMyFileList', {work_id : workId})
    this.$store.dispatch('getStudentFileList', {work_id : workId})
    
  },
  methods: {
    handleUpload(index, row) {
      let work_id = this.$route.params.work_id;
      let docName = row.username + '-' + row.name + '-' + row.file;
      this.$store.dispatch('downloadStudentFile', {work_id, docName}).then((res)=> {
        console.log(res);
        let url = window.URL.createObjectURL(new Blob([res]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url
        link.download = docName;
        link.click();
      })
    },
    handleEdit(index, row) {
      this.isAppear = !this.isAppear
      this.$bus.$emit('correct',"1")
      this.docName = row.username + '-' +row.name + '-' + row.file
    },
    cancel() {
      this.isAppear = !this.isAppear
      this.$bus.$emit('correct',"1")
    },
    correctFile() {
      let docName =this.docName
      let good = this.value === '通过'
      let work_id = this.$route.params.work_id
      let score = this.score
      console.log(docName);
      //发批改请求
      this.$store.dispatch('correctStudentFile', {
        docName,
        good: good + '',
        work_id,
        score
      }).then(res => {
        this.$message({
          message: '批改成功',
          type: 'success'
        })
        this.isAppear = !this.isAppear
        this.$bus.$emit('correct',"1")
      })
    }
  },
}
</script>

<style scoped lang="less">
.correctFrame{
  width: 300px;
  height: 100px;
  background-color: rgb(235, 232, 232);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 5px;
  .correctSelect{
    width: 100px;
  }
  .correctInput{
    width: 200px;
  }
}
.global{
  pointer-events: none;
  opacity: 0.1;
}
</style>