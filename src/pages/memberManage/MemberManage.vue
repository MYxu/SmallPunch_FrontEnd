<template>
  <div class="wrapper" v-loading="memberListLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, .8)">
    <header-bar @getContentData="getMemberListByProjectId"></header-bar>
    <side-bar></side-bar>
    <member-manage-content :page-size="pageSize"
                           :curr-page-no="pageNo"
                           :all-member-num="allMemberNum"
                           :curr-page-member-lists="currPageMemberLists"
                           @getMemberListByPageNo="getMemberListByProjectId">
    </member-manage-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import MemberManageContent from './components/content'
import qs from 'qs'
export default {
  name: 'MemberManage',
  props: ['punchCardProjectNameList', 'currProjectId'],
  components: {
    HeaderBar,
    SideBar,
    MemberManageContent
  },
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd' +
        '/public/',
      memberListLoading: true,
      currPageMemberLists: [], // 存储当前页的成员列表数据
      pageSize: 1, // 每页显示的成员数
      pageNo: 0, // 当前页码
      allMemberNum: 0 // 符合过滤条件的圈子成员总数
    }
  },
  beforeCreate () {
    console.log('memberManage beforeCreate')
  },
  created () {
    console.log('memberManage beforeCreate')
  },
  mounted () {
    // 组件挂载后需要获取当前圈子的打卡日记列表
    let currProjectId = this.$store.state.value
    let that = this
    let time = 0
    if (currProjectId === '') {
      let interval = setInterval(function () {
        console.log('开启定时器，当获取到当前圈子ID时进行该圈子的日记列表数据获取，time:' + time)
        currProjectId = that.$store.state.value
        if (currProjectId !== '' && time <= 20000) {
          console.log('获取到当前圈子ID，取消定时器，进行打卡圈子日记列表数据获取')
          that.diaryListLoading = false
          that.getMemberListByProjectId(currProjectId)
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
      this.getMemberListByProjectId(currProjectId)
    }
  },
  methods: {
    // 监听顶部打卡圈子选择菜单，打卡圈子切换时需要请求对应圈子的成员列表
    getMemberListByProjectId (projectId, pageNo = 1) {
      console.log('获取编号为' + projectId + '打卡圈子的成员列表')
      let that = this
      let startTime = new Date().getTime()
      that.memberListLoading = true
      let params = {
        projectId: projectId,
        pageNo: pageNo,
        pageSize: that.pageSize
      }
      let url = this.baseUrl + 'index/PunchCardProjectManagementSys/getProjectMemberListById'
      this.$axios.post(url, qs.stringify(params))
        .then(function (success) {
          console.log(success)
          let endTime = new Date().getTime()
          if (endTime - startTime <= 2000) {
            setTimeout(function () {
              that.memberListLoading = false
              let resp = success.data
              that.currPageNo = pageNo
              that.allMemberNum = resp.data.allMemberNum
              that.currPageMemberLists = resp.data.attendUserList
            }, 500)
          } else {
            that.memberListLoading = false
            let resp = success.data
            that.currPageNo = pageNo
            that.allMemberNum = resp.data.allMemberNum
            that.currPageMemberLists = resp.data.attendUserList
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
          } else {
            that.$message({
              type: 'error',
              message: resp.errMsg,
              showClose: true,
              duration: 3000
            })
            that.currPageNo = pageNo
            that.allMemberNum = 0
            that.currPageMemberLists = []
            that.memberListLoading = false
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
