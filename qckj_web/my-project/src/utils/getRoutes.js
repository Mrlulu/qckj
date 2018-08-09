import fullRoute from '@/router/dynamic'
// 获取动态路由
export default (menus = []) => {
  var routers = []
  menus.forEach(menu => {
    fullRoute.forEach(route => {
      if (route.path === menu.url) {
        routers.push(route)
        // 将依赖的路由配置平铺
        if (route.meta.relyModule) {
          route.meta.relyModule.forEach(relys => {
            routers.push(relys)
          })
        }
      }
    })
  })
  return routers
}
