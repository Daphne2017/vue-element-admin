import Layout from '@/layout'

const tagRouter = {
  path: '/tagManage',
  component: Layout,
  redirect: '/tagManage/list',
  meta: {
    title: '标签管理',
    icon: 'tagManage',
    code: ['tagManage'],
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/tagList/index'),
      name: 'TagManage',
      meta: { title: '标签管理', icon: 'dashboard', code: ['tagManage'], noCache: true },
    },
  ],
}
export default tagRouter
