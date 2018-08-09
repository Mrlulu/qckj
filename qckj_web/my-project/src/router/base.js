/* 系统基本模块(静态) */
export default {
  typeId: 'base',
  typeName: '总账模块功能',
  routers: [{
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆'
    }
  }
  ]
}
