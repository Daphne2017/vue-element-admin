import Layout from '@/layout'
const gameRouter = {
  path: '/game',
  component: Layout,
  redirect: '/game/list',
  children: [
    {
      path: 'list',
      component: () => import('@/views/gameLibrary/index'),
      name: 'GameList',
      meta: { title: 'GameList', icon: 'dashboard', affix: true },
    },
  ],
}
export default gameRouter
