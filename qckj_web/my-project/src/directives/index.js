import { auth } from './auth'

const directives = {
  auth
}

export default {
  install (Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}
