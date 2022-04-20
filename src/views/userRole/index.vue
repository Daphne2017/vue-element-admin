
<template>
  <div class="el-wrapper-box">
    <common-table
      ref="roleTable"
      :key="roleTableKey"
      border
      :data-url="rolelistApi"
      :column="column"
      :extra-form-data="extraFormData"
      :pagination="pagination"
      :filter-btn="filterBtn"
    >
      <template #tableBtn>
        <el-button type="success" icon="el-icon-plus" @click="addNewRole('new')">新增角色</el-button>
      </template>
      <template #createdAt="{ scope }">
        {{ scope.row.createdAt && parseTime(scope.row.createdAt)|| 0 }}
      </template>
      <template #operate="{ scope: { row} }">
        <div class="operate-btn-wrap">
          <el-button size="small" type="info" @click="addNewRole('edit',row)">编辑</el-button>
        </div>

      </template>
    </common-table>
    <el-dialog
      :center="true"
      :title="currentMode==='new' ? '新增': (currentMode==='view' ? '查看' : '编辑')"
      width="50%"
      top="10vh"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <commonForm
        v-if="showDialog"
        v-loading="formLoading"
        :form-disabled="formDisabled"
        :form-fields="formFields"
        :form-data="formData"
        :form-rules="formAttr.formRules"
        :form-label-width="formAttr.formLabelWidth"
        @confirm="confirm"
        @cancel="showDialog = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import commonTable from '@/components/CommonTable'
import commonForm from '@/components/CommonForm'
import { parseTime } from '@/utils'
import { rolelistApi, submitApi } from '@/api/userRole.js'
import {
  formFields,
  formAttr,
  column,
  pagination,
  filterBtn,
  initFormData,
  formData,
  extraFormData,
} from './option'
export default {
  name: 'RoleList',
  components: {
    commonTable,
    commonForm
  },
  data() {
    return {
      rolelistApi,
      parseTime,
      roleTableKey: 'gameMangement',
      column,
      extraFormData,
      tagTableKey: 'tagTable',
      pagination,
      filterBtn,
      formFields,
      formAttr,
      initFormData,
      formData,
      showDialog: false,
      currentMode: 'add',
      formLoading: false, // 提交表单的loading状态
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
    /**  添加/编辑/  */
    async addNewRole(mode, row) {
      this.currentMode = mode
      this.formData = JSON.parse(JSON.stringify(this.initFormData)) // 初始化表单
      if (mode === 'new') { // 新增直接返回
        this.showDialog = true
        return
      }
      // 编辑回显
      this.formLoading = true
      const { ...rest } = JSON.parse(JSON.stringify(row))
      this.formData = { ...this.formData, ...rest } // 回显表单其他字段
      this.formLoading = false
      this.showDialog = true
    },
    /**  表单提交  */
    async confirm() {
      try {
        await submitApi({ ...this.formData }) // 新增/编辑
        this.formLoading = false
        this.$message.success(`操作成功~`)
        this.showDialog = false
        this.$refs.roleTable.search(1) // 刷新表格
      } catch (error) {
        this.formLoading = false
        this.$message.error(`提交失败~`, error)
      }
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
}
</style>
