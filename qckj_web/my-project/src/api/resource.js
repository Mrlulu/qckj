import Http from './http'
import config from '../config'

const VERSION = 'v1'

const _http = Http.create({
  baseURL: config.apiServer,
  timeout: 5000,
  headers: {'Token': config.token}
})
// Proxy兼容性问题，暂无polyfill
// const handler = {
//   get (target, property) {
//     if (property in target) {
//       return target[property]
//     } else {
//       const type = property.indexOf('get') === 0 ? 'get' : 'post'
//       return (data) => target[type](property, data)
//     }
//   }
// }

class Resource {
  constructor (url, ver = VERSION) {
    url = url ? (url + '/') : ''
    this._http = _http
    this.path = `${url + ver}/`
    // return new Proxy(this, handler)
  }
  // 更改请求的默认配置， 注意，将会变更所有的资源请求配置！！！
  setDefault (config) {
    this._http.setDefault(config)
  }
  post (type, param, config) {
    return this._http.post(this.path + type, param, config)
  }

  /**
   *
   * @param {type:接口方法,params} args
   */
  get (...args) {
    let type = 'list'
    let params = {}
    const config = args[2]
    if (typeof args[0] === 'object') {
      params = args[0]
    } else {
      type = args[0] || 'list'
      params = args[1]
    }
    params = { ...params, h: new Date().getTime().toString(36) } // 加个hash解决ie缓存问题。
    return this._http.get(this.path + type, params, config)
  }
  set (type, id) {
    return this.post(type, {id})
  }
  getInfo (param) {
    return this.get('info', param)
  }
  getById (id, type = 'info') {
    return this.get(type, {id})
  }
  /**
   *
   */
  save (item, type = 'save') {
    if (item.id) {
      type = 'update'
    }
    return this.post(type, item)
  }
  /**
   * @param: ids:字符串或数组
   */
  delete (param) {
    return this.post('delete', param)
  }
  deleteById (id) {
    let param = {}
    if (typeof id === 'object') {
      param.ids = id
    } else {
      param.id = id
    }
    return this.delete(param)
  }
  put (item) {
    return this.save(item, 'update')
  }
  add (item) {
    return this.save(item, 'save')
  }
  // data: FromData类型
  upload (data, type = 'upload') {
    return this.post(type, data, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  }
}
Resource.create = function (param, methods = {}) {
  let url, ver, res
  if (typeof param === 'string') {
    url = param
  } else {
    url = param.url
    ver = param.ver
    methods = param.methods
  }
  res = new Resource(url, ver)
  // 非内部资源时不使用内部请求配置项
  if (url.indexOf('http') === 0) {
    res._http = Http
  }
  Object.keys(methods).forEach(key => {
    const val = methods[key]
    if (typeof val === 'string') {
      methods[key] = (param) => res[val](key, param)
    } else {
      methods[key] = function () {
        // console.log(arguments)
        return val.apply(res, arguments)
      }
    }
  })
  Object.assign(res, methods)
  return res
}
export default Resource
