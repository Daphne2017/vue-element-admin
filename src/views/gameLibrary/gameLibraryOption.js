export const gameColumn = [
  {
    prop: 'id',
    label: 'ID',
    sortable: 'custom',
  },
  {
    prop: 'gameName',
    label: '游戏名称',
    filterOption: {
      type: 'input',
      label: '游戏名称',
      prop: 'gameName',
      placeholder: '请输入',
      formChildWidth: '250px',
    },
  },
  {
    prop: 'associateTagsNames',
    label: '标签关联',
  },
  {
    prop: 'putStatus',
    label: '状态',
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
    prop: 'createdAt',
    label: '创建时间',
  },
  {
    prop: 'operate',
    label: '操作',
    width: '220',
  },
]

export const gamePagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}

export const gameFilterBtn = {
  type: 'button', children: [
    { type: 'search' },
    { type: 'reset' }],
}
export const gameFormFields = [

  { type: 'input', label: '游戏名称', prop: 'gameName', placeholder: '请输入', maxlength: 20, disabled: false },
  { type: 'input', label: '一句话描述', prop: 'simpleDesc', placeholder: '请输入', disabled: false },
  { type: 'normalTag', label: '游戏标签', prop: 'associateTags', closable: true, addTagBtnOption: { name: '添加标签', hidden: false }, disabled: false },
  { type: 'select', label: '上架状态', prop: 'putStatus', placeholder: '请选择', selectData: [{ label: '上架中', value: 1 }, { label: '下架', value: 0 }], filterable: true, clearable: true, disabled: false },
  { type: 'button', hidden: false, prop: 'btnGroup', children:
    [
      { type: 'cancel' },
      { type: 'confirm' },
    ],
  },
]
// 校验规则
export const gameFormAttr = {
  formLabelWidth: '150px',
  formRules: {
    gameName: [{ required: true, message: '请输入游戏名称', trigger: 'blur' }],
    simpleDesc: [{ required: true, message: '请输入一句话描述', trigger: 'blur' }],
    associateTags: [{ required: true, message: '请关联游戏标签', trigger: 'blur' }],
  },
}
// 表单初始化数据
export const gameFormData = { id: '', gameName: '', putStatus: '', associateTags: [], simpleDesc: '' }
export const gameInitFormData = JSON.parse(JSON.stringify(gameFormData))

// 游戏状态态
export const gameStatusObj = {
  0: '已下架',
  1: '上架中',
}
export const extraFormData = {
  order: {
    col: '',
    sort: '',
  },
}
