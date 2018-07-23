/**
 * 路由定义
 * path与name相同时可以忽略path
 */
import base from './base'
export const menuList = [
  base
]
let routes = []
menuList.forEach(item => {
  routes = routes.concat(item.routers)
})
export default routes
