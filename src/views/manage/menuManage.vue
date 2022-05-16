
<template>
  <div class="el-wrapper-box">
    <common-table
      ref="tbTable"
      class="tb-table"
      border
      :data-url="listApi"
      :column="column"
      :pagination="pagination"
      :default-expand-all="false"
      row-key="menu_id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :table-max-height="700"
      @row-click="rowClick"
    >
      <template #tableBtn>
        <el-button class="add-btn" type="success" icon="el-icon-plus" @click="showDialog('add')">新增顶级菜单</el-button>
      </template>
      <template #menu_url="{ scope }">
        <div class="menu-url">{{ scope.row.menu_url }}</div>
      </template>
      <template #is_visible="{ scope }">
        {{ scope.row.is_visible ? '显示' : '隐藏' }}
      </template>
      <template #operate="{ scope }">
        <el-button size="mini" icon="el-icon-plus" @click.stop="showDialog('addchild', scope.row)">新增子节点</el-button>
        <el-button size="mini" type="info" icon="el-icon-edit" @click.stop="showDialog('edit', scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="scope.row.menu_code === 'home'"
          @click.stop="deleteFun(scope.row)"
        >删除</el-button>
      </template>
    </common-table>
    <!-- 新增编辑弹窗 -->
    <el-dialog
      width="30%"
      :title="dialogTitle"
      :center="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <commonForm
        v-if="dialogVisible"
        :form-fields="formFields"
        :form-data="formData"
        :form-rules="formAttr.formRules"
        :form-label-width="formAttr.formLabelWidth"
        @confirm="confirm"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import commonForm from '@/components/CommonForm'
import commonTable from '@/components/CommonTable'
import { column, formFields, formAttr } from './menuManageOption'
import { listApi, addMenuApi, updateMenuApi, deleteApi } from '@/api/manage'
import { getTreeList } from '@/utils'
export default {
  name: 'MenuManage',
  components: {
    commonForm,
    commonTable,
  },
  data() {
    return {
      listApi,
      column,
      pagination: { hide: true },
      formFields,
      formAttr,
      formData: {
        menu_name: '',
        menu_url: '',
        menu_code: '',
        // menu_order: 1,
        is_visible: true,
      },
      defaultFormData: {
        menu_name: '',
        menu_url: '',
        menu_code: '',
        // menu_order: 1,
        is_visible: true,
      },
      dialogVisible: false,
      dialogTitleType: 'add',
      childParentId: 0, // 新增节点时的父节点id
      nowIsVisible: false, // 编辑时用于判断是否更新子节点的is_visible
    }
  },
  computed: {
    dialogTitle() {
      const obj = { edit: '编辑菜单权限', add: '新增顶级菜单', addchild: '新增子节点菜单' }
      return obj[this.dialogTitleType]
    },
  },
  methods: {
    rowStyle({ row }) {
      if (!row.is_visible) {
        return { 'color': '#bbb' }
      }
    },
    cellClassName({ columnIndex }) {
      if (columnIndex === 0) {
        return 'name-col'
      }
    },
    rowClick(row) {
      this.$refs.tbTable.$refs.compTable.toggleRowExpansion(row)
    },
    /**  表单显示时 数据处理  */
    showDialog(type, data) {
      this.dialogTitleType = type
      this.childParentId = type === 'addchild' ? data.menu_id : 0
      type !== 'add' && (this.nowIsVisible = data.is_visible)
      type !== 'edit' ? this.formData = Object.assign({}, this.defaultFormData) : this.formData = Object.assign({}, data)
      this.dialogVisible = true
    },
    confirm() {
      this.dialogTitleType === 'edit' ? this.eidtFun() : this.addFun(this.childParentId)
    },
    /**  新增菜单权限  */
    addFun(menu_parent) {
      this.childParentId && (this.formData.is_visible = this.nowIsVisible)
      addMenuApi({ menu_parent, ...this.formData }).then(res => {
        this.$message.success('新增成功')
        this.dialogVisible = false
        this.$refs.tbTable.search(1)
      })
    },
    /** 判断更新的数据 是否需要修改子节点 */
    eidtFun() {
      let data = []
      if (this.formData.children && this.nowIsVisible !== this.formData.is_visible) {
        data = getTreeList(this.formData).map(item => {
          item.is_visible = this.formData.is_visible
          return item
        })
      } else {
        data = [{ ...this.formData }]
      }
      this.eidtApi(data)
    },
    /** 更新菜单权限 */
    eidtApi(data) {
      updateMenuApi({ data }).then(res => {
        this.$message.success('更新成功')
        this.dialogVisible = false
        this.$refs.tbTable.search(1)
      })
    },
    /** 删除菜单 */
    deleteFun(data) {
      this.$confirm('确定删除该菜单吗', '提示', {
        type: 'warning',
      }).then(() => {
        const res = getTreeList(data).map(item => item.menu_id)
        deleteApi({ data: res }).then(res => {
          this.$message.success('删除成功')
          this.$refs.tbTable.search(1)
        })
      }).catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
  .el-wrapper-box{
    .tb-table{
      .add-btn{
        margin: 10px 0
      }
      .menu-url{
        padding-left: 20px;
        text-align: left;
      }
      ::v-deep .el-table__row{
        .name-col{
          .cell{
            text-align: left;
            padding-left: 30px;
          }
          .el-table__expand-icon{
            margin-left: -25px;
          }
        }
        &.el-table__row--level-1{
          background: #FAFAFA;
          .el-table__expand-icon{
            margin-left: 0px;
          }
        }
        &.el-table__row--level-2{
          background: #f2f2f2;
        }
      }
    }
  }
</style>
