<template>
  <div class="wrapper" v-loading="projectDetailInfoLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">
    <header-bar @getContentData="getProjectDetailInfoByProjectId"></header-bar>
    <side-bar></side-bar>
    <project-detail-info-content></project-detail-info-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import ProjectDetailInfoContent from './components/content'
import qs from 'qs'
export default {
  name: 'PunchCardDetailInfo',
  props: ['punchCardProjectNameList', 'currProjectId'],
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd' +
        '/public/',
      projectDetailInfoLoading: true
    }
  },
  components: {
    HeaderBar,
    SideBar,
    ProjectDetailInfoContent
  },
  mounted () {
    // 点击左边的导航栏进行组件切换时，组件挂载后同样需要获取当前圈子的简介信息
    let currProjectId = this.$store.state.value
    let that = this
    let time = 0
    if (currProjectId === '') {
      let interval = setInterval(function () {
        console.log('开启定时器，当获取到当前圈子ID时进行该当前圈子的简介信息获取，time:' + time)
        currProjectId = that.$store.state.value
        if (currProjectId !== '' && time <= 20000) {
          console.log('获取到当前圈子ID，取消定时器，进行当前圈子的简介信息获取')
          that.projectDetailInfoLoading = false
          that.getProjectDetailInfoByProjectId(currProjectId)
          clearInterval(interval)
        } else if (time > 20000) {
          that.projectDetailInfoLoading = false
          clearInterval(interval)
          alert('网络异常!')
        }
        time += 500
      }, 500)
    } else {
      console.log('获取到当前圈子ID，进行当前圈子的简介信息获取')
      that.getProjectDetailInfoByProjectId(currProjectId)
    }
  },
  methods: {
    // 监听顶部打卡圈子选择菜单，打卡圈子切换时需要请求对应圈子的简介信息
    getProjectDetailInfoByProjectId (projectId) {
      console.log('获取编号为' + projectId + '打卡圈子的简介信息')
      let that = this
      let startTime = new Date().getTime()
      that.projectDetailInfoLoading = true
      let params = {
        projectId: projectId
      }
      let url = this.baseUrl +
        'index/PunchCardProjectManagementSys/getProjectPunchCardThemeListById'
      this.$axios.post(url, qs.stringify(params))
        .then(function (success) {
          console.log(success)
          let endTime = new Date().getTime()
          if (endTime - startTime <= 2000) {
            setTimeout(function () {
              that.projectDetailInfoLoading = false
              that.$message.warning({
                message: '功能开发中',
                duration: 2000,
                showClose: true
              })
            }, 1000)
          } else {
            that.projectDetailInfoLoading = false
            that.$message.success({
              message: '功能开发中',
              duration: 2000,
              showClose: true
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.response)
          let resp = error.response
          if (resp.status === 403) {
            that.$message({
              type: 'error',
              message: '请先登录',
              showClose: true,
              duration: 1000
            })
            that.projectDetailInfoLoading = false
            setTimeout(function () {
              that.$router.push('/login')
            }, 1000)
          } else {
            that.$message({
              type: 'error',
              message: resp.errMsg,
              showClose: true,
              duration: 3000
            })
            that.projectDetailInfoLoading = false
          }
        })
    }

  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
