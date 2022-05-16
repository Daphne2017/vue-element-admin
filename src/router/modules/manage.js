import Layout from '@/layout'
const authRouter = {
  path: '/manage',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  meta: {
    title: '管理员功能',
    icon: 'dashboard',
    code: ['accountManage', 'menuManage'],
  },
  children: [
    {
      path: 'accountManage',
      component: () => import('@/views/manage/accountManage'),
      name: 'accountManage',
      meta: { title: '账户管理', noCache: true, code: ['accountManage'] },
    },
    {
      path: 'menuManage',
      component: () => import('@/views/manage/menuManage'),
      name: 'MenuManage',
      meta: { title: '菜单管理', noCache: true, code: ['menuManage'] },
    },
  ],
}

export default authRouter
