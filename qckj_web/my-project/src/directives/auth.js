/** 按钮操作权限指令 */
export const auth = {
  bind (el, binding) {
    const currentPath = this.$route.path
    // 判断当前页面中的按钮在menuList权限数组中是否包含
    const menuList = this.$store.state.user.menuList
    let flag = false
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
}
