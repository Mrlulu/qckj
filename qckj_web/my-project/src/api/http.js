import Axios from 'axios'
import { Message } from 'element-ui'
// import config from '../config'
// const token = localStorage.getItem('token')
// var instance = Axios.create({
//   baseURL: config.apiServer,
//   timeout: 1000,
//   headers: {'Token': token}
// });
window.Promise = Promise
class Http {
  constructor (config) {
    this._http = Axios.create(config)
  }
  create (config) {
    return new Http(config)
  }
  setDefault (config) {
    Object.assign(this._http.defaults, config)
  }
  post (url, data, config = {}) {
    return this.request({
      ...config,
      url,
      data,
      method: 'post'
    })
  }
  get (url, data, config = {}) {
    return this.request({
      ...config,
      url,
      method: 'get',
      params: data
    })
  }
  request (config) {
    return this._http.request(config).then(({ data }) => {
      // console.log(data)
      if (data.code === 0) {
        if (data.message !== 'success') Message.success(data.message)
        return data.result
      } else {
        return error(data)
      }
    }, error)
  }
}


// 请求异常处理
function error (data) {
  let message = data.message
  if (data.code === 401 || data.code === 402) {
    // store.commit('SET_LOGIN')
    message = '请登录'
    console.log('token失效')
    localStorage.removeItem('token')
    location.replace('/login')
  } else if (data.code === 'ECONNABORTED') {
    message = '连接超时'
  }
  Message.error(message)
  const error = new Error(message)
  error.code = data.code
  return Promise.reject(error)
}

export default new Http()
