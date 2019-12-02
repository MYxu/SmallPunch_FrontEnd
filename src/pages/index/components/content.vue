<template>
  <div class="punch-card-project-content">
    <div class="detail-info-show">
      <div class="info-list">
        <div class="project-info-item">
          <div class="info-label">圈子Logo</div>
          <div class="project-cover-img">
            <template v-if="punchCardProjectDetailInfo.cover_img_url === 'default_cover_img'">
              <img src="https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/image_upload/project_cover_img/sys_recommend/20181001/0a52b6b544e9fbb052bc112a5fb2a7b5.png" alt=""/>
            </template>
            <template v-else>
              <img :src="'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/' + punchCardProjectDetailInfo.cover_img_url" alt=""/>
            </template>
          </div>
        </div>
        <div class="project-info-item">
          <div class="info-label">圈子名称</div>
          <div class="project-name">{{punchCardProjectDetailInfo.project_name}}</div>
        </div>
        <div class="project-info-item">
          <div class="info-label">圈子ID</div>
          <div class="project-id">{{punchCardProjectDetailInfo.id}}</div>
        </div>
        <div class="project-info-item">
          <div class="info-label">创建者</div>
          <div class="project-creator-name">{{this.$store.state.userInfo.nick_name}}</div>
        </div>
      </div>
      <div class="overview-wrap" style="max-width: 768px;">
        <div class="title">昨日数据统计（todo）</div>
        <div class="overview-list">
          <div class="overview-item">
            <div class="count">0</div>
            <div class="name">打卡人数</div>
          </div>
          <div class="overview-item">
            <div class="count">0</div>
            <div class="name">新用户数</div>
          </div>
          <div class="overview-item">
            <div class="count">{{punchCardProjectDetailInfo.attend_user_num}}</div>
            <div class="name">累计用户数</div>
          </div>
          <div class="overview-item">
            <div class="count">0</div>
            <div class="name">访问人数</div>
          </div>
          <div class="overview-item">
            <div class="count">0</div>
            <div class="name">评论数</div>
          </div>
          <div class="overview-item">
            <div class="count">0</div>
            <div class="name">点赞数</div>
          </div>
        </div>
      </div>
      <div class="overview-wrap" style="max-width: 500px;">
        <div class="title">今日待办事件（todo）</div>
        <div class="overview-list today-todo">
          <div class="overview-item" style="margin-right: 23px">
            <div class="count">0</div>
            <div class="name">今日未打卡人数</div>
          </div>
          <div class="overview-item" style="margin-right: 23px">
            <div class="count">0</div>
            <div class="name">今日未点评人数</div>
          </div>
          <div class="overview-item" style="margin-right: 23px">
            <div class="count">0</div>
            <div class="name">今日待审核人数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'punchCardContent',
  computed: {
    currSelectIndex: function () {
      return this.$store.state.currSelectIndex
    },
    punchCardProjectDetailInfo: function () {
      return this.$store.state.createdPunchCardProjectList[this.currSelectIndex]
    }
  }
}
</script>

<style scoped>
.punch-card-project-content {
  background-color: #f9f9f9;
  width: 80%;
  height: 100%;
  margin-left: 20%;
  padding: 105px 0 0 40px;
  box-sizing: border-box;
}
.detail-info-show {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f9f9f9;

}
.info-list {
  margin-bottom: 20px;
}
.project-info-item {
  max-width: 768px;
  margin-top: 28px;
  display: flex;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
}
.info-label {
  width: 170px;
  /*height: 104px;*/
  color: #333333;
}
.project-cover-img {
}
.project-cover-img > img{
  width: 200px;
  height: 104px;
  border-radius: 5px;
}
.overview-list {
  display: flex;
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 6px;
  font-size: 14px;
  color: #666666;
}
.overview-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 92px;
  background: #eeeeee;
}
.overview-item > .count {
  color: #1daca9;
  margin-top: 20px;
  font-size: 20px;
}
.name {
  margin-top: 7px;
}
.overview-list.today-todo .overview-item {
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
}
</style>
