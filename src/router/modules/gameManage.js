import Layout from '@/layout'
const gameRouter = {
  path: '/gameManage',
  component: Layout,
  redirect: '/gameManage/list',
  meta: {
    title: '游戏管理',
    icon: 'gameManage',
    code: ['gameManage'],
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/gameLibrary/index'),
      name: 'GameList',
      meta: { title: '游戏管理', icon: 'dashboard', code: ['gameManage'], noCache: true },
    },
  ],
}
export default gameRouter
