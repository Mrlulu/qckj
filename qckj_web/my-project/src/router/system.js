/** 系统模块 */
export default {
  typeName: '系统模块',
  typeId: 'system',
  routers: [{
    name: 'user',
    title: '用户管理'
  },
  {
    path: '/role',
    name: 'role',
    meta: {
      title: '角色管理'
    }
  }
  ]
}
