import Http from './http'

// 用户模块
export const userRes = new Http('user', {
  login (paramer) {
    return this.get('login', paramer)
  },
  // 获取用户权限
  getPermission (params) {
    return this.get('permission', params)
  }
})
