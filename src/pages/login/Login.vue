<template>
  <div>
    <div class="nav">
      <div>小打卡后台管理系统</div>
    </div>
    <div class="login-form">
      <el-card class="box-card">
        <div slot="header" class="clear-fix">
          <span>用户登录</span>
          <el-tooltip class="item" effect="dark"
                      content="1 or 8" placement="right">
            <el-button style="float: right; padding: 3px 0" type="text">
              查看测试用户ID
            </el-button>
          </el-tooltip>
        </div>
        <el-form :model="numberValidateForm" ref="numberValidateForm"
                 label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="用户ID"
            prop="userId"
            :rules="[{ required: true, message: '用户ID不能为空'},
              { type: 'number', message: '用户ID必须为数字值'}]">
            <el-input type="userId" v-model.number="numberValidateForm.userId"
                      autocomplete="off" style="width: 400px;">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"
                       @click="submitForm('numberValidateForm')">
              提交
            </el-button>
            <el-button size="small"
                       @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--        <el-collapse v-model="activeNames">-->
<!--          <el-collapse-item title="测试用户登录说明" name="1" style="color: blue;">-->
<!--            <div>测试用户ID:1 or 8</div>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->
      </el-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd/public/',
      activeNames: ['1'],
      numberValidateForm: {
        userId: ''
      },
      punchCardProjectNameList: []
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            userId: this.numberValidateForm.userId
          }
          let that = this
          let url = this.baseUrl + '/index/PunchCardProjectManagementSys/login'
          this.$axios.post(url, qs.stringify(params))
            .then(function (res) {
              console.log(res)
              that.$store.commit('setUserId', res.data.data.id)
              console.log('loginUserId:' + res.data.data.id)
              that.$message({
                type: 'success',
                message: '登录成功',
                showClose: true,
                duration: 1000
              })
              setTimeout(function () {
                // 登录成功获取用户打卡圈子列表
                that.getPunchCardListInfo()
              }, 1000)
            })
            .catch(function (error) {
              console.log(error.response)
              let respData = error.response.data
              that.$message.error(respData.errMsg)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 登录成功后获取用户打卡圈列表
    getPunchCardListInfo () {
      let startTime = new Date().getTime()
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(250, 250, 250, 1)'
      })
      console.log('开始获取个人打卡圈子列表信息')
      let param = {
        userId: this.$store.state.userId
      }
      let url = this.baseUrl + '/index/User/getUserCreatedProjectList'
      let that = this
      this.$axios.post(url, qs.stringify(param))
        .then(function (res) {
          let endTime = new Date().getTime()
          if ((endTime - startTime) <= 2000) {
            setTimeout(function () {
              loading.close()
              that.$notify({
                title: '提示',
                message: '当前数据为测试用户数据!',
                type: 'warning',
                duration: 10000,
                offset: 100
              })
            }, 2000)
          } else {
            loading.close()
            that.$notify({
              title: '提示',
              message: '当前数据为测试用户数据!',
              type: 'warning',
              duration: 10000,
              offset: 100
            })
          }
          console.log(res)
          let respData = res.data
          let projectNameList = respData.data.projectNameList
          let projectList = respData.data.createdPunchCardProjectList
          let userInfo = {
            id: respData.data.id,
            nick_name: respData.data.nick_name,
            sex: respData.data.sex,
            avatar_url: respData.data.avatar_url
          }
          for (let i = 0; i < projectNameList.length; i++) {
            that.$set(that.punchCardProjectNameList, i, projectNameList[i])
          }
          // that.currProjectId = that.punchCardProjectNameList[0].projectId
          // 将当前用户创建的打卡圈子列表数据存储到vuex中
          that.$store.commit(
            'setPunchCardProjectNameList', that.punchCardProjectNameList
          )
          that.$store.commit('setCurrSelectIndex', 0)
          that.$store.commit('setValue', that.punchCardProjectNameList[0].projectId)
          // 打卡圈子列表详细信息
          that.$store.commit('setCreatedPunchCardProjectList', projectList)
          // 保存当前用户信息
          that.$store.commit('setUserInfo', userInfo)
          that.$store.commit('consoleData')
          // 获取打卡圈子列表成功后跳转到首页
          that.$router.push({path: '/index'})
        })
        .catch(function (res) {
          let endTime = new Date().getTime()
          if ((endTime - startTime) <= 2000) {
            setTimeout(function () {
              loading.close()
            }, 1500)
          } else {
            loading.close()
          }
          console.log(res)
        })
    }

  }
}
</script>

<style scoped>
.nav {
  border-bottom: 1px solid #DCDFE6;
  font-size: 18px;
  color: #5e5e5e;
  background-color: #f8f8f8;
  width: 100%;
  height: 50px;
  padding-left: 80px;
  margin-bottom: 20px;
  line-height: 50px;
}
.login-form {
  width: 100%;
  height: auto;
  display: flex;
}
.box-card {
  width: 600px;
  margin: 0 auto;
}
.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}
.clear-fix:after {
  clear: both
}
.el-collapse {
  border:0 solid white;
}
</style>
