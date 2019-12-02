<template>
  <div class="diary-manage-right-area">
    <div class="diary-content">
      <div class="diary-header">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{path: '/index'}">
            <i class="el-icon-menu mr-5"></i>圈子首页
          </el-breadcrumb-item>
          <el-breadcrumb-item>日记管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="mt-20">
          <el-select v-model="userGroupCurrValue" value="" placeholder="选择分组"
                     size="medium">
            <el-option
              v-for="item in userGroup"
              :key="item.key"
              :value="item.key"
              :label="item.value">
            </el-option>
          </el-select>
          <el-button size="mini" class="ml-15">创建分组</el-button>
        </div>
        <div class="mt-10">
          <el-select v-model="reviewOptionCurrValue" value="" placeholder="是否点评"
                     size="medium">
            <el-option
              v-for="item in reviewOption"
              :key="item.key"
              :value="item.key"
              :label="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            size="medium"
            class="ml-15"
            style="width: 335px"
            v-model="timeOptionCurrValue"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="mt-10">
          <el-select v-model="attendUserOptionCurrValue" value="" placeholder="是否新加入"
                     size="medium">
            <el-option
              v-for="item in attendUserOption"
              :key="item.key"
              :value="item.key"
              :label="item.value">
            </el-option>
          </el-select>
          <el-select
            size="medium"
            class="ml-15"
            v-model="userNickNameOptionCurrValue"
            style="width: 335px"
            filterable
            remote
            reserve-keyword
            placeholder="昵称搜索"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in userNickNameOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="ml-15" size="mini" type="primary">搜索</el-button>
        </div>
      </div>
      <template v-if="currPageDiaryLists.length > 0">
        <div class="diary-box">
          <template v-for="item in currPageDiaryLists">
            <div class="diary-box-item" v-bind:key="'diaryId-' + item.id">
              <div class="diary-box-left">
                <span>
                  <img :src="item.publisher.avatar_url" alt="" class="head-img">
                </span>
                <div class="item-body">
                  <div class="user-name">{{item.publisher.nick_name}}</div>
                  <div class="user-info">{{item.punch_card_time}} | 已经坚持了{{item.curr_diary_punch_card_day_num}}天</div>
                  <div class="user-text">{{item.text_content}}</div>
                  <div class="diary-img">
                    <div>
                      <template v-if="item.diaryResource.length === 1 && parseInt(item.diaryResource[0].type) === 1">
                        <el-image :src="imgRootUrl + item.diaryResource[0].resource_url"></el-image>
                      </template>
                      <template v-else-if="item.diaryResource.length === 2 && parseInt(item.diaryResource[1].type) === 2">
                        <el-image :src="imgRootUrl + item.diaryResource[0].resource_url"></el-image>
                      </template>
                      <template v-else v-for="img in item.diaryResource">
                        <template v-if="parseInt(img.type) === 1">
                          <el-image :key="'img' + img.id" :src="imgRootUrl + img.resource_url"
                                    class="img-list-item">
                          </el-image>
                        </template>
                      </template>
                    </div>

                  </div>
                </div>
                <template v-if="parseInt(item.have_sticky) === 1">
                  <img src="../../../assets/img/sticky.png"
                       width="50" height="50" style="position: absolute; top: 10px; right: 650px;" alt="">
                </template>
                <div class="button-box">
                  <template v-if="item.haveLike">
                    <button class="activeb">
                      <div class="icon-2"></div>
                      已赞
                    </button>
                  </template>
                  <template v-else>
                    <button class="btn1">
                      <div class="icon-1"></div>
                      点赞
                    </button>
                  </template>
                  <template v-if="parseInt(item.have_sticky) === 1">
                    <button class="activeb">
                      <div class="icon-4"></div> 已置顶
                    </button>
                  </template>
                  <template v-else>
                    <button class="btn2">
                      <div class="icon-3"></div>
                      置顶
                    </button>
                  </template>
                  <button class="btn3" style="font-weight: 900;">
                    <div class="icon-55"></div>
                    删除
                  </button>
                </div>
              </div>
            </div>
            <div style="background-color: #f9f9f9;height: 10px" v-bind:key="item.id">
            </div>
          </template>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="this.currPageNo"
            @prev-click="getPrePageDiaryLists"
            @next-click="getNextPageDiaryLists"
            @current-change="currentPageNoChange"
            :total="this.allDiaryNum" :page-size="this.pageSize">
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'diaryContent',
  props: ['currPageDiaryLists', 'allDiaryNum', 'pageSize', 'currPageNo'],
  data () {
    return {
      imgRootUrl: 'https://armin-xu.cn/SmallPunchMiniProgramAfterEnd/',
      userGroup: [
        {value: '全部', key: 0}
      ],
      userGroupCurrValue: '',
      reviewOption: [
        {key: 0, value: '全部'},
        {key: 1, value: '已点评'},
        {key: 2, value: '未点评'}
      ],
      reviewOptionCurrValue: '',
      attendUserOption: [
        {key: 0, value: '今日加入'},
        {key: 1, value: '近七天加入'}
      ],
      attendUserOptionCurrValue: '',
      timeOptionCurrValue: [],
      userNickNameOption: [],
      userNickNameOptionCurrValue: '',
      list: [],
      loading: false,
      states: [
        '用户1号', '用户2号', '用户3号',
        '用户4号', '用户5号', '用户6号',
        '用户7号', '用户8号', '用户9号',
        '用户10号', '用户11号', '用户12号',
        '用户13号', '用户14号', '用户15号',
        '用户16号', '用户17号', '用户18号',
        '用户19号', '用户20号'
      ]
    }
  },
  mounted () {
    console.log(this.allDiaryNum)
    this.list = this.states.map((item, index) => {
      return {value: index, label: item}
    })
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.userNickNameOption = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.userNickNameOption = []
      }
    },
    getPrePageDiaryLists (currPageNo) {
      // 当点击上一页按钮时 触发父组件监听的事件 获取指定页码的打卡日记列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getDiaryListByPageNo', currProjectId, currPageNo)
      console.log('获取上一页打卡日记列表,请求页码:' + currPageNo)
    },
    getNextPageDiaryLists (currPageNo) {
      // 当点击下一页按钮时 触发父组件监听的事件 获取指定页码的打卡日记列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getDiaryListByPageNo', currProjectId, currPageNo)
      console.log('获取下一页打卡日记列表,请求页码:' + currPageNo)
    },
    currentPageNoChange (currPageNo) {
      // 当点击页码时 触发父组件监听的事件 获取指定页码的打卡日记列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getDiaryListByPageNo', currProjectId, currPageNo)
      console.log('点击页码进行对应的打卡日记列表获取,当前点击的页码:' + currPageNo)
    }
  }
}
</script>

<style scoped>
  .diary-manage-right-area {
    background-color: #f9f9f9;
    width: 80%;
    height: 100%;
    margin-left: 20%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
  }

  .diary-content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 100px 0;
    overflow: auto;
  }

  .diary-header {
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    position: relative;
    box-sizing: border-box;
  }

  .diary-box {
    background-color: white;
    min-height: 150px;
  }

  .diary-box-item {
    height: auto;
    width: 990px;
    background: #fff;
    zoom: 1;
    clear: both;
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .diary-box-left {
    width: 589px;
    float: left;
  }
  .head-img {
    height: 24px;
    width: 24px;
    border-radius: 12px;
    position: absolute;
    top: 20px;
    left: 20px
  }

  .item-body {
    width: 500px;
    position: relative;
    left: 50px;
    top: 10px;
    padding-bottom: 30px;
  }
  .user-info, .user-name {
    letter-spacing: 0;
    width: 300px;
    margin-left: 4px;
  }
  .user-name {
    font-size: 14px;
    color: #475669;
  }
  .user-info {
    font-size: 12px;
    color: #8492a6;
  }
  .user-text {
    font-size: 16px;
    color: #1f2d3d;
    letter-spacing: 0;
    white-space: pre-line;
    zoom: 1;
    width: 500px;
    margin-left: 4px;
    margin-top: 10px
  }
  .diary-img {
    width: 500px;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
  }
  .img-list-item {
    height: 140px;
    width: 140px;
    float: left;
    margin-left: 4px;
    margin-bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-box {
    width: 250px;
    position: absolute;
    top: 20px;
    right: 364px;
  }
  .button-box > button {
    height: 26px;
    width: 62px;
    background: #fff;
    border: 1px solid #c0ccda;
    border-radius: 4px;
    margin-right: 10px;
    padding-left: 15px;
    position: relative;
    color: #475669;
  }
  button {
    outline: none;
  }
  .activeb {
    border: 1px solid #fa5569!important;
    color: #fa5569!important;
  }
  .icon-1, .icon-2 {
    height: 15px;
    width: 15px;
    position: absolute;
    left: 7px;
    top: 4px;
  }
  .icon-1 {
    background: url("../../../assets/img/like.svg") no-repeat 50%;
  }
  .icon-2 {
    background: url("../../../assets/img/liked.svg") no-repeat 50%;
  }
  .icon-3, .icon-4 {
    height: 15px;
    width: 15px;
    position: absolute;
    top: 4px;
  }
  .icon-3 {
    background: url("../../../assets/img/stick.svg") no-repeat 50%;
    left: 7px;
  }
  .icon-4 {
    background: url("../../../assets/img/haveStick.svg") no-repeat 50%;
    left: 3px;
  }
  .icon-5, .icon-55 {
    height: 15px;
    width: 15px;
  }
  .icon-55 {
    background: url("../../../assets/img/delete.svg") no-repeat 50%;
    position: absolute;
    left: 4px;
    top: 5px;
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
