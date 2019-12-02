<template>
  <div class="header-bar">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="logo" class="logo-img">
    </div>
    <el-select v-model="value" @change="selectPunchCardProject"
               placeholder="请选择" value="" class="punch-card-project-select">
      <el-option
        v-for="(item, index) in punchCardProjectNameList"
        :index="index"
        :key="item.projectId"
        :label="item.projectName"
        :value="item.projectId" @click.native="getCurrSelectIndex(index)">
      </el-option>
    </el-select>
    <div  class="tips">当前圈子</div>
    <div class="user-info">
      <img class="user-logo" :src="this.$store.state.userInfo.avatar_url" alt="">
    </div>
    <div class="user-name">{{this.$store.state.userInfo.nick_name}}</div>
    <div id="logout" class="logout" @click="userLogout" @mouseover="setMouseStyle">
      退出
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerBar',
  data () {
    return {
      baseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public',
      baseUrl_local: 'http://myxu.com/EndProject/SmallPunchMiniProgramAfterEnd/public/'
    }
  },
  computed: {
    value: {
      set: function () {},
      get: function () {
        return this.$store.state.value
      }
    },
    punchCardProjectNameList: function () {
      return this.$store.state.punchCardProjectNameList
    }
  },
  methods: {
    userLogout () {
      let that = this
      let url = this.baseUrl + '/index/PunchCardProjectManagementSys/logout'
      this.$axios.post(url)
        .then(function (res) {
          console.log(res)
          that.$message({
            type: 'success',
            message: '退出成功',
            showClose: true,
            duration: 1000
          })
          setTimeout(function () {
            // 登录成功获取用户打卡圈子列表
            that.$router.push('/login')
          }, 1000)
        })
        .catch(function (error) {
          console.log(error.response)
          that.$message.error('网络异常')
        })
    },
    // 鼠标悬浮到退出div时 修改鼠标的样式
    setMouseStyle () {
      document.getElementById('logout').style.cursor = 'pointer'
    },
    selectPunchCardProject (currSelectProjectId) {
      let that = this
      that.$store.commit('setValue', currSelectProjectId)
      console.log('currSelectProjectId:' + currSelectProjectId)
      // 当切换打卡圈子的时候触发父组件的事件，发送对应请求获取当前圈子的相关数据
      this.$emit('getContentData', currSelectProjectId)
    },
    getCurrSelectIndex (index) {
      let that = this
      that.$store.commit('setCurrSelectIndex', index)
      console.log('currSelectIndex:' + that.$store.state.currSelectIndex)
    }
  }
}
</script>

<style scoped>
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*box-sizing: border-box;*/
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    background-color: white;
    /*box-shadow: 0 1px 3px rgba(26,26,26,.1);*/
  }

  .header-bar .logo {
    float: left;
    width: 20%;
    text-align: left;
    box-sizing: border-box;
    padding-left: 60px;
  }

  .logo-img {
    height: 36px;
    margin-top: 17px;
    display: block;
  }
  .punch-card-project-select {
    vertical-align: middle;
    float: left;
    height: 36px;
  }
  .header-bar > el-select {

  }

  .tips {
    display: inline-block;
    font-size: 12px;
    color: #999;
    margin-left: 5px;
    vertical-align: middle;
    width: auto;
    text-align: center;
  }
  .user-info {
    position: absolute;
    padding-right: 300px;
    top: 0;
    right: 0;
    font-size: 16px;
    color: white;
  }
  .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-name {
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 190px;
    font-size: 14px;
    color: black;
  }
  .logout {
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 140px;
    font-size: 14px;
    color: black;
  }
</style>
