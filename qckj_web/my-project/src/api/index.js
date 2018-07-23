import Resource from './resource'

const create = Resource.create
// create({url, methods, ver})
// 用户模块
export const userRes = create('bs/user', {})
