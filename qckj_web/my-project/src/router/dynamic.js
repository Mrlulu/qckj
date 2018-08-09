/** 动态路由(由权限来配置) */
import system from './system'
import getRouter from '@/utils/findRouter'
const dynamicRouter = [
  system
]
let routes = []
dynamicRouter.forEach(item => {
  routes = routes.concat(item.routers)
})
console.log(dynamicRouter)
const route = getRouter(routes)
console.log(route)
export default route
