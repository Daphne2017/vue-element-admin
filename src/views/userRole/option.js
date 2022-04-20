export const column = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: '角色名称',
    filterOption: {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入',
      formChildWidth: '250px',
    },
  },
  {
    prop: 'code',
    label: 'code',
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

  { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入', maxlength: 20, disabled: false },
  { type: 'input', label: 'code', prop: 'code', placeholder: '请输入', disabled: false },
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
export const formData = { id: '', name: '', code: '', }
export const initFormData = JSON.parse(JSON.stringify(formData))

