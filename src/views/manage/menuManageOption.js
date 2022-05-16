export const column = [
  {
    prop: 'menu_name',
    label: '名称',
  },
  // {
  //   prop: 'menu_order',
  //   label: '排序',
  //   width: '50px',
  // },
  {
    prop: 'menu_url',
    label: 'URL',
  },
  {
    prop: 'menu_code',
    label: '权限code',
  },
  {
    prop: 'is_visible',
    label: '状态',
  },
  {
    prop: 'operate',
    label: '操作',
    width: '400px',
  },
]

export const formFields = [
  { type: 'input', label: '菜单名称', prop: 'menu_name', placeholder: '请输入' },
  { type: 'input', label: '菜单url', prop: 'menu_url', placeholder: '请输入' },
  { type: 'input', label: '权限标识', prop: 'menu_code', placeholder: '请输入' },
  // { type: 'number', label: '排序', prop: 'menu_order', placeholder: '请输入' },
  {
    type: 'select',
    label: '是否隐藏',
    prop: 'is_visible',
    selectData: [
      {
        label: '显示',
        value: true,
      },
      {
        label: '隐藏',
        value: false,
      },
    ],
  },
  { type: 'button', children:
    [
      { type: 'cancel' },
      { type: 'confirm' },
    ],
  },
]

export const formAttr = {
  formLabelWidth: '100px',
  formRules: {
    menu_name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    menu_url: [{ required: true, message: '请输入菜单url', trigger: 'blur' }],
    menu_code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
    // menu_order: [{ required: true, message: '请输入排序', trigger: 'blur' }],
  },
}
