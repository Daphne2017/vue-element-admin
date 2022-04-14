<template>
  <div :class="`${pagination.className || ''} defaultPagination`">
    <div class="tip-box">
      <span>本页个数：{{ pagination.currentTotal }}</span>
      <span>总数：{{ pagination.total }}</span>
    </div>
    <!--  分页器前插槽  -->
    <slot name="beforePagination" />

    <el-pagination
      v-if="pagination.isShow || true"
      :small="pagination.small || false"
      :background="pagination.background || true"
      :page-size="pagination.pageSize || 20"
      :total="pagination.total"
      :page-count="pagination.pageCount"
      :pager-count="pagination.pagerCount || 7"
      :current-page="pagination.currentPage || 1"
      :layout="pagination.layout || 'sizes, prev, pager, next'"
      :page-sizes="pagination.pageSizes || [5, 10, 20, 30, 40, 50, 100]"
      :popper-class="pagination.popperClass"
      :prev-text="pagination.prevText"
      :next-text="pagination.nextText"
      :disabled="pagination.disabled || false"
      :hide-on-single-page="pagination.hideOnSinglePage || false"
      @size-change="val => $emit('size-change', val)"
      @current-change="val => $emit('page-change', val)"
    />

    <!--  分页器后插槽  -->
    <slot name="afterPagination" />
  </div>
</template>

<script>
export default {
  name: 'TbPagination',
  props: {
    pagination: { // 分页配置数据
      type: Object,
      required: true,
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
  .defaultPagination{
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip-box{
      span{
        padding-right: 20px;
        font-size: 14px;
        color: #606266;
      }
    }
  }
</style>
