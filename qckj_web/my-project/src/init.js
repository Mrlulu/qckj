/** 初始化项目 */
import * as components from '@/components'

function init (Vue) {
  Object.keys(components).forEach(key => {
    Vue.components(key, components[key])
  })
}
export default init
