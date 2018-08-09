<template>
  <div id="app" >
    <template v-if="$route.path=='/login'">
        <router-view @getPermission ="init" />
    </template>
    <template v-else>
        <router-view />
    </template>
  </div>
</template>

<script>
import getRouters from './utils/getRoutes'
import Vue from 'vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  mounted () {
    // 防止页面刷新,刷新则重新加载store // store 是内存机制非缓存机制
    const menuList = this.$store.state.user.menuList
    if (menuList.length <= 0) {
      this.init()
    }
  },
  methods: {
    ...mapActions(['getPermission']),
    init () {
      this.getPermission().then(result => {
        var menuList = this.$store.state.user.menuList
        console.log(menuList)
        const routers = getRouters(menuList)
        this.$router.addRoutes(routers)
        this.createAuthDirective()
      })
    },
    // 创建按钮权限的控制指令
    createAuthDirective () {
      var that = this
      Vue.directive('auth', {
        bind: function (el, binding) {
          var currentPath = that.$route.path
          // 判断当前页面中的按钮在menuList权限数组中是否包含
          var menuList = that.$store.state.user.menuList
          var flag = false
          menuList.forEach(menu => {
            if (currentPath.indexOf(menu.url) > -1) {
              menu.children.forEach(btns => {
                if (btns.url === binding.value) {
                  flag = true
                }
              })
            }
          })
          if (!flag) {
            el.parentNode.removeChild(el)
          }
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
