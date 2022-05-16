<template>
  <div class="manage-container el-wrapper-box">
    <commonTable
      ref="commonTable"
      :column="column"
      :border="true"
      :pagination="pagination"
      :data-url="manageDataUrl"
      :filter-btn="filterBtn"
      @searchData="searchData"
    >
      <template #isAdmin="{ scope }">
        <div>{{ isManageFilter[!!scope.row.isAdmin] }}</div>
      </template>
      <template #createdAt="{ scope }">
        <div>{{ parseTime(scope.row.createdAt) }}</div>
      </template>
      <template #status="{ scope }">
        <div :class="scope.row.status? 'normal-blue': ''">{{ statusFilter[scope.row.status] }}</div>
      </template>
      <template #operate="{ scope }">
        <div>
          <el-button type="info" :disabled="scope.row.is_admin" @click="editAuthority(scope.row)">权限编辑</el-button>
        </div>
      </template>
    </commonTable>
    <editAuthority
      ref="auth"
      :person-info="personInfo"
      @confirmData="confirmData"
      @clearData="clearData"
    />
  </div>
</template>

<script>
import commonTable from '@/components/CommonTable'
import editAuthority from './editAuthority'
import { column, filterBtn, isManageFilter, statusFilter } from './accountManageOption'
import { manageDataUrl } from '@/api/manage'
import { parseTime } from '@/utils'
export default {
  components: {
    commonTable,
    editAuthority,
  },
  data() {
    return {
      isManageFilter,
      statusFilter,
      column,
      pagination: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      manageDataUrl,
      filterBtn,
      personInfo: {
        name: '',
        acountName: '',
        registerTime: '',
        isManage: false,
        status: false,
        manageList: ['首页banner'],
      },
      authList: null,
      parseTime,
    }
  },
  methods: {
    editAuthority(item) {
      this.$refs.auth.open(item)
    },
    confirmData(val) {
      this.$refs.auth.handleClose()
    },
    clearData(val) {
      this.$refs.auth.handleClose()
      this.$revalfs.commonTable.search()
    },
    searchData(val) {
      this.authList = val.data
    },
  },
}
</script>
<style lang="scss" scoped>
  .manage-container{
    ::v-deep .filter-box{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .count-data {
      font-size: 14px;
      line-height: 36px;
      .count-use {
        color: #1890ff;
        margin-right: 10px;
      }
      .count-stop {
        color: #ff4949;
        margin-right: 10px;
      }
      .count-totol {
        color: #909399;
      }
    }
    .order-mention {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 20px;
      color: #606266;
      font-size: 15px;
    }
  }
</style>
