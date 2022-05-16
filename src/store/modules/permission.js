import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.code to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    return roles.some(role => route.meta.code.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      let asyncRoutesFilter = asyncRoutes
      if (process.env.NODE_ENV !== 'development') asyncRoutesFilter = asyncRoutes.filter(item => item.path !== '/demo')
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutesFilter || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutesFilter, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
