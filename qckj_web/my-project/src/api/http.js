import Axios from 'axios'
import { Message } from 'element-ui'
import config from '../config'
const baseVersion = 'v1'
const request = Axios.create({
  baseURL: config.apiServer,
  timeout: 5000
  // headers: { 'Token': config.token }
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // if (!config.headers.Token) {
    //   config.headers.Token = '123'
    // }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  function (res) {
    const result = res.data
    try {
      if (result.code === 401) {
        location.replace('/login')
        throw new Error('用户未登录!')
      }
    } catch (error) {
      console.log(error)
    }
    return result
  },
  function (error) {
    return Promise.reject(error)
  }
)
class Http {
  /**
     * 构造方法
     * moduleUrl:对应模块的路径前缀
     * 可以多种方式传参:
     * 方式一:
     * new Http('userInfo')
     * 方式二:
     * new Http({url:'userInfo',version:'v2'})
     *
     * extendsFns:扩展的其它方法
     */
  constructor (moduleUrl, extendsFns = {}) {
    if (typeof moduleUrl === 'string') {
      this.moduleUrl = baseVersion + '/' + moduleUrl + '/'
    } else {
      var { url, version } = moduleUrl
      this.moduleUrl = version + '/' + url + '/'
    }
    Object.keys(extendsFns).forEach(keys => {
      var fns = extendsFns[keys]
      // 赋值给当前实例的http对象
      this[keys] = fns
    })
  }
  // get请求
  get (url, params) {
    // 请求加上时间戳,防止304缓存问题
    var timer = new Date().getTime().toString()
    url = this.moduleUrl + url + '?' + timer
    return this.ajax({ url, params })
  }
  // post请求
  post (url, params) {
    url = this.moduleUrl + url
    const method = 'POST'
    return this.ajax({ url, params, method })
  }
  /**
         * 其他方式
         */
  // save (item, type = 'save') {
  //   if (item.id) {
  //     type = 'update'
  //   }
  //   return this.post(type, item)
  // }
  // /**
  //  * @param: ids:字符串或数组
  //  */
  // delete (param) {
  //   return this.post('delete', param)
  // }
  // deleteById (id) {
  //   let param = {}
  //   if (typeof id === 'object') {
  //     param.ids = id
  //   } else {
  //     param.id = id
  //   }
  //   return this.delete(param)
  // }
  // put (item) {
  //   return this.save(item, 'update')
  // }
  // add (item) {
  //   return this.save(item, 'save')
  // }
  // // data: FromData类型
  // upload (data, type = 'upload') {
  //   return this.post(type, data, {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  // }
  ajax (config) {
    return request.request(config).then(res => {
      let message = res.message
      if (res.code === 0) {
        return res.result
      } else if (res.code === 'ECONNABORTED') {
        message = '连接超时'
      }
      Message.warning(message)
    }, (error) => {
      console.log(Message)
      Message.error('连接超时')
      return Promise.reject(error)
    })
  }
}
export default Http
