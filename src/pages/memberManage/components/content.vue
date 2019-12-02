<template>
  <div class="punch-card-project-member-manage-right-area">
    <div class="member-content">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/index'}">
          <i class="el-icon-menu mr-5"></i>圈子首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mt-20">
        <el-select v-model="userAttendStatusGroupCurrVal"
                   size="medium">
          <el-option
            v-for="item in userAttendStatusGroup"
            :key="item.key"
            :value="item.key"
            :label="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="mt-10">
        <el-select v-model="userGroupCurrOption" value="" placeholder="选择分组"
                   size="medium">
          <el-option
            v-for="item in userGroupOptions"
            :key="item.key"
            :value="item.key"
            :label="item.value">
          </el-option>
        </el-select>
        <el-button size="mini" class="ml-15">创建分组</el-button>
        <el-button size="mini" class="ml-15">删除修改分组</el-button>
      </div>
      <el-row class="mt-10">
        <el-col :span="8">
          <el-input
            v-model="userNicknameVal"
            size="medium"
            style="width: 335px"
            placeholder="昵称搜索">
          </el-input>
        </el-col>
        <el-col :span="4" class="searchByUserNicknameBtn">
          <el-button class="ml-15" size="mini" type="primary">搜索</el-button>
        </el-col>
        <div class="el-col el-col-12">
          排序方式（打卡次数）
          <el-radio-group v-model="orderByPunchCardNumCurrOption" size="medium"
                          @change="getMemberListByPunchCardNum">
            <el-radio-button label="从小到大" name="orderByPunchCardNumAsc">
            </el-radio-button>
            <el-radio-button label="不排序" name="orderByPunchCardNumDefault">
            </el-radio-button>
            <el-radio-button label="从大到小" name="orderByPunchCardNumDesc">
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
      <div class="mt-20">
        <el-table
          :border="true"
          :data="this.currPageMemberLists"
          style="width: 100%;"
          :header-cell-style="setHeaderCellStyle"
          :cell-style="setAllCellStyle">
          <el-table-column
            fixed
            prop="id"
            label="小打卡用户ID"
            width="125">
          </el-table-column>
          <el-table-column
            prop="avatar_url"
            label="成员"
            width="152">
            <template slot-scope="scope">
              <img style="height: 75px; width: 75px; border-radius: 5px;"
                   :src="scope.row.avatar_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="nick_name"
            label="昵称"
            width="125">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="updateNickname"
                type="text"
                size="medium">
                {{scope.row.nick_name}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="pivot.attend_time"
            label="加入时间"
            width="124">
          </el-table-column>
          <el-table-column
            prop="pivot.all_punch_card_num"
            label="累计打卡"
            width="100">
          </el-table-column>
          <el-table-column
            prop="pivot.last_punch_card_time"
            label="上次打卡时间"
            width="122">
          </el-table-column>
          <el-table-column
            prop="pivot.attend_status"
            label="加入状态"
            width="100">
            <template slot-scope="scope">
              <el-tag type="success" size="small">
                <template v-if="parseInt(scope.row.pivot.attend_status) === 1">
                  参与中
                </template>
                <template v-if="parseInt(scope.row.pivot.attend_status) === 2">
                  待审核
                </template>
                <template v-if="parseInt(scope.row.pivot.attend_status) === 3">
                  已拒绝
                </template>
                <template v-if="parseInt(scope.row.pivot.attend_status) === 4">
                  已退出
                </template>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="158">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="medium">
                淘汰
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @prev-click="getPrePageMemberLists"
          @next-click="getNextPageMemberLists"
          @current-change="currentPageNoChange"
          :total="this.allMemberNum" :page-size="this.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'memberManageContent',
  props: ['currPageMemberLists', 'allMemberNum', 'pageSize', 'currPageNo'],
  data () {
    return {
      userGroupOptions: [
        {value: '全部', key: 0}
      ],
      userGroupCurrOption: '',
      userAttendStatusGroup: [
        {key: 0, value: '参与中'},
        {key: 1, value: '待审核'},
        {key: 2, value: '已拒绝'},
        {key: 3, value: '已退出'}
      ],
      userAttendStatusGroupCurrVal: 0,
      userNicknameVal: '',
      orderByPunchCardNumCurrOption: '不排序'
    }
  },
  methods: {
    getMemberListByPunchCardNum (orderOption) {
      console.log('选择的排序方式: ' + orderOption)
    },
    setHeaderCellStyle () {
      return 'background: #eef1f6; color: black; text-align: center; ' +
        'border-right: 1px solid #dfe6ec;;'
    },
    setAllCellStyle () {
      return 'text-align: center'
    },
    updateNickname () {
      this.$prompt('', '修改名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '（TODO）修改后的昵称是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    getPrePageMemberLists (currPageNo) {
      // 当点击上一页按钮时 触发父组件监听的事件 获取指定页码的成员列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getMemberListByPageNo', currProjectId, currPageNo)
      console.log('获取上一页成员列表数据,请求页码:' + currPageNo)
    },
    getNextPageMemberLists (currPageNo) {
      // 当点击下一页按钮时 触发父组件监听的事件 获取指定页码的成员列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getMemberListByPageNo', currProjectId, currPageNo)
      console.log('获取下一页成员列表数据,请求页码:' + currPageNo)
    },
    currentPageNoChange (currPageNo) {
      // 当点击页码时 触发父组件监听的事件 获取指定页码的成员列表数据
      let currProjectId = this.$store.state.value
      this.$emit('getMemberListByPageNo', currProjectId, currPageNo)
      console.log('点击页码进行对应的成员列表数据获取,当前点击的页码:' + currPageNo)
    }
  }
}
</script>

<style scoped>
  .punch-card-project-member-manage-right-area {
    background-color: #f9f9f9;
    width: 80%;
    height: 100%;
    margin-left: 20%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
  }
  .member-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 40px 40px 0 0;
  }
  .searchByUserNicknameBtn {
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
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
