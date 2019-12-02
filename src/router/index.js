import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import DiaryManage from '@/pages/diaryManage/DiaryManage'
import PunchCardThemeManage from '@/pages/punchCardThemeManage/PunchCardThemeManage'
import MemberManage from '@/pages/memberManage/MemberManage'
import PunchCardCount from '@/pages/punchCardCount/PunchCardCount'
import ProjectDetailInfo from '@/pages/projectDetailInfo/ProjectDetailInfo'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/diary',
      name: 'DiaryManage',
      component: DiaryManage
    },
    {
      path: '/theme',
      name: 'PunchCardThemeManage',
      component: PunchCardThemeManage
    },
    {
      path: '/member',
      name: 'MemberManage',
      component: MemberManage
    },
    {
      path: '/count',
      name: 'PunchCardCount',
      component: PunchCardCount
    },
    {
      path: '/detail',
      name: 'ProjectDetailInfo',
      component: ProjectDetailInfo
    }
  ]
})
