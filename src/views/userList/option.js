export const column = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'username',
    label: '用户名称',
    filterOption: {
      type: 'input',
      label: '用户名称',
      prop: 'username',
      placeholder: '请输入',
      formChildWidth: '250px',
    },
  },
  {
    prop: 'role',
    label: '角色',
  },
  {
    prop: 'isAdmin',
    label: '是否管理员',
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
// 表单初始化数据
export const formData = { id: '', usename: '', role: [], }
export const initFormData = JSON.parse(JSON.stringify(formData))

