export const column = [
  {
    prop: 'id',
    label: '后台账号ID',
    width: '200px',
  },
  {
    prop: 'username',
    label: '用户名',
    width: '200px',
  },
  {
    prop: 'createdAt',
    label: '注册时间',
  },
  {
    prop: 'isAdmin',
    label: '是否为管理员',
    width: '200px',
    filterOption: {
      type: 'select',
      label: '是否为管理员',
      prop: 'isAdmin',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      formChildWidth: '250px',
      selectData: [
        {
          label: '管理员',
          value: 1,
        },
        {
          label: '非管理员',
          value: 0,
        },
      ],
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: '200px',
    filterOption: {
      type: 'select',
      label: '状态',
      prop: 'status',
      placeholder: '请选择',
      disabled: false,
      multiple: false,
      filterable: true,
      clearable: false,
      formChildWidth: '250px',
      selectData: [
        {
          label: '使用中',
          value: 1,
        },
        {
          label: '已停用',
          value: 0,
        },
      ],
    },
  },
  {
    prop: 'operate',
    label: '操作',
  },
]
export const filterBtn = { type: 'button', children:
  [
    { type: 'search' },
    { type: 'reset' },
  ],
}

export const isManageFilter = {
  true: '是管理员',
  false: '非管理员',
}
export const statusFilter = {
  'true': '使用中',
  'false': '已停用',
}
