import Vue from 'vue'
import Router from 'vue-router'
import getRouter from '@/utils/findRouter'
import _routers from './routes'
// import _find from 'loadsh/find'
Vue.use(Router)
const routes = getRouter(_routers)
console.log(routes)
export default new Router({
  routes
})
