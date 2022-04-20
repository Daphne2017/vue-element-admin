export const column = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'tagName',
    label: '标签名称',
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

export const pagination = {
  pageSize: 20,
  currentPage: 1,
  total: 0,
}

export const filterBtn = {
  type: 'button', children: [
    { type: 'search' },
    { type: 'reset' }],
}
export const formFields = [

  { type: 'input', label: '标签名称', prop: 'tagName', placeholder: '请输入', maxlength: 20, disabled: false },
  { type: 'customSlot', label: '关联游戏', prop: 'games' },
  { type: 'button', hidden: false, prop: 'btnGroup', children:
    [
      { type: 'cancel' },
      { type: 'confirm' },
    ],
  },
]
// 校验规则
export const formAttr = {
  formLabelWidth: '150px',
  formRules: {
    name: [{ required: true, message: '请输入', trigger: 'blur' }],
    code: [{ required: true, message: '请输入', trigger: 'blur' }],
  },
}
// 表单初始化数据
export const formData = { id: '', tagName: '', relatedGameCount: 0 }
export const initFormData = JSON.parse(JSON.stringify(formData))

