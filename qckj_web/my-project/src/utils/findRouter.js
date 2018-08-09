import _find from 'loadsh/find'
export default (_routers) => {
  const views = require.context('@/views', true, /\.vue$/)
  const viewFiles = views.keys()
  let routes = []
  _routers.forEach(item => {
    if (item.redirect) {
      return routes.push(item)
    }
    const filename = item.component || item.name
    const viewPath = _find(viewFiles, (val) => new RegExp(`/${filename}\\.\\w+$`).test(val))
    try {
      if (!viewPath) {
        throw new ReferenceError(`views中未找到组件:${filename}`)
      }
      // const view = views(viewPath).default
      const path = viewPath.substring(1)
      routes.push({
        ...item,
        path: item.path || (`/${item.name}`),
        component: resolve => require([`@/views${path}`], resolve),
        meta: {
          title: item.meta.title
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
  return routes
}
