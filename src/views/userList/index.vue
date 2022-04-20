
<template>
  <div class="el-wrapper-box">
    <common-table
      ref="userTable"
      border
      :data-url="userListApi"
      :column="column"
      :extra-form-data="extraFormData"
      :pagination="pagination"
      :filter-btn="filterBtn"
    >
      <template #createdAt="{ scope }">
        {{ scope.row.createdAt && parseTime(scope.row.createdAt)|| 0 }}
      </template>
      <template #operate="{ scope: { row} }">
        <div class="operate-btn-wrap">
          <el-button size="small" type="info" @click="distributeRole('edit',row)">分配</el-button>
        </div>

      </template>
    </common-table>
    <!-- 添加角色 -->
    <el-dialog class="add-tag-dialog" :title="formData.username" width="50%" :visible.sync="showRoleDialog">
      <div v-if="!!formData.role.length" class="select-tag-list">
        <el-tag
          v-for="(role) in formData.role"
          :key="role"
          closable
          @close="roleClose(role)"
        >{{ role }}
        </el-tag>
      </div>
      <common-table
        v-if="showRoleDialog"
        ref="roleTable"
        :key="roleTableKey"
        border
        :data-url="rolelistApi"
        :column="roleColumn"
        :pagination="rolePagination"
        :filter-btn="roleFiltrBtn"
      >
        <template #operate="{ scope: {row} }">
          <div class="operate-btn-wrap">
            <el-button v-if="handleTableBtnStatus(row)" size="small" type="info" disabled>已分配</el-button>
            <el-button v-else size="small" type="primary" @click="distribute(row)">分配</el-button>
          </div>

        </template>
      </common-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import commonTable from '@/components/CommonTable'
import { parseTime } from '@/utils'
import { userListApi, modifyRole } from '@/api/user.js'
import { rolelistApi } from '@/api/userRole.js'
import {
  column,
  pagination,
  filterBtn,
  initFormData,
  formData,
  extraFormData,
} from './option'
import {
  column as roleColumn,
  pagination as rolePagination,
  filterBtn as roleFiltrBtn,
} from '../userRole/option'
export default {
  name: 'RoleList',
  components: {
    commonTable,
  },
  data() {
    return {
      userListApi,
      rolelistApi,
      parseTime,
      column,
      extraFormData,
      roleTableKey: 'roleTable',
      pagination,
      filterBtn,
      initFormData,
      formData,
      currentMode: 'add',
      formLoading: false, // 提交表单的loading状态
      formDisabled: false,
      roleColumn,
      rolePagination,
      roleFiltrBtn,
      showRoleDialog: false,
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
    /**  添加/编辑/  */
    async distributeRole(mode, row) {
      console.log(11, row)
      this.currentMode = mode
      this.formData = JSON.parse(JSON.stringify(this.initFormData)) // 初始化表单
      if (mode === 'new') { // 新增直接返回
        this.showRoleDialog = true
        return
      }
      // 编辑回显
      this.formLoading = true
      const { id, role, username } = JSON.parse(JSON.stringify(row))
      this.formData = { ...this.formData, id, username } // 回显表单其他字段
      this.formData.role = role.split(',')
      console.log(22222, this.formData.role)
      this.formLoading = false
      this.showRoleDialog = true
    },
    /**  表单提交  */
    async confirm() {
      try {
        await modifyRole({ id: this.formData.id, role: this.formData.role.join(',') }) // 新增/编辑
        this.formLoading = false
        this.$message.success(`操作成功~`)
        this.showRoleDialog = false
        this.$refs.userTable.search(1) // 刷新表格
      } catch (error) {
        this.formLoading = false
        this.$message.error(`提交失败~`, error)
      }
    },
    /**  关闭事件  */
    roleClose(role) {
      const curIndex = this.formData.role.findIndex(itemrole => itemrole === role)
      this.formData.role.splice(curIndex, 1)
    },
    // 处理表格按钮状态
    handleTableBtnStatus(row) {
      return this.formData.role.includes(row.code)
    },
    /**  标签加入游戏  */
    distribute(row) {
      if (this.formData.role.length >= 5) {
        this.$message.warning('游戏最多关联五个标签哦~')
        return
      }
      if (this.formData.role.includes(row.code)) return
      this.formData.role.push(row.code)
    },
  }
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
}
</style>
