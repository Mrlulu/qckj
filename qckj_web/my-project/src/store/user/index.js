import { userRes } from '@/api'
export default {
  state: {
    // 权限数据
    permissions: [],
    // 树状菜单
    menuTree: [],
    // 平铺菜单列表
    menuList: []
  },

  getters: {},
  actions: {
    getPermission: ({ commit, state }, data) => {
      return new Promise((resolve, reject) => {
        userRes.getPermission().then(resultData => {
          commit('SET_PERMISSION', resultData)
          resolve(resultData)
        })
      })
    }
  },
  mutations: {
    SET_PERMISSION: (state, data) => {
      // 这里需要将返回的权限进行组织整理
      var list = data || []
      state.permissions = list
      // 1.组装左边的树形菜单栏结构
      state.menuTree = getMenuTree(JSON.parse(JSON.stringify(list)))
      // 2.获取所有菜单数据和其按钮权限，后续根据该数据匹配出动态路由
      state.menuList = getMenuList(JSON.parse(JSON.stringify(list)))
    }
  }
}

let getMenuTree = menus => {
  function removeBtn (_menus) {
    var tempMenus = JSON.parse(JSON.stringify(_menus))
    for (var index = tempMenus.length - 1; index >= 0; index--) {
      var menu = tempMenus[index]

      if (menu.type === 3) {
        // 按钮
        _menus.splice(index, 1)
      } else {
        if (menu.children) {
          removeBtn(_menus[index].children)
        }
      }
    }
    return _menus
  }
  var returnMenus = removeBtn(menus)

  return returnMenus
}

let getMenuList = menus => {
  var list = []
  getList(menus)

  function getList (_menus) {
    _menus.forEach(menu => {
      if (menu.type === 2) {
        list.push(menu)
      } else {
        if (menu.children) {
          getList(menu.children)
        }
      }
    })
  }
  return list
}
