<template>
  <div class="project-detail-info-right-area">
    <div class="project-detail-info">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/index'}">
          <i class="el-icon-menu mr-5"></i>圈子首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>圈子详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="14">
        <el-row class="mt-10">
          <el-form>
            <el-card class="mt-10">
              <div slot="header" class="clear-fix">
                <span>圈子封面图</span>
                <el-button style="float: right; padding: 3px 0"
                           type="text" @click="updateProjectCoverImg">
                  重新上传
                </el-button>
              </div>
              <div class="project-cover-img">
                <img src="https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/image_upload/project_cover_img/sys_recommend/20181001/520d70c0a777ec055df58c3fed943b37.png"
                     alt="圈子封面图">
              </div>
            </el-card>
            <el-card class="mt-10">
              <div class="mt-10">圈主简介（选填）</div>
              <el-form-item class="mt-10" style="font-size: 14px;color: black;">
                <el-input type="textarea" :rows="4" placeholder="请输入内容"
                          v-model="creatorIntrInfo" maxlength="50">
                </el-input>
              </el-form-item>
            </el-card>
            <div class="mt-10 action-detail">
              <div class="mt-10">活动详情（选填）</div>
              <div style="position: relative">
                <el-card class="mt-10">
                  <div class="del-item">
                    <img src="../../../assets/img/ic_close.png" style="width: 20px;" alt="">
                  </div>
                  <div class="mt-10">文字详情（选填）</div>
                  <el-form-item class="mt-10" style="font-size: 14px;color: black;">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容"
                              v-model="creatorIntrInfo" maxlength="50">
                    </el-input>
                  </el-form-item>
                </el-card>
                <div class="changePosition">
                  <el-button-group>
                    <el-button icon="el-icon-sort-down"></el-button>
                    <el-button icon="el-icon-sort-up"></el-button>
                  </el-button-group>
                </div>
              </div>
              <div style="position: relative">
                <el-card class="mt-10">
                  <div class="del-item">
                    <img src="../../../assets/img/ic_close.png" style="width: 20px;" alt="">
                  </div>
                  <div class="mt-10">
                    <div class="mb-10">图片详情（选填）</div>
                  </div>
                  <el-form-item class="imageContent mt-10">
                    <div>
                      <img src="https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/public/image_upload/project_cover_img/sys_recommend/20181001/520d70c0a777ec055df58c3fed943b37.png" alt="" class="mt-10 updateImg">
                    </div>
                    <div class="textAlign">
                      <img src="../../../assets/img/ic_close.png" style="width: 20px;" alt="">
                    </div>
                  </el-form-item>
                </el-card>
                <div class="changePosition">
                  <el-button-group>
                    <el-button icon="el-icon-sort-down"></el-button>
                    <el-button icon="el-icon-sort-up"></el-button>
                  </el-button-group>
                </div>
              </div>
              <el-button-group style="line-height: 36px;margin: 40px;">
                <el-button class="el-icon-edit"></el-button>
                <el-button class="el-icon-picture-outline"></el-button>
                <el-button class="el-icon-video-camera"></el-button>
                <el-button class="el-icon-microphone"></el-button>
                <span class="ml-15">点击按钮添加新内容</span>
              </el-button-group>
            </div>
            <el-card class="mt-10">
              <div class="mt-10">圈主微信号（选填）</div>
              <div class="mt-10">请添加圈主微信号，成员报名后小打卡会引导他添加圈主微信。请圈主拉成员进入微信群，引导关注公众号、去其他平台完成报名流程等，保证更好的打卡体验。如果不填，将不会对成员展示</div>
              <el-input
                class="mt-10"
                type="text"
                placeholder="微信号"
                v-model="weChatNum"
                maxlength="20"
                show-word-limit/>
            </el-card>
            <div class="mt-20 updateProjectIntrInfoBtn">
              <el-button type="primary">保存</el-button>
            </div>
          </el-form>
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-button-group class="button-group-right">
          <el-button class="el-icon-edit"></el-button>
          <el-button class="el-icon-picture-outline"></el-button>
          <el-button class="el-icon-video-camera"></el-button>
          <el-button class="el-icon-microphone"></el-button>
        </el-button-group>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectDetailInfoContent',
  data () {
    return {
      creatorIntrInfo: '',
      weChatNum: ''
    }
  },
  methods: {
    updateProjectCoverImg () {
      this.$message({
        message: '功能开发中',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .project-detail-info-right-area {
    background-color: #f9f9f9;
    width: 80%;
    height: 100%;
    margin-left: 20%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
  }
  .project-detail-info {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 40px 40px 0 0;
    box-sizing: border-box;
  }
  .clear-fix:before,
  .clear-fix:after {
    display: table;
    content: "";
  }
  .clear-fix:after {
    clear: both
  }
  .project-cover-img {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .project-cover-img > img {
    height: 200px;
    width: 320px;
    margin: 10px 0;
    border-radius: 5px;
  }
  .action-detail {
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    padding: 20px;
  }
  .changePosition {
    position: absolute;
    right: 0;
    top: 15px;
    margin-right: -150px;
  }
  .del-item {
    float: right;
  }
  .imageContent {
    position: relative;
    width: 145px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .updateImg {
    width: 145px;
    min-height: 100px;
  }
  .textAlign {
    color: red;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .button-group-right {
    position: fixed;
    margin: 40px;
  }
  .updateProjectIntrInfoBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 100px;
  }
</style>
