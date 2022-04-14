export const tagColumn = [
  {
    prop: 'id',
    label: '标签ID',
    formPropVal: '',
    sortable: 'custom',
  },
  {
    prop: 'tagName',
    label: '标签名称',
    formPropVal: '',
    showOverflowTooltip: true,
    filterOption: {
      type: 'input',
      label: '标签名称',
      prop: 'tagName',
      placeholder: '请输入',
      formChildWidth: '250px',
    },
  },
  {
    prop: 'weight',
    label: '排序权重',
    sortable: 'custom',
  },
  {
    prop: 'heat',
    label: '标签热度',
    sortable: 'custom',
  },
  {
    prop: 'relatedGameCount',
    label: '关联游戏数',
    sortable: 'custom',
  },
  {
    prop: 'putStatusText',
    label: '状态',
    showOverflowTooltip: true,
    formPropVal: '',
    filterOption: {
      type: 'select',
      label: '状态',
      prop: 'putStatus',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      selectData: [
        { label: '上架中', value: 1 }, { label: '已下架', value: 0 }, { label: '全部', value: '' },
      ],
    },
  },
  {
    prop: 'operate',
    label: '操作',
  },
]

export const tagPagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}

export const tagFilterBtn = {
  type: 'button', children: [{ type: 'search' }, { type: 'reset' }],
}
export const tagExtraFormData = {
  order: {
    col: 'weight',
    sort: 'DESC',
  },
}
