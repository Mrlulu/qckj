/** 初始化项目 */
// 公共组件
import * as components from '@/components'
// 全局指令
// import directives from '@/directives'
import http from '@/api/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

function init (Vue) {
  // Vue.use(directives)
  Vue.use(ElementUI)

  Vue.$http = Vue.prototype.$http = http
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
export default init
