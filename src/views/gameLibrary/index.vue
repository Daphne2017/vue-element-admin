
<template>
  <div class="el-wrapper-box">
    <common-table
      ref="gameTable"
      :key="gameTableKey"
      border
      :data-url="gameMangementListApi"
      :column="gameColumn"
      :extra-form-data="extraFormData"
      :pagination="gamePagination"
      :filter-btn="gameFilterBtn"
      @searchData="getTableData"
      @sort-change="(...arg)=>sortTable('gameTable',...arg)"
    >
      <template #tableBtn>
        <el-button type="success" icon="el-icon-plus" @click="addNewGame('new')">新增游戏</el-button>
      </template>
      <template #createdAt="{ scope }">
        {{ scope.row.createdAt && parseTime(scope.row.createdAt)|| 0 }}
      </template>
      <template #associateTags="{ scope:{ row:{ associateTags } } }">
        <div>{{ handleLabelAssociation(associateTags) }}</div>
      </template>
      <template #putStatus="{ scope: { row }}">
        <span :class="`normal-${row.putStatus === 1 ? 'green' : 'red'}`">{{ gameStatusObj[row.putStatus] }}</span>
      </template>
      <template #operate="{ scope: { row, row :{ putStatus }} }">
        <div class="operate-btn-wrap">
          <el-button size="small" type="info" @click="addNewGame('edit',row)">编辑</el-button>
          <el-button size="small" type="info" @click="addNewGame('view',row)">查看</el-button>
          <el-button :type="putStatus === 0 ? 'primary':'warning'" size="small" @click="updatePutStatus(row.id, Number(!putStatus))">
            {{ putStatus === 0 ? '上架':'下架' }}
          </el-button>
        </div>

      </template>
    </common-table>
    <!-- 新增编辑游戏弹窗 -->
    <el-dialog
      class="add-games-dialog"
      :center="true"
      :title="currentMode==='new' ? '新增': (currentMode==='view' ? '查看' : '编辑')"
      width="50%"
      top="10vh"
      :visible.sync="showGameDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <commonForm
        v-if="showGameDialog"
        v-loading="formLoading"
        :form-disabled="formDisabled"
        :form-ref="'addGameForm'"
        :form-fields="gameFormFields"
        :form-data="gameFormData"
        :form-rules="gameFormAttr.formRules"
        :form-label-width="gameFormAttr.formLabelWidth"
        @associateTagsAddTag="openAddTagDialog"
        @confirm="confirm"
        @cancel="showGameDialog = false"
      />
    </el-dialog>
    <!-- 添加标签弹框 -->
    <el-dialog class="add-tag-dialog" title="添加标签" width="50%" :visible.sync="showTagDialog">
      <div v-if="!!gameFormData.associateTags.length" class="select-tag-list">
        <el-tag
          v-for="(tagItem) in gameFormData.associateTags"
          :key="tagItem.id"
          closable
          @close="tagClose(tagItem.id)"
        >{{ tagItem.name || tagItem.tagName }}
        </el-tag>
      </div>
      <common-table
        v-if="showTagDialog"
        ref="tagTable"
        :key="tagTableKey"
        border
        :data-url="tagLibraryListApi"
        :column="tagColumn"
        :pagination="tagPagination"
        :filter-btn="tagFilterBtn"
        :extra-form-data="tagExtraFormData"
        @sort-change="(...arg)=>sortTable('tagTable',...arg)"
      >
        <template #putStatusText="{ scope: { row }}">
          <span :class="`normal-${row.putStatus === 1 ? 'green' : 'red'}`">{{ row.putStatusText }}</span>
        </template>
        <template #operate="{ scope: {row} }">
          <div class="operate-btn-wrap">
            <el-button v-if="handleTableBtnStatus(row)" size="small" type="info" disabled>已加入本游戏</el-button>
            <el-button v-else size="small" type="primary" @click="joinGame(row)">加入</el-button>
          </div>

        </template>
      </common-table>
    </el-dialog>
  </div>
</template>
<script>
import commonTable from '@/components/CommonTable'
import commonForm from '@/components/CommonForm'
import { parseTime } from '@/utils'
import { gameMangementListApi, submitGameApi, updatePutStatusApi } from '@/api/gameManage.js'
import { tagLibraryListApi } from '@/api/tagManage.js'
import {
  gameFormFields,
  gameFormAttr,
  gameColumn,
  gamePagination,
  gameFilterBtn,
  gameInitFormData,
  gameFormData,
  gameStatusObj,
  extraFormData,
} from './gameLibraryOption'
import { tagColumn, tagPagination, tagExtraFormData, tagFilterBtn } from './tagListOption.js'
export default {
  name: 'GameLibrary',
  components: {
    commonTable,
    commonForm
  },
  data() {
    return {
      gameMangementListApi,
      tagLibraryListApi,
      parseTime,
      totalData: {
        unPutStatusCount: 0,
        putStatusCount: 0,
        gamesTotal: 0,
      },
      gameTableKey: 'gameMangement',
      gameColumn,
      extraFormData,
      tagTableKey: 'tagTable',
      gamePagination,
      gameFilterBtn,
      gameFormFields,
      gameFormAttr,
      gameInitFormData,
      gameFormData,
      tagExtraFormData,
      showGameDialog: false,
      showTagDialog: false,
      onPreViewDialog: false,
      currentMode: 'add',
      tagColumn,
      tagPagination,
      tagFilterBtn,
      gameStatusObj,
      formLoading: false, // 提交表单的loading状态
      hasSelectOption: false,
      formDisabled: false,
    }
  },
  watch: {
    currentMode(mode) {
      this.formDisabled = mode === 'view' // 查看状态下表单字段禁用
    },

  },
  created() {
  },
  mounted() {
  },
  methods: {
    /**  获取游戏库上下架统计总数  */
    getTableData(res) {
      const { unPutStatusCount = 0, putStatusCount = 0 } = res && res.data
      this.totalData.unPutStatusCount = unPutStatusCount
      this.totalData.putStatusCount = putStatusCount
      this.totalData.gamesTotal = Number(res.data.putStatusCount) + Number(res.data.unPutStatusCount)
    },
    /** 游戏列表/标签列表排序  */
    sortTable(table, { prop, order }) {
      const extraOb = {
        order: {
          col: prop,
          sort: order === 'descending' ? 'DESC' : 'ASC',
        },
      }
      table === 'gameTable' ? this.extraFormData = { ...this.extraFormData, ...extraOb } : this.tagExtraFormData = extraOb
      this.$nextTick(() => {
        this.$refs[table].search(1)
      })
    },
    /**  处理关联标签  */
    handleLabelAssociation(data = []) {
      console.log(11111, data)
      return data.length && data.map(item => item.tagInfo && item.tagInfo.tagName).join(',') || '--'
    },
    /**  游戏上下架  */
    async updatePutStatus(id, putStatus) {
      await this.$confirm(`确定${putStatus === 1 ? '上架' : '下架'}吗？`, '提示', {
        type: 'warning',
      })
      await updatePutStatusApi(id, { putStatus })
      this.$message.success(`操作成功~`)
      this.$refs.gameTable.search(1) // 刷新表格
    },
    // 处理表格按钮状态
    handleTableBtnStatus(row) {
      return this.gameFormData.associateTags.some(item => item.id === row.id)
    },
    /**  添加标签  */
    openAddTagDialog() {
      this.showTagDialog = true
    },
    /**  添加/编辑/查看游戏  */
    async addNewGame(mode, row) {
      this.currentMode = mode
      this.gameFormData = JSON.parse(JSON.stringify(this.gameInitFormData)) // 初始化表单
      if (mode === 'new') { // 新增直接返回
        this.showGameDialog = true
        return
      }
      // 编辑回显
      this.formLoading = true
      const { associateTags = [], ...rest } = JSON.parse(JSON.stringify(row))
      this.gameFormData = { ...this.gameFormData, associateTags: associateTags || [], ...rest, oldAssociateTags: JSON.parse(JSON.stringify(associateTags)) } // 回显表单其他字段
      this.formLoading = false
      this.showGameDialog = true
    },
    /**  标签加入游戏  */
    joinGame(row) {
      if (this.gameFormData.associateTags.length >= 5) {
        this.$message.warning('游戏最多关联五个标签哦~')
        return
      }
      if (this.gameFormData.associateTags.some(item => item.id === row.id)) return
      this.gameFormData.associateTags.push({ ...row, name: row.tagName })
    },
    /**  表单提交  */
    async confirm() {
      try {
        await submitGameApi({ ...this.gameFormData }) // 新增/编辑
        this.formLoading = false
        this.$message.success(`操作成功~`)
        this.showGameDialog = false
        this.$refs.gameTable.search(1) // 刷新表格
      } catch (error) {
        this.formLoading = false
        this.$message.error(`提交失败~`, error)
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.el-wrapper-box {
   padding: 20px;
  ::v-deep .filter-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  ::v-deep .game-overview-wrap{
    display: flex;
    font-size: 14px;
    color: #606266;
    margin-bottom: 20px;
    font-weight: normal;
    justify-content: space-between;
    .left-count{
       display: flex;
      .item{
      margin-right: 15px;
      }
    }
    .right-sort{
      display: flex;
      .isActive{
        background-color: #1890ff;
        border-color: #1890ff;
        color: #ffffff;
      }
    }

  }
  .operate-btn-wrap{
    display: flex;
    flex-wrap: wrap;
    ::v-deep.btn-active{
     color: #1890ff;
    }
  }
  .select-tag-list{
    display: flex;
    flex-wrap: wrap;
    ::v-deep.el-tag{
      margin: 0 10px 10px 0;
      &.add-tag-btn{
        color: #606266;
        background: #ffffff;
        border-color: #DCDFE6;
      }
    }
  }
  .add-games-dialog{
    ::v-deep .videoUpload-hidden{
      ::v-deep .el-upload{
        display: none;
      }
    }
    .custom-slot-fields{
      .addCustomTag{
        display: flex;
        .el-input{
          width: 218px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
