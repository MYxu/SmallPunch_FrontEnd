<template>
  <div class="side-bar">
    <el-menu background-color="#F9F9F9" text-color="#909399" router
             style="border-right: #f9f9f9" active-text-color="#00BFA5"
             :default-active="$route.path">
      <el-menu-item index="/index"  class="tab-item">
        <i class="el-icon-s-home"></i>
        <span>圈子首页</span>
      </el-menu-item>
      <el-menu-item index="/diary"  class="tab-item">
        <i class="el-icon-s-management"></i>
        <span>日记管理</span>
      </el-menu-item>
      <el-menu-item index="/theme"  class="tab-item">
        <i class="el-icon-s-order"></i>
        <span>主题管理</span>
      </el-menu-item>
      <el-menu-item index="/member"  class="tab-item">
        <i class="el-icon-user-solid"></i>
        <span>成员管理</span>
      </el-menu-item>
      <el-menu-item index="/count"  class="tab-item">
        <i class="el-icon-s-data"></i>
        <span>打卡统计</span>
      </el-menu-item>
      <el-menu-item index="/detail"  class="tab-item">
        <i class="el-icon-s-tools"></i>
        <span>圈子详情</span>
    </el-menu-item>
    </el-menu>
<!--    <div class="tab-item" v-for="(item,index) in tabLabel" v-bind:key="index">-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      tabLabel: [
        '圈子首页',
        '日记管理',
        '主题管理',
        '成员管理',
        '打卡统计',
        '圈子详情'
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.side-bar {
  height: 100%;
  width: 20%;
  background-color: rgb(249, 249, 249);
  position: fixed;
  top: 70px;
  padding-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
/*鼠标悬浮但子菜单项时的样式修改*/
.el-menu-item:hover{
  outline: 0 !important;
  color: #00BFA5 !important;
  background: #F9F9F9 !important;

}
.el-menu-item.is-active {
  background: #F9F9F9 !important;
}
.tab-item {
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 18px;
}
</style>
