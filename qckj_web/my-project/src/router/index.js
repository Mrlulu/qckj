import Vue from 'vue'
import Router from 'vue-router'
import _routers from './routes'
import _find from 'loadsh/find'
Vue.use(Router)
const views = require.context('@/views', true, /\.vue$/)
const viewFiles = views.keys()
console.log(viewFiles)
console.log(_routers)
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
    const view = views(viewPath).default
    routes.push({
      ...item,
      path: item.path || (`/${item.name}`),
      component: {
        ...view
      },
      meta: {
        title: item.title
      }
    })
  } catch (e) {
    console.log(e)
  }
})
export default new Router({
  routes
})
