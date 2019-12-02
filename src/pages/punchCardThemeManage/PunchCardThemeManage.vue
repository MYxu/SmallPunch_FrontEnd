<template>
  <div class="wrapper" v-loading="themeListLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">
    <header-bar @getContentData="getProjectThemeListByProjectId"></header-bar>
    <side-bar></side-bar>
    <punch-card-theme-manage-content :page-size="pageSize"
                                     :curr-page-no="pageNo"
                                     :all-member-num="allThemeNum"
                                     :curr-page-member-lists="currPageThemeLists"
                                     @getThemeListByPageNo="getProjectThemeListByProjectId">
    </punch-card-theme-manage-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import PunchCardThemeManageContent from './components/content'
import qs from 'qs'
export default {
  name: 'PunchCardThemeManage',
  props: ['punchCardProjectNameList', 'currProjectId'],
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd' +
        '/public/',
      themeListLoading: true,
      currPageThemeLists: [], // 存储当前页的打卡主题列表数据
      pageSize: 1, // 每页显示的打卡主题条数
      pageNo: 0, // 当前页码
      allThemeNum: 0 // 符合过滤条件的圈子打卡主题总数
    }
  },
  components: {
    HeaderBar,
    SideBar,
    PunchCardThemeManageContent
  },
  created () {
    console.log('punchCardTheme created')
  },
  mounted () {
    console.log('theme mounted')
    // 组件挂载后需要获取当前圈子的主题列表
    let currProjectId = this.$store.state.value
    let that = this
    let time = 0
    if (currProjectId === '') {
      let interval = setInterval(function () {
        console.log('开启定时器，当获取到当前圈子ID时进行该圈子的主题列表数据获取，time:' + time)
        currProjectId = that.$store.state.value
        if (currProjectId !== '' && time <= 20000) {
          console.log('获取到当前圈子ID，取消定时器，进行打卡圈子主题列表数据获取')
          that.themeListLoading = false
          that.getProjectThemeListByProjectId(currProjectId)
          clearInterval(interval)
        } else if (time > 20000) {
          that.themeListLoading = false
          clearInterval(interval)
          alert('网络异常!')
        }
        time += 500
      }, 500)
    } else {
      console.log('获取到当前圈子ID，进行打卡圈子主题列表数据获取')
      that.getProjectThemeListByProjectId(currProjectId)
    }
  },
  beforeDestroy () {
    console.log('theme beforeDestroy')
  },
  methods: {
    // 监听顶部打卡圈子选择菜单，打卡圈子切换时需要请求对应圈子的主题列表
    getProjectThemeListByProjectId (projectId, pageNo = 1) {
      console.log('获取编号为' + projectId + '打卡圈子的主题列表')
      let that = this
      let startTime = new Date().getTime()
      that.themeListLoading = true
      let params = {
        projectId: projectId,
        pageNo: pageNo,
        pageSize: that.pageSize
      }
      let url = this.baseUrl +
        'index/PunchCardProjectManagementSys/getProjectPunchCardThemeListById'
      this.$axios.post(url, qs.stringify(params))
        .then(function (success) {
          console.log(success)
          let endTime = new Date().getTime()
          if (endTime - startTime <= 2000) {
            setTimeout(function () {
              that.themeListLoading = false
              // let resp = success.data
              // that.currPageNo = pageNo
              // that.allThemeNum = resp.data.allThemeNum
              // that.currPageThemeLists = resp.data.themeList
              that.$message.warning({
                message: '功能开发中',
                duration: 2000,
                showClose: true
              })
            }, 1000)
          } else {
            that.themeListLoading = false
            // let resp = success.data
            // that.currPageNo = pageNo
            // that.allThemeNum = resp.data.allThemeNum
            // that.currPageThemeLists = resp.data.themeList
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
            that.themeListLoading = false
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
            that.currPageNo = pageNo
            that.allThemeNum = 0
            that.currPageThemeLists = []
            that.themeListLoading = false
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
