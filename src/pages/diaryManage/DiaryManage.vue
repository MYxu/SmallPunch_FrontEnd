<template>
  <div class="wrapper" v-loading="diaryListLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">
    <header-bar @getContentData="getDiaryListByProjectId"></header-bar>
    <side-bar></side-bar>
    <diary-content :page-size="pageSize"
                   :curr-page-no="currPageNo"
                   :all-diary-num="allDiaryNum"
                   :curr-page-diary-lists="currPageDiaryLists"
                   @getDiaryListByPageNo="getDiaryListByProjectId">
    </diary-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import DiaryContent from './components/content'
import qs from 'qs'
export default {
  name: 'diaryManage',
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd' +
        '/public/',
      diaryListLoading: true,
      currPageDiaryLists: [], // 存储当前页的日记列表数据
      pageSize: 3, // 每页显示的打卡日记条数
      currPageNo: 0, // 当前页码
      allDiaryNum: 0 // 该圈子总的打卡日记数
    }
  },
  components: {
    HeaderBar,
    SideBar,
    DiaryContent
  },
  beforeCreate () {
    console.log('diary beforeCreate')
    // const loading = this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(255,255,255,1)'
    // })
    // setTimeout(function () {
    //   loading.close()
    // }, 5000)
  },
  created () {
    console.log('diary created')
  },
  mounted () {
    // 组件挂载后需要获取当前圈子的打卡日记列表
    let currProjectId = this.$store.state.value
    let that = this
    let time = 0
    if (currProjectId === '') {
      // 刷新当前页面时需要等待获取到打卡圈子列表数据后才能获取到打卡圈子ID
      let interval = setInterval(function () {
        console.log('开启定时器，当获取到当前圈子ID时进行该圈子的日记列表数据获取，time:' + time)
        currProjectId = that.$store.state.value
        if (currProjectId !== '' && time <= 20000) {
          console.log('获取到当前圈子ID，取消定时器，进行打卡圈子日记列表数据获取')
          that.diaryListLoading = false
          that.getDiaryListByProjectId(currProjectId)
          clearInterval(interval)
        } else if (time > 20000) {
          that.diaryListLoading = false
          clearInterval(interval)
          alert('网络异常!')
        }
        time += 500
      }, 500)
    } else {
      console.log('获取到当前圈子ID，进行打卡圈子日记列表数据获取')
      this.getDiaryListByProjectId(currProjectId)
    }
  },
  methods: {
    // 监听顶部打卡圈子选择菜单，打卡圈子切换时需要请求对应圈子的打卡日记列表
    getDiaryListByProjectId (projectId, pageNo = 1) {
      console.log('获取编号为' + projectId + '打卡圈子的打卡日记列表')
      let that = this
      let startTime = new Date().getTime()
      that.diaryListLoading = true
      let params = {
        projectId: projectId,
        userId: that.$store.state.userInfo.id,
        pageNo: pageNo,
        pageSize: this.pageSize
      }
      let url = this.baseUrl +
        'index/PunchCardProjectManagementSys/getDiaryListsByProjectId'
      this.$axios.post(url, qs.stringify(params))
        .then(function (success) {
          console.log(success)
          let endTime = new Date().getTime()
          if ((endTime - startTime) <= 2000) {
            setTimeout(function () {
              that.diaryListLoading = false
              let resp = success.data
              that.currPageNo = pageNo
              that.allDiaryNum = resp.data.allDiaryNum
              that.currPageDiaryLists = resp.data.currPageDiaryLists
            }, 1000)
          } else {
            that.diaryListLoading = false
            let resp = success.data
            that.currPageNo = pageNo
            that.allDiaryNum = resp.data.allDiaryNum
            that.currPageDiaryLists = resp.data.currPageDiaryLists
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
            setTimeout(function () {
              that.diaryListLoading = false
              that.$router.push('/login')
            }, 1000)
          }
          if (resp.status === 400) {
            that.$message({
              type: 'error',
              message: '该圈子尚未有打卡日记',
              showClose: true,
              duration: 3000
            })
            that.currPageNo = pageNo
            that.allDiaryNum = 0
            that.currPageDiaryLists = []
            that.diaryListLoading = false
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
