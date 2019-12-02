<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'App',
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public',
      punchCardProjectNameList: [],
      currProjectId: ''
    }
  },
  methods: {
    getPunchCardListInfo () {
      let startTime = new Date().getTime()
      let loading
      if (this.$route.path !== '/login') {
        loading = this.$loading({
          lock: true,
          text: 'loading',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, .8)'
        })
      }
      console.log('开始获取个人打卡圈子列表信息')
      let param = {
        userId: 1
      }
      let url = this.baseUrl + '/index/User/getUserCreatedProjectList'
      let that = this
      this.$axios.post(url, qs.stringify(param))
        .then(function (res) {
          console.log(res)
          let endTime = new Date().getTime()
          if ((endTime - startTime) <= 2000) {
            setTimeout(function () {
              if (that.$route.path !== '/login') {
                loading.close()
              }
              // 数据处理
              that.dataDeal(res.data)
            }, 2000)
          } else {
            if (that.$route.path !== '/login') {
              loading.close()
            }
            // 数据处理
            this.dataDeal(res.data)
          }
        })
        .catch(function (res) {
          if (that.$route.path !== '/login') {
            let endTime = new Date().getTime()
            if ((endTime - startTime) <= 2000) {
              setTimeout(function () {
                loading.close()
                that.$message({
                  type: 'error',
                  message: '系统异常',
                  showClose: true,
                  duration: 1000
                })
              }, 1500)
            } else {
              loading.close()
              that.$message({
                type: 'error',
                message: '系统异常',
                showClose: true,
                duration: 1000
              })
            }
            console.log(res)
          }
        })
    },
    dataDeal (respData) {
      let that = this
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
      that.currProjectId = that.punchCardProjectNameList[0].projectId
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
    }
  },
  created () {
    console.log('app created')
    if (this.$store.state.punchCardProjectNameList.length <= 0 &&
      this.$route.path !== '/login') {
      this.getPunchCardListInfo()
    }
  },
  mounted () {
    console.log('app mounted')
  }
}
</script>

<style>
  #app, body, html{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  * {
    margin: 0;
    padding: 0;
  }
</style>
