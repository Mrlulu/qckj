// const token = localStorage.getItem('token')
// // todo:
// // token不存在时，如果当前路径不是登录页，则立即跳转至登录页
// if (!token && window.location.pathname.indexOf('login') === -1) {
//   window.location.replace('/login')
// }
export default {
  // token,
  apiServer: (process.env.NODE_ENV === 'production') ? 'http://127.0.0.1:3000/api/' : 'http://127.0.0.1:3000/api/'
}
