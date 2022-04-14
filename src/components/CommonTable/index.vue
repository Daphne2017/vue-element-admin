/*
 * Describe：通用表格组件
 * Date: 2020/03
 */
<template>
  <div>
    <!-- 筛选框 -->
    <div class="filter-box">
      <!-- 按钮插槽 -->
      <div class="btn-box" style="display:flex">
        <slot name="tableBtn" />
      </div>
      <commonForm
        ref="compForm"
        :form-fields="formFields"
        :form-data="formData"
        :form-label-width="filterLabelWidth"
        :inline="true"
        :extra-form-data="extraFormData"
        @search="search(1)"
        @exportFile="confirmExport"
        @reset="clearFilter"
      >
        <!-- 补充表单的自定义插槽 -->
        <template v-for="item in formFields">
          <slot
            v-if="item.type === 'customSlot'"
            :slot="`${item.prop}Slot`"
            :name="`${item.prop}FilterSlot`"
          />
          <template
            v-if="item.type === 'button'"
          >
            <template
              v-for="i in item.children"
            >
              <slot
                v-if="i.type === 'custom'"
                :slot="`${i.name}BtnSlot`"
                :name="`${i.name}BtnSlot`"
              />
            </template>
          </template>
        </template>
      </commonForm>
    </div>
    <slot name="tableTotal" />
    <!-- 表格 -->
    <el-table
      ref="compTable"
      v-loading="tableLoading"
      v-bind="$attrs"
      :max-height="tableMaxHeight"
      :data="tableData"
      v-on="$listeners"
    >
      <!--  type内置类型列  -->
      <el-table-column
        v-if="isSelect"
        type="selection"
        align="center"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
      />
      <template v-for="(col, index) in column">
        <!--  普通列  -->
        <el-table-column
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :index="col.index"
          :column-key="col.columnKey"
          :width="col.width"
          :min-width="col.minWidth"
          :fixed="col.fixed"
          :render-header="col.renderHeader"
          :sortable="col.sortable || false"
          :sort-method="col.sortMethod"
          :sort-by="col.sortBy"
          :sort-orders="col.sortOrders"
          :resizable="col.resizable || true"
          :formatter="col.formatter"
          :show-overflow-tooltip="col.showOverflowTooltip || false"
          :align="col.align || 'center'"
          :header-align="col.headerAlign || col.align || 'center'"
          :class-name="col.className"
          :label-class-name="col.labelClassName"
          :selectable="col.selectable"
          :reserve-selection="col.reserveSelection || false"
          :filters="col.filters"
          :filter-placement="col.filterPlacement"
          :filter-multiple="col.filterMultiple"
          :filter-method="col.filterMethod"
          :filtered-value="col.filteredValue"
        >
          <!--  列头  -->
          <template
            #header="scope"
          >
            <!--  表头插槽  -->
            <slot :name="`${col.prop}Head`" :scope="scope">
              {{ scope.column.label }}
            </slot>
          </template>

          <!--  内容  -->
          <template
            v-slot:default="scope"
          >
            <!--  常规的按钮  -->
            <div v-if="col.btnData">
              <button-comp
                v-if="col.btnData.viewBtn"
                :button-item="col.btnData.viewBtn"
                @clickFunc="getRowData(scope, index, 'viewBtn', 'viewData')"
              />
              <button-comp
                v-if="col.btnData.editBtn"
                :button-item="col.btnData.editBtn"
                @clickFunc="getRowData(scope, index, 'editBtn', 'editData')"
              />

              <!-- 编辑按钮后，删除按钮前的插槽 -->
              <slot name="btnSlotMiddle" :scope="scope" />

              <button-comp
                v-if="col.btnData.deleteBtn"
                :button-item="col.btnData.deleteBtn"
                @clickFunc="deleteRow(scope, index)"
              />

              <!--  更多按钮插槽  -->
              <slot name="btnSlotLast" :scope="scope" />
            </div>

            <!--  表格内容插槽  -->
            <slot v-else :name="`${col.prop}`" :scope="scope">
              {{ scope.row[col.prop] }}
            </slot>

          </template>
        </el-table-column>
      </template>

    </el-table>

    <!-- 分页 -->
    <tb-pagination
      v-if="!pagination.hide"
      :pagination="pagination"
      @size-change="sizeChange"
      @page-change="pageChange"
    >
      <!--  分页插槽  -->
      <template slot="beforePagination">
        <slot name="beforePagination" />
      </template>
      <template slot="afterPagination">
        <slot name="afterPagination" />
      </template>
    </tb-pagination>

  </div>
</template>

<script>
import commonForm from '@/components/CommonForm'
import buttonComp from './components/buttonComp'
import tbPagination from './components/tbPagination'
import Sortable from 'sortablejs'
import { apiRequest, apiQsRequest, exportFile } from '@/api/common'
import { deleteEmptyValue, loacalSaveFile } from '@/utils'
export default {
  name: 'CommonTable',
  components: {
    commonForm,
    buttonComp,
    tbPagination,
  },
  props: {
    staticData: { // 静态表格数据数组（与dataURL只能存在一个）
      type: Array,
      required: false,
      default: () => [],
    },
    column: { // 表格列配置
      type: Array,
      required: false,
      default: () => [],
    },
    pagination: { // 分页配置数据（设置pagination.hide，则可隐藏分页）
      type: Object,
      required: true,
    },
    isSelect: { // 是否启动表格多选
      type: Boolean,
      required: false,
      default: false,
    },
    reserveSelection: { // 数据更新后是否保持勾选
      type: Boolean,
      required: false,
      default: false,
    },
    selectable: { // 判断每行是否能被勾选的函数
      type: Function,
      required: false,
      default: () => true,
    },
    isdrag: { // 是否启动表格拖拽
      type: Boolean,
      required: false,
      default: false,
    },
    filterBtn: { // 筛选框按钮配置
      type: Object,
      required: false,
      default: () => ({}),
    },
    filterLabelWidth: { // 筛选框label宽度
      type: String,
      default: '100px',
    },
    dataUrl: { // 获取表格数据的后端接口（与staticData只能存在一个）
      type: String,
      required: false,
      default: '',
    },
    extraFormData: { // 接口的额外的传参
      type: Object,
      required: false,
      default: () => ({}),
    },
    isParamsLimit: { // 查询时，是否需要对参数进行业务逻辑校验
      type: Boolean,
      required: false,
      default: false,
    },
    tableMaxHeight: { // 表格最大高度
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      tableData: [], // 表格数据
      dragable: null,
      formFields: [], // 筛选框表单配置数据
      formData: {}, // 筛选框表单数据
      tableLoading: false,
      exportItem: {},
    }
  },
  watch: {
    'staticData': {
      handler(curData, oldData) {
        if (this.dataUrl) return
        this.search(1)
      },
      deep: true,
    },
  },
  created() {
    this.getFormFields()
    this.$nextTick(() => {
      this.search(1)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.setDrag()
    })
  },
  methods: {
    /**  获取筛选表单的配置  */
    getFormFields() {
      const formData = {}
      const formFields = this.column.filter((item) => item.hasOwnProperty('filterOption')).map((obj) => {
        formData[obj.filterOption.prop] = obj.formPropVal
        return obj.filterOption
      }) || []
      // 有筛选条件或有需要筛选按钮时增加筛选按钮
      if (formFields.length || JSON.stringify(this.filterBtn) !== '{}') formFields.push(this.filterBtn)
      this.formFields = formFields.concat()
      this.formData = { ...formData }
    },
    /** 表格拖拽 */
    setDrag() {
      if (!this.isdrag) {
        return
      }
      const el = this.$refs.compTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.dragable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          if (evt.oldIndex === evt.newIndex) {
            return
          }
          this.$emit('endDrag', evt) // 传出结束后的数据对象，自定义拖拽后的业务逻辑 @endDrag
        },
      })
    },
    /**  查看或编辑当前行数据  */
    async getRowData(scope, index, type, emit) {
      const { apiUrl } = this.column[index].btnData[type]
      if (!apiUrl) {
        this.$emit(emit, scope)
        return
      }
      const { id } = scope.row
      const res = await apiRequest(apiUrl, { id })
      this.$emit(emit, res)
    },
    /**  删除当前行数据   */
    async deleteRow(scope, index) {
      const { apiUrl } = this.column[index].btnData.deleteBtn
      const { id } = scope.row
      const res = await apiRequest(apiUrl, { id })
      this.$emit('deletedRes', res)
      this.search(1)
    },
    /**  确认导出数据  */
    confirmExport(exportItem) {
      this.exportItem = exportItem
      // 在导出条件需要判断限制的时候，转到业务页面进行处理
      if (exportItem.isLimit) {
        this.$emit('limitFun', this.formData)
      } else {
        this.exportFileFun()
      }
    },
    /**  导出  */
    async exportFileFun() {
      const data = deleteEmptyValue({ ...this.formData, ...this.extraFormData })
      const file = await exportFile(this.exportItem.apiUrl, data)
      loacalSaveFile({ file, fileName: `${this.exportItem.fileName}.xlsx` })
    },
    /**  清空筛选框数据  */
    clearFilter() {
      this.$emit('clearExtra')
      // 表单重置时，同时重置表格
      this.$refs.compTable.clearSort()
      this.$refs.compTable.clearSelection()
      this.$refs.compTable.clearFilter()
      this.$nextTick(() => {
        this.search(1)
      })
    },
    /**  每页条数改变时的回调函数   */
    sizeChange(size) {
      this.$set(this.pagination, 'pageSize', size)
      this.search(1)
    },
    /**  页数改变时的回调函数  */
    pageChange(page) {
      this.search(page)
    },
    /**  筛选框查询数据  */
    async search(page = 1) {
      if (!this.dataUrl) {
        this.tableData = this.staticData.concat()
        return
      }
      this.$set(this.pagination, 'currentPage', page)
      this.tableLoading = true
      const data = deleteEmptyValue({
        page: this.pagination.currentPage,
        size: this.pagination.pageSize,
        ...this.formData,
        ...this.extraFormData,
      })
      this.pagination.hide && delete data['page'] && delete data['size']
      // 需要对查询参数进行业务逻辑校验时，转到业务页面进行处理
      if (this.isParamsLimit) {
        this.$emit('limitParams', data)
      } else {
        this.searchData(data)
      }
    },
    /**
     * 接口操作
     */
    async searchData(data) {
      try {
        const res = await apiQsRequest(this.dataUrl, data)
        this.tableData = res.data.list || []
        this.$emit('filterData', data) // 抛出查询条件
        this.$emit('searchData', res) // 抛出查询结果
        this.$set(this.pagination, 'total', res.data.total || 0)
        this.$set(this.pagination, 'currentTotal', res.data.list && res.data.list.length || 0)
        this.tableLoading = false
      } catch (error) {
        this.tableLoading = false
      }
    },
  },
}

</script>

