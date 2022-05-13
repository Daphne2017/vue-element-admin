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
    prop: 'relatedGameCount',
    label: '关联游戏数',
    sortable: 'custom',
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
    col: 'id',
    sort: 'DESC',
  },
}
