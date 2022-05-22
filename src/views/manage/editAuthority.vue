<template>
  <div class="manage-edit">
    <el-dialog
      v-if="authorityVisible"
      title="权限编辑"
      top="1vh"
      :visible.sync="authorityVisible"
      style="font-weight: 600"
      :before-close="handleClose"
    >
      <div class="person-info">
        <div class="person-info-title">个人信息</div>
        <el-form ref="form" :model="personInfo" label-width="120px" label-position="left" class="person-info-content">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:">
                {{ personInfo.name }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名：">
                {{ personInfo.username }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册时间：">
                {{ personInfo.createdAt }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否管理员：">
                {{ isManageFilter[personInfo.is_admin] }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态：">
                {{ statusFilter[personInfo.status] }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="authority-info">
        <div class="person-info-title">权限设置</div>
        <div class="person-info-content">
          <el-tree
            ref="tree"
            :data="personAuth"
            show-checkbox
            default-expand-all
            node-key="menu_id"
            highlight-current
            :props="defaultProps"
            :default-checked-keys="ids"
            @check="getChange"
          />
        </div>
      </div>
      <div class="confirm-operation">
        <div class="clear-data">
          <el-button type="warning" size="medium" @click="cancelData">取 消</el-button>
        </div>
        <div class="confirm-data">
          <el-button type="primary" size="medium" @click="confirmData">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuthorityApi, updateAuthorityApi } from '@/api/manage'
import { isManageFilter, statusFilter } from './accountManageOption'
import { getTreeList } from '@/utils'
export default {
  data() {
    return {
      personInfo: null,
      personAuth: [],
      authorityVisible: false,
      isManageFilter,
      statusFilter,
      defaultProps: {
        children: 'children',
        label: 'menu_name',
      },
      checkedList: [],
      ids: [],
      getEndIds: [],
      changeAuthParams: {
        id: '',
        data: [],
      },
      changeAuth: [],
    }
  },
  created() {
  },
  methods: {
    async authorityApi(id) {
      this.changeAuthParams.id = id
      const { data } = await getAuthorityApi({ id })
      this.personAuth = data // 渲染菜单树节点，非平级结构
      console.log('data', data)
      console.log('getTreeList', getTreeList(this.personAuth))
      this.ids = getTreeList(this.personAuth).filter(item => item.privilege_operation === 'enabled').map(item => item.menu_id) // 树回显已勾选的菜单ID
      this.getData(this.ids)
      this.authorityVisible = true
    },
    open(item) {
      this.personInfo = item
      this.authorityApi(item.id)
    },
    confirmData() {
      this.changeAuthParams.data = this.changeAuth
      updateAuthorityApi({ id: this.changeAuthParams.id, data: this.changeAuthParams.data }).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '修改权限成功',
            type: 'success',
          })
        }
      })
      setTimeout(() => {
        this.authorityVisible = false
      }, 300)
    },
    cancelData() {
      this.authorityVisible = false
    },
    handleClose() {
      this.authorityVisible = false
    },
    getChange(data, checked, indeterminate) {
      this.getEndIds = checked.checkedKeys
      this.getData(this.getEndIds)
    },
    getData(ids) {
      const data = getTreeList(this.personAuth).map(item => {
        ids.find(i => item.menu_id === i) ? item.privilege_operation = 'enabled' : item.privilege_operation = 'disabled'
        return item
      })
      console.log('getTreeListdata', data)
      this.changeAuth = data
    },
  },
}
</script>
<style lang="scss" scoped>
  .manage-edit {
    padding: 3%;
    width: 100%;
  }
  .person-info-title {
    font-weight: 600;
    margin-bottom: 10px;
  }
  .person-info-content {
    padding: 8px;
    border-radius: 4px;
    background-color: rgba(169,169,169, 0.2)
  }
  .authority-info {
    margin-top: 20px;
  }
  .operation-manage-select {
    margin-top: 12px;
    margin-left: 15px;
  }
  .operation-manage {
    font-size: 14px;
    font-weight: 600;
  }
  .authority-margin {
    margin-top: 35px;
  }
  .confirm-operation {
    display: flex;
    padding: 0 50px;
    margin-top: 50px;
    font-size: 16px;
  }
  .clear-data, .confirm-data {
    flex: 1;
    text-align: center;
  }
  .input-width {
    display: inline;
    ::v-deep .el-input__inner {
      width: 70%;
    }
  }
  .account-name-width {
    min-width: 70%;
    display: inline-block;
  }
</style>
