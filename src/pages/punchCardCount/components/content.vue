<template>
  <div class="punch-card-project-count-manage-right-area">
    <div class="count-content">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/index'}">
          <i class="el-icon-menu mr-5"></i>圈子首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>打卡统计</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mt-20">
        <el-date-picker
          style="width: 335px"
          v-model="timeOptionCurrValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
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
      </el-row>
      <el-row class="mt-10">
        <el-col :span="8">
          <el-select v-model="userGroupCurrOption" value="" placeholder="选择分组"
                     size="medium" style="width: 335px">
            <el-option
              v-for="item in userGroupOptions"
              :key="item.key"
              :value="item.key"
              :label="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="userGroupOperationBtn">
          <el-button size="mini" class="ml-15">创建分组</el-button>
          <el-button size="mini" class="ml-15">删除修改分组</el-button>
        </el-col>
      </el-row>
      <div class="mt-20 mb-20 el-col el-col-20">
        <span>当前查询今天：</span>{{new Date().toLocaleDateString()}} - {{new Date().toLocaleDateString()}}
      </div>
      <div class="mt-20">
        <el-table
          :border="true"
          :data="punchCardCountTableData"
          style="width: 100%;"
          max-height="97"
          :header-row-style="setHeaderRowStyle"
          :header-cell-style="setHeaderCellStyle"
          :cell-style="setAllCellStyle">
          <el-table-column
            fixed
            prop="allRequiredPunchCardPeopleNum"
            label="应打卡人数"
            width="253">
          </el-table-column>
          <el-table-column
            prop="alreadyPunchCardPeopleNum"
            label="实际打卡人数"
            width="251">
          </el-table-column>
          <el-table-column
            prop="notPunchCardPeopleNum"
            label="未打卡人数"
            width="251">
          </el-table-column>
          <el-table-column
            prop="allPunchCardNum"
            label="总打卡人数"
            width="251">
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-20">
        <el-table
          :border="true"
          :data="userPunchCardCountListTableData"
          style="width: 100%;"
          max-height="467"
          :header-cell-style="setHeaderCellStyle"
          :cell-style="setAllCellStyle">
          <el-table-column
            fixed
            prop="userId"
            label="小打卡用户ID"
            width="151">
          </el-table-column>
          <el-table-column
            prop="memberAvatar"
            label="成员"
            width="224">
            <template slot-scope="scope">
              <img style="height: 75px; width: 75px; border-radius: 5px;"
                   :src="scope.row.memberAvatar" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="220">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="updateNickname"
                type="text"
                size="medium">
                {{scope.row.nickname}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="punchCardDayNum"
            label="打卡天数"
            width="220">
          </el-table-column>
          <el-table-column
            label="操作"
            width="190">
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
          :total="2" :page-size="memberPageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'punchCardCount',
  data () {
    return {
      userGroupOptions: [
        {value: '全部', key: 0}
      ],
      userGroupCurrOption: '',
      userNicknameVal: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timeOptionCurrValue: '',
      punchCardCountTableData: [{
        allRequiredPunchCardPeopleNum: 2,
        alreadyPunchCardPeopleNum: 0,
        notPunchCardPeopleNum: 2,
        allPunchCardNum: 0
      }],
      userPunchCardCountListTableData: [],
      // userPunchCardCountListTableData: [{
      //   userId: '1',
      //   memberAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/06RArzUOfeWicvRgud0tUsmdzGuEdV7SXHYiaQwPjichGh9OLmBO6FENP4vQ7svmED0KicsNPbnAPkrmyqQnAeZATg/132',
      //   nickname: 'MYXuu',
      //   punchCardDayNum: 12
      // }, {
      //   userId: '8',
      //   memberAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/kUVg3UkWH6V3Wt3v8Wlfk9egzziajOKibQbic7Sr55L350jibaxCyl5W5uqrYM8jsibY7J4xxTticeibzg2LGAia2yMomA/132',
      //   nickname: '徐茂勇',
      //   punchCardDayNum: 12
      // }],
      memberPageSize: 5
    }
  },
  methods: {
    setHeaderRowStyle () {
      return 'height: 30px;'
    },
    setHeaderCellStyle () {
      return 'background: #eef1f6; color: black; text-align: center; ' +
        'border-right: 1px solid #dfe6ec; height: 30px;'
    },
    setAllCellStyle () {
      return 'text-align: center'
    }
  }
}
</script>

<style scoped>
  .punch-card-project-count-manage-right-area {
    background-color: #f9f9f9;
    width: 80%;
    height: 100%;
    margin-left: 20%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
  }
  .count-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 40px 40px 0 0;
  }
  .searchByUserNicknameBtn, .userGroupOperationBtn {
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
