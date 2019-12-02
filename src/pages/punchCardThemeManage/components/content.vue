<template>
  <div class="punch-card-project-theme-manage-right-area">
    <div class="theme-content">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/index'}">
          <i class="el-icon-menu mr-5"></i>圈子首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>主题管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button type="primary" class="mt-20" icon="el-icon-plus">新建主题</el-button>
      </div>
      <div class="mt-20" style="color: #475669; letter-spacing: 0; font-size: 16px;">
        历史主题
      </div>
      <div class="theme-list-table-header mt-10">
        <div class="header-title" style="width: 120px;">展示日期</div>
        <div class="header-title" style="width: 536px;">主题名称</div>
        <div class="header-title" style="width: 120px;">阅读量</div>
        <div class="header-title" style="width: 200px;">操作</div>
      </div>
      <div class="theme-list-item">
        <div class="table-square" style="width: 120px;">2019-05-22</div>
        <div class="table-square theme-list-item-theme-name">
          <img src="https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/image_upload/project_cover_img/sys_recommend/20181001/0a52b6b544e9fbb052bc112a5fb2a7b5.png" alt="">
          <div style="margin-left: 20px;">星辰大海</div>
        </div>
        <div class="table-square" style="width: 120px;">暂无</div>
        <div class="table-square theme-list-item-operate-btn">
          <button type="button" class="el-button el-button--text">
            <span>编辑</span>
          </button>
          <button type="button" class="el-button el-button--text ml-20">
            <span>复制主题</span>
          </button>
          <button type="button" class="el-button el-button--text ml-20">
            <span>删除</span>
          </button>
        </div>
      </div>
      <div class="theme-list-item">
        <div class="table-square" style="width: 120px;">2019-05-21</div>
        <div class="table-square theme-list-item-theme-name">
          <img src="https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/image_upload/project_cover_img/sys_recommend/20181001/0a52b6b544e9fbb052bc112a5fb2a7b5.png" alt="">
          <div style="margin-left: 20px;">星辰大海</div>
        </div>
        <div class="table-square" style="width: 120px;">123</div>
        <div class="table-square theme-list-item-operate-btn">
          <button type="button" class="el-button el-button--text">
            <span>编辑</span>
          </button>
          <button type="button" class="el-button el-button--text ml-20">
            <span>复制主题</span>
          </button>
          <button type="button" class="el-button el-button--text ml-20">
            <span>删除</span>
          </button>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="2" :page-size="themePageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'punchCardThemeManageContent',
  data () {
    return {
      themePageSize: 5
    }
  }
}
</script>

<style scoped>
  .punch-card-project-theme-manage-right-area {
    background-color: #f9f9f9;
    width: 80%;
    height: 100%;
    margin-left: 20%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
  }
  .theme-content {
    width: 983px;
    height: 100%;
    padding: 40px 40px 0 0;
    overflow: auto;
  }
  /*.theme-content  .el-button--primary {*/
  /*  background-color: #1caca9;*/
  /*  border-color: #1caca9;*/
  /*}*/
  .theme-list-table-header {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 980px;
    max-width: 980px;
    background-color: #fff;
    border: 1px solid #dfe6ec;
    font-size: 14px;
    color: #1f2d3d;
  }
  .theme-list-table-header .header-title {
    background-color: #eef1f6;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #dfe6ec;
  }
  .theme-list-item {
    background: #f9fafc;
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    display: flex;
    flex-direction: row;
    height: 92px;
    width: 980px;
    max-width: 980px;
  }
  .table-square {
    background-color: #f9fafc;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .theme-list-item-theme-name {
    width: 536px;
    display: flex;
    justify-content: left;
  }
  .theme-list-item-theme-name > img {
    height: 60px;
    width: 80px;
    margin-left: 20px;
  }
  .theme-list-item-operate-btn {
    font-size: 14px;
    color: rgb(28, 172, 169);
    width: 200px;
  }
  .el-button--text {
    font-size: 14px;
    color: #1caca9;
    letter-spacing: 0;
  }
  .pagination {
    margin-bottom: 100px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
