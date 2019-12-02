import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    imgBaseUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/',
    punchCardProjectNameList: [],
    currSelectIndex: 0,
    value: '', // 记录当前选择的打卡圈子id值
    userInfo: {},
    userId: 0,
    createdPunchCardProjectList: []
  },
  mutations: {
    setUserId: function (state, userId) {
      state.userId = userId
    },
    setPunchCardProjectNameList: function (state, projectNameList) {
      state.punchCardProjectNameList = projectNameList
    },
    setCurrSelectIndex: function (state, currSelectIndex) {
      state.currSelectIndex = currSelectIndex
    },
    setValue: function (state, value) {
      state.value = value
    },
    setCreatedPunchCardProjectList: function (state, projectList) {
      state.createdPunchCardProjectList = projectList
    },
    setUserInfo: function (state, userInfo) {
      state.userInfo = userInfo
    },
    consoleData: function (state) {
      console.log(state.punchCardProjectNameList)
      console.log(state.currSelectIndex)
      console.log(state.value)
      console.log(state.userInfo)
      console.log(state.createdPunchCardProjectList)
    }
  },
  actions: {
  }
})
