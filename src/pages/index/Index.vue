<template>
  <div class="wrapper">
    <header-bar></header-bar>
    <side-bar></side-bar>
    <punch-card-content></punch-card-content>
  </div>
</template>

<script>
import HeaderBar from '../../components/header'
import SideBar from '../../components/sidebar'
import PunchCardContent from './components/content'
export default {
  name: 'Index',
  props: ['punchCardProjectNameList', 'currProjectId'],
  data () {
    return {
      projectNameList: this.punchCardProjectNameList,
      projectId: this.currProjectId + ''
    }
  },
  components: {
    HeaderBar,
    SideBar,
    PunchCardContent
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
