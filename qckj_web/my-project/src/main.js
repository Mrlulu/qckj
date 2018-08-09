// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import init from './init'
import store from './store'
import Vuex from 'vuex'
// 维持vuex的持久状态
// import createPersistedState from 'vuex-persistedstate'
init(Vue)
Vue.use(Vuex)
// const createStore = new Vuex.Store({
//     ...store,
//     plugins: [createPersistedState()]
// })
const createStore = new Vuex.Store(store)
console.log(createStore)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: createStore,
  render: h => h(App)
})
