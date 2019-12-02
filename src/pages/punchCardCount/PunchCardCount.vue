<template>
  <div class="wrapper"  v-loading="punchCardCountListLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">
    <header-bar @getContentData="getProjectCountInfoByProjectId"></header-bar>
    <side-bar></side-bar>
    <punch-card-count-content  :page-size="pageSize"
                               :curr-page-no="pageNo"
                               :all-member-num="allPunchCardCountNum"
                               :curr-page-member-lists="currPagePunchCardCountLists"
                               @getPunchCardCountListByPageNo="getProjectCountInfoByProjectId">
    </punch-card-count-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import PunchCardCountContent from './components/content'
import qs from 'qs'
export default {
  name: 'PunchCardCount',
  props: ['punchCardProjectNameList', 'currProjectId'],
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd' +
        '/public/',
      punchCardCountListLoading: true,
      currPagePunchCardCountLists: [], // 存储当前页的打卡统计列表数据
      pageSize: 1, // 每页显示的打卡统计数据条数
      pageNo: 0, // 当前页码
      allPunchCardCountNum: 0 // 符合过滤条件的打卡统计数据总数
    }
  },
  components: {
    HeaderBar,
    SideBar,
    PunchCardCountContent
  },
  mounted () {
    // 点击左边的导航栏进行组件切换时，组件挂载后同样需要获取当前圈子的统计数据
    let currProjectId = this.$store.state.value
    let that = this
    let time = 0
    if (currProjectId === '') {
      let interval = setInterval(function () {
        console.log('开启定时器，当获取到当前圈子ID时进行该圈子的打卡统计数据获取，time:' + time)
        currProjectId = that.$store.state.value
        if (currProjectId !== '' && time <= 20000) {
          console.log('获取到当前圈子ID，取消定时器，进行打卡圈子打卡统计数据获取')
          that.punchCardCountListLoading = false
          that.getProjectCountInfoByProjectId(currProjectId)
          clearInterval(interval)
        } else if (time > 20000) {
          that.punchCardCountListLoading = false
          clearInterval(interval)
          alert('网络异常!')
        }
        time += 500
      }, 500)
    } else {
      console.log('获取到当前圈子ID，进行打卡圈子打卡统计数据获取')
      that.getProjectCountInfoByProjectId(currProjectId)
    }
  },
  methods: {
    // 监听顶部打卡圈子选择菜单，打卡圈子切换时需要请求对应圈子的统计数据
    getProjectCountInfoByProjectId (projectId, pageNo = 1) {
      console.log('获取编号为' + projectId + '打卡圈子的统计数据')
      let that = this
      let startTime = new Date().getTime()
      that.punchCardCountListLoading = true
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
              that.punchCardCountListLoading = false
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
            that.punchCardCountListLoading = false
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
            that.punchCardCountListLoading = false
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
            that.allPunchCardCountNum = 0
            that.currPagePunchCardCountLists = []
            that.punchCardCountListLoading = false
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
